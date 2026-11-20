/**
 * 七个面向模型的容器工具：docker_ps / docker_logs / docker_images / docker_inspect /
 * docker_exec / docker_manage / docker_health。
 *
 * @module dsh-docker/tools
 */
import { imagesArgs, inspectArgs, logsArgs, manageArgs, execArgs, psArgs, splitCommand } from './args.js'
import { assertContainerRef, type ResolvedDockerConfig } from './config.js'
import { type ProcessRunner, type RunResult } from './exec.js'
import { parseImagesJson, parseInspectJson, parsePsJson } from './parse.js'
import { dockerApprovalCheck, type DockerApprovalPolicy } from './approval.js'

export interface ContentBlock {
  type: 'text'
  text: string
}

export interface DockerToolDefinition {
  name: string
  description: string
  parameters: { type: 'object'; properties: Record<string, unknown>; required?: string[] }
  output: {
    schema: Record<string, unknown>
    render(args: unknown, value: unknown): ContentBlock[]
  }
  isConcurrencySafe?(args?: unknown): boolean
  execute(args: unknown, exec: unknown): Promise<unknown>
  timeoutMs?: number
}

function compileParameters(spec: Record<string, any>): { type: 'object'; properties: Record<string, unknown>; required?: string[] } {
  const properties: Record<string, unknown> = {}
  const required: string[] = []
  for (const [key, prop] of Object.entries(spec)) {
    if (prop?.required === true) required.push(key)
    const node: Record<string, unknown> = {}
    if (typeof prop?.type === 'string') node.type = prop.type
    if (typeof prop?.description === 'string') node.description = prop.description
    if (prop?.items) node.items = prop.items
    properties[key] = node
  }
  return { type: 'object', properties, ...(required.length > 0 ? { required } : {}) }
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : {}
}

function optionalString(args: Record<string, unknown>, key: string): string | undefined {
  const value = args[key]
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined
}

function requiredString(args: Record<string, unknown>, key: string, label: string): string {
  const value = optionalString(args, key)
  if (value === undefined) throw new Error(label + '（参数 ' + key + '）为必填，请提供非空字符串。')
  return value
}

function executionSignal(exec: unknown): AbortSignal | undefined {
  if (typeof exec !== 'object' || exec === null) return undefined
  const signal = (exec as { signal?: unknown }).signal
  return signal instanceof AbortSignal ? signal : undefined
}

/**
 * 把 docker 的原始 stderr 映射成一行可执行的「下一步」。
 *
 * 原来非零退出只提示「请确认 docker 可用（docker version）」，守护进程没起、
 * 权限不足、容器名写错、端口冲突看起来都一样，用户只能反复试。原始输出保留，
 * 这里只追加一条最可能的原因与动作。
 */
export function dockerErrorHint(text: string): string | undefined {
  if (/Cannot connect to the Docker daemon|Is the docker daemon running|docker\.sock: connect|open .*docker\.sock/i.test(text)) return '守护进程不可达：请启动 Docker Desktop / dockerd（Windows 需 WSL2 或 Hyper-V 后端），再运行 docker_health 复查。'
  if (/permission denied/i.test(text)) return '权限不足：Linux/macOS 把用户加入 docker 组并重新登录，Windows 以管理员身份启动 Docker Desktop 后重试。'
  if (/command not found|not recognized as the name|ENOENT|no such file or directory/i.test(text)) return '找不到 docker 命令：请安装 Docker CLI，或在插件配置里用 dockerPath 指定完整可执行文件路径。'
  if (/[Nn]o such container/i.test(text)) return '容器不存在：用 docker_ps all=true 查真实容器名或 ID（注意大小写），再重试。'
  if (/[Nn]o such image/i.test(text)) return '镜像不存在：用 docker_images 查看本地镜像，或先 docker pull 该镜像。'
  if (/context deadline exceeded|i\/o timeout|timed out|timeout/i.test(text)) return '命令超时：确认目标机器与容器状态，必要时调大插件配置里的 timeoutMs 后重试。'
  if (/port is already allocated|address already in use/i.test(text)) return '端口已被占用：先用 docker_ps 找到占用端口的容器并停止，或改用其它端口。'
  if (/Conflict\. The container name/i.test(text)) return '容器名冲突：已有同名容器，请改名，或用 docker_ps 找到现有容器先停掉/删除。'
  return undefined
}

