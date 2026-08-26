/**
 * 五个面向模型的容器工具：docker_ps / docker_logs / docker_inspect / docker_exec / docker_manage。
 *
 * @module dsh-docker/tools
 */
import { imagesArgs, inspectArgs, logsArgs, manageArgs, execArgs, psArgs, splitCommand } from './args.js'
import { assertContainerRef, type ResolvedDockerConfig } from './config.js'
import { type ProcessRunner, type RunResult } from './exec.js'
import { parseImagesJson, parseInspectJson, parsePsJson } from './parse.js'

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
  execute(args: unknown, exec: unknown): Promise<unknown>
  gate?(exec: unknown, next: () => Promise<unknown>): Promise<unknown>
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

async function runChecked(runner: ProcessRunner, argv: string[], timeoutMs: number, label: string): Promise<RunResult> {
  const result = await runner.run(argv, { timeoutMs })
  if (result.exitCode !== 0) {
    const tail = result.stderr.trim().split(/\r?\n/).slice(-6).join(' | ')
    throw new Error(label + '失败（退出码 ' + String(result.exitCode ?? 'null') + '）：' + (tail || '无错误输出') + '。请确认 docker 可用（docker version）。')
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

/** 构建五个工具定义。 */
export function buildDockerTools(config: ResolvedDockerConfig, runner: ProcessRunner): DockerToolDefinition[] {
  const cfg = config
  const timeout = cfg.timeoutMs

  const dockerPs: DockerToolDefinition = {
    name: 'docker_ps',
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
        const lines = ['共 ' + containers.length + ' 个容器：']
        for (const item of containers) {
          const c = asRecord(item)
          lines.push('- ' + c.name + '（' + c.image + '，' + c.state + '）')
        }
        return [{ type: 'text', text: lines.join('\n') }]
      },
    },
    async execute(rawArgs: unknown) {
      const args = asRecord(rawArgs)
      const all = args.all === true
      const result = await runChecked(runner, psArgs(cfg.dockerPath, all, optionalString(args, 'name')), timeout, 'docker ps')
      const containers = parsePsJson(result.stdout)
      return { count: containers.length, all, containers }
    },
    timeoutMs: timeout,
  }

  const dockerLogs: DockerToolDefinition = {
    name: 'docker_logs',
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
        return [{ type: 'text', text: '容器 ' + rec.container + ' 最近日志：\n' + rec.text }]
      },
    },
    async execute(rawArgs: unknown) {
      const args = asRecord(rawArgs)
      const container = assertContainerRef(requiredString(args, 'container', '容器名'))
      const tailRaw = args.tail
      const tail = typeof tailRaw === 'number' && Number.isInteger(tailRaw) ? Math.min(2000, Math.max(1, tailRaw)) : 100
      const follow = args.follow === true
      const result = await runChecked(runner, logsArgs(cfg.dockerPath, container, tail, follow), follow ? Math.min(timeout, 30000) : timeout, 'docker logs')
      return { container, tail, text: result.stdout }
    },
    timeoutMs: timeout,
  }

  const dockerImages: DockerToolDefinition = {
    name: 'docker_images',
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
    async execute(rawArgs: unknown) {
      const args = asRecord(rawArgs)
      const dangling = args.dangling === true
      const result = await runChecked(runner, imagesArgs(cfg.dockerPath, dangling), timeout, 'docker images')
      const images = parseImagesJson(result.stdout)
      return { count: images.length, dangling, images }
    },
    timeoutMs: timeout,
  }

  const dockerInspect: DockerToolDefinition = {
    name: 'docker_inspect',
    description: '查看容器详情：镜像、运行状态、启动时间、端口映射。',
    parameters: compileParameters({
      container: { type: 'string', required: true, description: '容器名或 ID（必填）。' },
    }),
    output: {
      schema: inspectSchema,
      render: (_args, value) => {
        const rec = asRecord(value)
        const info = asRecord(rec.info)
        return [{ type: 'text', text: '容器 ' + info.name + '（' + info.image + '）：' + (info.running === true ? '运行中' : '已停止') + '，端口：' + (Array.isArray(info.ports) ? info.ports.join(', ') : '无') }]
      },
    },
    async execute(rawArgs: unknown) {
      const args = asRecord(rawArgs)
      const container = assertContainerRef(requiredString(args, 'container', '容器名'))
      const result = await runChecked(runner, inspectArgs(cfg.dockerPath, container), timeout, 'docker inspect')
      return { container, info: parseInspectJson(result.stdout) }
    },
    timeoutMs: timeout,
  }

  const dockerExec: DockerToolDefinition = {
    name: 'docker_exec',
    description: '在容器内执行命令（默认走审批门）。command 为命令字符串（按空白拆分，支持引号）；返回退出码与 stdout（stderr 并入错误提示）。',
    parameters: compileParameters({
      container: { type: 'string', required: true, description: '容器名或 ID（必填）。' },
      command: { type: 'string', required: true, description: '要执行的命令，如 ls -la 或 sh -c \'cat /etc/hosts\'（必填）。' },
    }),
    output: {
      schema: execSchema,
      render: (_args, value) => {
        const rec = asRecord(value)
        return [{ type: 'text', text: '容器 ' + rec.container + ' 执行完成（退出码 ' + rec.exitCode + '）：\n' + rec.stdout }]
      },
    },
    async execute(rawArgs: unknown) {
      const args = asRecord(rawArgs)
      const container = assertContainerRef(requiredString(args, 'container', '容器名'))
      const command = splitCommand(requiredString(args, 'command', '命令'))
      if (command.length === 0) throw new Error('command 不能为空。')
      const result = await runChecked(runner, execArgs(cfg.dockerPath, container, command), timeout, 'docker exec')
      return { container, exitCode: result.exitCode, stdout: result.stdout }
    },
    gate(exec: unknown, next: () => Promise<unknown>): Promise<unknown> {
      return next()
    },
    timeoutMs: timeout,
  }

  const dockerManage: DockerToolDefinition = {
    name: 'docker_manage',
    description: '容器生命周期管理：start / stop / restart / rm（rm 强制删除）。注意 stop/restart/rm 会中断容器，谨慎使用。',
    parameters: compileParameters({
      container: { type: 'string', required: true, description: '容器名或 ID（必填）。' },
      action: { type: 'string', required: true, description: '操作：start / stop / restart / rm（必填）。' },
    }),
    output: {
      schema: manageSchema,
      render: (_args, value) => {
        const rec = asRecord(value)
        return [{ type: 'text', text: '容器 ' + rec.container + ' 已执行 ' + rec.action + '。' }]
      },
    },
    async execute(rawArgs: unknown) {
      const args = asRecord(rawArgs)
      const container = assertContainerRef(requiredString(args, 'container', '容器名'))
      const action = requiredString(args, 'action', '操作')
      if (!['start', 'stop', 'restart', 'rm'].includes(action)) throw new Error('action 必须是 start / stop / restart / rm 之一（当前：' + action + '）。')
      const result = await runChecked(runner, manageArgs(cfg.dockerPath, action as 'start' | 'stop' | 'restart' | 'rm', container), timeout, 'docker ' + action)
      return { container, action, output: result.stdout.trim() }
    },
    timeoutMs: timeout,
  }

  const dockerHealth: DockerToolDefinition = {
    name: 'docker_health',
    description: 'dsh-docker 自检：验证 docker CLI 与守护进程是否可用（执行 docker version），并汇总安全配置（exec 审批门、超时）。遇到问题时先运行本工具定位。',
    parameters: compileParameters({}),
    output: {
      schema: { type: 'object', additionalProperties: true },
      render: (_args, value) => {
        const rec = asRecord(value)
        const checks = Array.isArray(rec.checks) ? rec.checks : []
        const lines = ['dsh-docker 自检' + (rec.ok === true ? '：正常。' : '：发现问题。')]
        for (const item of checks) {
          const c = asRecord(item)
          lines.push('- ' + c.name + '：' + (c.ok === true ? '✅' : '❌ ' + String(c.detail ?? '')))
        }
        return [{ type: 'text', text: lines.join('\n') }]
      },
    },
    async execute() {
      const checks: Array<Record<string, unknown>> = []
      let ok = true
      try {
        const result = await runChecked(runner, [cfg.dockerPath, 'version', '--format', '{{.Server.Version}}'], 15000, 'docker version')
        checks.push({ name: 'docker daemon', ok: true, detail: 'server ' + result.stdout.trim() })
      } catch (error) {
        ok = false
        checks.push({ name: 'docker daemon', ok: false, detail: error instanceof Error ? error.message : String(error) })
      }
      checks.push({ name: 'exec 审批门', ok: true, detail: cfg.execApproval === true ? '开启' : '关闭' })
      checks.push({ name: '超时配置', ok: true, detail: 'timeoutMs=' + cfg.timeoutMs + ', graceMs=' + cfg.graceMs })
      return { ok, plugin: 'dsh-docker', checks }
    },
    timeoutMs: 20000,
  }

  return [dockerPs, dockerLogs, dockerImages, dockerInspect, dockerExec, dockerManage, dockerHealth]
}