async function runChecked(runner: ProcessRunner, argv: string[], timeoutMs: number, label: string, signal?: AbortSignal): Promise<RunResult> {
  signal?.throwIfAborted()
  const result = await runner.run(argv, { timeoutMs, ...(signal === undefined ? {} : { signal }) })
  signal?.throwIfAborted()
  if (result.exitCode !== 0) {
    const tail = result.stderr.trim().split(/\r?\n/).slice(-6).join(' | ')
    const next = dockerErrorHint(result.stderr) ?? '请确认 docker 可用（docker version）。'
    throw new Error(label + '失败（退出码 ' + String(result.exitCode ?? 'null') + '）：' + (tail || '无错误输出') + '。' + next)
  }
  return result
}

const containerSchema = {
  type: 'object',
  properties: { id: { type: 'string' }, name: { type: 'string' }, image: { type: 'string' }, status: { type: 'string' }, state: { type: 'string' } },
  additionalProperties: true,
}

const psSchema = {
  type: 'object',
  properties: { count: { type: 'integer' }, all: { type: 'boolean' }, containers: { type: 'array', items: containerSchema } },
  additionalProperties: true,
}

const logsSchema = {
  type: 'object',
  properties: { container: { type: 'string' }, tail: { type: 'integer' }, text: { type: 'string' } },
  additionalProperties: true,
}

const inspectSchema = {
  type: 'object',
  properties: { container: { type: 'string' }, info: { type: 'object', additionalProperties: true } },
  additionalProperties: true,
}

const execSchema = {
  type: 'object',
  properties: { container: { type: 'string' }, exitCode: { type: 'integer' }, stdout: { type: 'string' } },
  additionalProperties: true,
}

const imagesSchema = {
  type: 'object',
  properties: { count: { type: 'integer' }, dangling: { type: 'boolean' }, images: { type: 'array', items: { type: 'object', additionalProperties: true } } },
  additionalProperties: true,
}

const manageSchema = {
  type: 'object',
  properties: { container: { type: 'string' }, action: { type: 'string' }, output: { type: 'string' } },
  additionalProperties: true,
}

/** 构建七个工具定义。 */
export function buildDockerTools(config: ResolvedDockerConfig, runner: ProcessRunner, policyOf: (execution: unknown) => DockerApprovalPolicy = () => 'unknown'): DockerToolDefinition[] {
  const cfg = config
  const timeout = cfg.timeoutMs

  const dockerPs: DockerToolDefinition = {
    name: 'docker_ps',
    isConcurrencySafe: () => true,
    description: '列出 Docker 容器（含状态/镜像/运行状态）。all=true 时包含已停止容器；name 可按容器名过滤。',
    parameters: compileParameters({
      all: { type: 'boolean', description: '是否包含已停止容器（默认 false）。' },
      name: { type: 'string', description: '按容器名过滤（可选，子串匹配）。' },
    }),
    output: {
      schema: psSchema,
      render: (_args, value) => {
        const rec = asRecord(value)
        const containers = Array.isArray(rec.containers) ? rec.containers : []
        if (containers.length === 0) {
          const onlyRunning = rec.all !== true
          return [{ type: 'text', text: onlyRunning
            ? '没有正在运行的容器。下一步：用 docker_ps all=true 查看已停止的容器；确认 Docker 已启动的话也可以运行 docker_health。'
            : '没有任何容器（含已停止）。下一步：用 docker_images 确认镜像是否已拉到本地，或用 docker_health 检查守护进程。' }]
        }
        const lines = ['共 ' + containers.length + ' 个容器：']
        for (const item of containers) {
          const c = asRecord(item)
          const detail = typeof c.status === 'string' && c.status !== '' ? c.status : c.state
          lines.push('- ' + c.name + '（' + c.image + '，' + detail + '）')
        }
        return [{ type: 'text', text: lines.join('\n') }]
      },
    },
    async execute(rawArgs: unknown, exec: unknown) {
      const args = asRecord(rawArgs)
      const all = args.all === true
      const result = await runChecked(runner, psArgs(cfg.dockerPath, all, optionalString(args, 'name')), timeout, 'docker ps', executionSignal(exec))
      const containers = parsePsJson(result.stdout)
      return { count: containers.length, all, containers }
    },
    timeoutMs: timeout,
  }

  const dockerLogs: DockerToolDefinition = {
    name: 'docker_logs',
    isConcurrencySafe: () => true,
    description: '查看容器日志尾部。container 必填；tail 为行数（1-2000，默认 100）；follow=true 时持续跟踪（受超时限制，一般用于短时观察）。',
    parameters: compileParameters({
      container: { type: 'string', required: true, description: '容器名或 ID（必填）。' },
      tail: { type: 'integer', description: '日志行数 1-2000（默认 100）。' },
      follow: { type: 'boolean', description: '是否持续跟踪（默认 false，受超时限制）。' },
    }),
    output: {
      schema: logsSchema,
      render: (_args, value) => {
        const rec = asRecord(value)
        const text = typeof rec.text === 'string' ? rec.text : ''
        if (text.trim() === '') {
          return [{ type: 'text', text: '容器 ' + rec.container + ' 最近 ' + String(rec.tail ?? '') + ' 行日志为空：进程可能还没输出、日志驱动不是 json-file，或该时间段内没有写入。下一步：用 docker_inspect 看状态与启动时间，或调大 tail 再取一次。' }]
        }
        return [{ type: 'text', text: '容器 ' + rec.container + ' 最近日志：\n' + text }]
      },
    },
    async execute(rawArgs: unknown, exec: unknown) {
      const args = asRecord(rawArgs)
      const container = assertContainerRef(requiredString(args, 'container', '容器名'))
      const tailRaw = args.tail
      const tail = typeof tailRaw === 'number' && Number.isInteger(tailRaw) ? Math.min(2000, Math.max(1, tailRaw)) : 100
      const follow = args.follow === true
      const result = await runChecked(runner, logsArgs(cfg.dockerPath, container, tail, follow), follow ? Math.min(timeout, 30000) : timeout, 'docker logs', executionSignal(exec))
      // Successful docker logs forwards the container's stderr separately too.
      // Both buffers are preserved; their original interleaving is unavailable.
      const separator = result.stdout && result.stderr && !result.stdout.endsWith('\n') ? '\n' : ''
      return { container, tail, text: result.stdout + separator + result.stderr }
    },
    timeoutMs: timeout,
  }

  const dockerImages: DockerToolDefinition = {
    name: 'docker_images',
    isConcurrencySafe: () => true,
    description: '列出本地 Docker 镜像（仓库/标签/大小/创建时间）。dangling=true 时只列未被任何标签引用的悬空镜像。',
    parameters: compileParameters({
      dangling: { type: 'boolean', description: '是否只列出悬空镜像（默认 false）。' },
    }),
    output: {
      schema: imagesSchema,
      render: (_args, value) => {
        const rec = asRecord(value)
        const images = Array.isArray(rec.images) ? rec.images : []
        const lines = ['共 ' + images.length + ' 个镜像：']
        for (const item of images) {
          const image = asRecord(item)
          lines.push('- ' + image.repository + ':' + image.tag + '（' + image.size + '，' + image.createdSince + '）')
        }
        return [{ type: 'text', text: lines.join('\n') }]
      },
    },
    async execute(rawArgs: unknown, exec: unknown) {
      const args = asRecord(rawArgs)
      const dangling = args.dangling === true
      const result = await runChecked(runner, imagesArgs(cfg.dockerPath, dangling), timeout, 'docker images', executionSignal(exec))
      const images = parseImagesJson(result.stdout)
      return { count: images.length, dangling, images }
    },
    timeoutMs: timeout,
  }

  const dockerInspect: DockerToolDefinition = {
    name: 'docker_inspect',
    isConcurrencySafe: () => true,
    description: '查看容器详情：镜像、运行状态、启动时间、端口映射。',
    parameters: compileParameters({
      container: { type: 'string', required: true, description: '容器名或 ID（必填）。' },
    }),
    output: {
      schema: inspectSchema,
      render: (_args, value) => {
        const rec = asRecord(value)
        const info = asRecord(rec.info)
        const ports = Array.isArray(info.ports) && info.ports.length > 0 ? info.ports.join(', ') : '无端口映射'
        const started = typeof info.startedAt === 'string' && info.startedAt !== '' ? '，启动于 ' + info.startedAt : ''
        const state = typeof info.state === 'string' && info.state !== '' ? info.state : (info.running === true ? 'running' : 'exited')
        return [{ type: 'text', text: '容器 ' + info.name + '（' + info.image + '）：' + state + started + '，端口：' + ports + '。下一步：docker_logs 看日志，docker_exec 进容器排查。' }]
      },
    },
    async execute(rawArgs: unknown, exec: unknown) {
      const args = asRecord(rawArgs)
      const container = assertContainerRef(requiredString(args, 'container', '容器名'))
      const result = await runChecked(runner, inspectArgs(cfg.dockerPath, container), timeout, 'docker inspect', executionSignal(exec))
      return { container, info: parseInspectJson(result.stdout) }
    },
    timeoutMs: timeout,
  }

  const dockerExec: DockerToolDefinition = {
    name: 'docker_exec',
    description: '在容器内执行命令（默认走审批门）。command 或 argv 必须且只能提供一个。推荐 argv 参数数组，精确保留空格、引号和空参数；command 支持引号与转义。宿主不执行 Shell 展开。返回退出码与 stdout。',
    parameters: compileParameters({
      container: { type: 'string', required: true, description: '容器名或 ID（必填）。' },
      command: { type: 'string', description: '命令字符串，如 ls -la；与 argv 二选一。' },
      argv: { type: 'array', items: { type: 'string' }, description: '精确命令参数，最多 128 项，如 ["sh", "-c", "cat /etc/hosts"]；与 command 二选一。' },
    }),
    output: {
      schema: execSchema,
      render: (_args, value) => {
        const rec = asRecord(value)
        return [{ type: 'text', text: '容器 ' + rec.container + ' 执行完成（退出码 ' + rec.exitCode + '）：\n' + rec.stdout }]
      },
    },
    async execute(rawArgs: unknown, exec: unknown) {
      const args = asRecord(rawArgs)
      const container = assertContainerRef(requiredString(args, 'container', '容器名'))
      if ((args.command !== undefined) === (args.argv !== undefined)) throw new Error('command 与 argv 必须且只能提供一个。')
      const command = args.argv !== undefined ? args.argv : splitCommand(requiredString(args, 'command', '命令'))
      if (!Array.isArray(command) || command.length === 0 || command.length > 128 || command.some(part => typeof part !== 'string' || part.includes('\0')) || typeof command[0] !== 'string' || !command[0].trim() || command.reduce((size, part) => size + part.length, 0) > 32768) throw new Error('命令参数无效：argv 需含 1–128 个字符串、首项非空、总长不超过 32768 字符且不含 NUL。')
      const result = await runChecked(runner, execArgs(cfg.dockerPath, container, command), timeout, 'docker exec', executionSignal(exec))
      return { container, exitCode: result.exitCode, stdout: result.stdout }
    },
    timeoutMs: timeout,
  }

  const dockerManage: DockerToolDefinition = {
    name: 'docker_manage',
    description: '容器生命周期管理：start / stop / restart / rm（rm 强制删除）。stop/restart/rm 默认进入审批门，批准后才执行。',
    parameters: compileParameters({
      container: { type: 'string', required: true, description: '容器名或 ID（必填）。' },
      action: { type: 'string', required: true, description: '操作：start / stop / restart / rm（必填）。' },
    }),
    output: {
      schema: manageSchema,
      render: (_args, value) => {
        const rec = asRecord(value)
        const output = typeof rec.output === 'string' && rec.output.trim() !== '' ? '\n' + rec.output : ''
        return [{ type: 'text', text: '容器 ' + rec.container + ' 已执行 ' + rec.action + '。下一步：用 docker_ps 确认当前状态。' + output }]
      },
    },
    async execute(rawArgs: unknown, exec: unknown) {
      const args = asRecord(rawArgs)
      const container = assertContainerRef(requiredString(args, 'container', '容器名'))
      const action = requiredString(args, 'action', '操作')
      if (!['start', 'stop', 'restart', 'rm'].includes(action)) throw new Error('action 必须是 start / stop / restart / rm 之一（当前：' + action + '）。')
      const result = await runChecked(runner, manageArgs(cfg.dockerPath, action as 'start' | 'stop' | 'restart' | 'rm', container), timeout, 'docker ' + action, executionSignal(exec))
      return { container, action, output: result.stdout.trim() }
    },
    timeoutMs: timeout,
  }

  const dockerHealth: DockerToolDefinition = {
    name: 'docker_health',
    isConcurrencySafe: () => true,
    description: 'dsh-docker 自检：验证 docker CLI 与守护进程是否可用（执行 docker version），并汇总安全配置（exec/破坏性 manage 审批门、超时）。遇到问题时先运行本工具定位。',
    parameters: compileParameters({}),
    output: {
      schema: { type: 'object', additionalProperties: true },
      render: (_args, value) => {
        const rec = asRecord(value)
        const checks = Array.isArray(rec.checks) ? rec.checks : []
        const lines = ['dsh-docker 自检' + (rec.ok === true ? '：正常。' : '：发现问题。')]
        const failed: string[] = []
        for (const item of checks) {
          const c = asRecord(item)
          lines.push('- ' + c.name + '：' + (c.ok === true ? '✅ ' : '❌ ') + String(c.detail ?? ''))
          if (c.ok !== true) failed.push(String(c.name))
        }
        if (failed.length > 0) {
          lines.push('', '下一步：')
          if (failed.includes('docker daemon')) lines.push('  · 启动 Docker Desktop / dockerd 后重新运行 docker_health；命令找不到时在插件配置里用 dockerPath 指定完整路径。')
          if (failed.some(name => name.includes('审批门'))) lines.push('  · 审批门不可用时，把会话审批策略切到可询问（ask），或由用户明确设置 execApproval / manageApproval = false（之后不再询问，慎用）。')
          if (!failed.some(name => name.includes('审批门')) && !failed.includes('docker daemon')) lines.push('  · 按上面 ❌ 项的说明处理后重新运行 docker_health 复查。')
        }
        return [{ type: 'text', text: lines.join('\n') }]
      },
    },
    async execute(_rawArgs: unknown, exec: unknown) {
      const checks: Array<Record<string, unknown>> = []
      let ok = true
      try {
        const result = await runChecked(runner, [cfg.dockerPath, 'version', '--format', '{{.Server.Version}}'], 15000, 'docker version', executionSignal(exec))
        checks.push({ name: 'docker daemon', ok: true, detail: 'server ' + result.stdout.trim() })
      } catch (error) {
        if (executionSignal(exec)?.aborted === true) throw error
        ok = false
        checks.push({ name: 'docker daemon', ok: false, detail: error instanceof Error ? error.message : String(error) })
      }
      const policy = policyOf(exec)
      checks.push({ name: 'exec 审批门', ...dockerApprovalCheck(cfg.execApproval, policy, 'execApproval') })
      checks.push({ name: 'manage 审批门', ...dockerApprovalCheck(cfg.manageApproval, policy, 'manageApproval') })
      checks.push({ name: '超时配置', ok: true, detail: 'timeoutMs=' + cfg.timeoutMs + ', graceMs=' + cfg.graceMs })
      checks.push({ name: 'docker 命令', ok: true, detail: cfg.dockerPath + '（可用 dockerPath 配置覆盖）' })
      return { ok: ok && checks.every(check => check.ok === true), plugin: 'dsh-docker', approvalPolicy: policy, checks }
    },
    timeoutMs: 20000,
  }

  return [dockerPs, dockerLogs, dockerImages, dockerInspect, dockerExec, dockerManage, dockerHealth]
}
