/**
 * dsh-docker —— 容器管理工具插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：注册七个面向模型的工具（docker_ps / docker_logs /
 * docker_images / docker_inspect / docker_exec / docker_manage / docker_health）。进程执行走 DSH 官方 subprocess 服务
 * （argv 数组、无 shell），docker_exec 与破坏性 docker_manage 默认走宿主审批门。零运行时依赖。
 *
 * @module dsh-docker
 */

import { resolveConfig, type DockerConfig } from './config.js'
import { createSubprocessRunner, type SubprocessSpawnLike } from './exec.js'
import { buildDockerTools, type DockerToolDefinition } from './tools.js'

/** cordis 服务注入：apply 里要用 ctx.subprocess 与 ctx.tools。 */
export const name = 'docker'
export const inject = ['subprocess', 'tools']

/** Harness `tools/pre-execute` 的决策结果。 */
type DockerPreToolDecision =
  | { kind: 'allow' }
  | { kind: 'deny'; reason: string }
  | { kind: 'ask'; reason?: string }

/** 审批策略需要读取的工具执行字段。 */
interface DockerToolExecution {
  readonly name: string
  readonly arguments: unknown
}

/** Harness `tools/pre-execute` waterfall 监听器。 */
type DockerPreExecuteListener = (
  exec: DockerToolExecution,
  next: () => Promise<DockerPreToolDecision>,
) => Promise<DockerPreToolDecision>

/** 插件所需的最小 ctx 面。 */
export interface DockerPluginContext {
  subprocess: { spawn: SubprocessSpawnLike }
  tools: { register(definition: DockerToolDefinition): () => void }
  on(event: 'tools/pre-execute', listener: DockerPreExecuteListener): () => void
  on(event: 'dispose', listener: () => void): () => void
}

/**
 * 插件入口：解析配置、封装执行器、注册七工具；为 docker_exec 与破坏性 docker_manage 注入审批门。
 */
export function apply(ctx: DockerPluginContext, config?: DockerConfig | null): void {
  const cfg = resolveConfig(config)

  const runner = createSubprocessRunner(ctx.subprocess.spawn, cfg.graceMs, cfg.timeoutMs)
  const tools = buildDockerTools(cfg, runner)
  if (cfg.execApproval || cfg.manageApproval) {
    ctx.on('tools/pre-execute', async (exec, next) => {
      const args = (typeof exec.arguments === 'object' && exec.arguments !== null ? exec.arguments : {}) as Record<string, unknown>
      if (exec.name === 'docker_exec' && cfg.execApproval) {
        const command = typeof args.command === 'string' ? args.command : ''
        const container = typeof args.container === 'string' ? args.container : ''
        return {
          kind: 'ask',
          reason: 'docker_exec 需要确认：在容器 ' + (container || '（未指定）') + ' 内执行：' + command.slice(0, 200) + (command.length > 200 ? '…' : ''),
        }
      }
      if (exec.name === 'docker_manage' && cfg.manageApproval) {
        const action = typeof args.action === 'string' ? args.action : ''
        if (action === 'stop' || action === 'restart' || action === 'rm') {
          const container = typeof args.container === 'string' ? args.container : ''
          return {
            kind: 'ask',
            reason: 'docker_manage 需要确认：对容器 ' + (container || '（未指定）') + ' 执行破坏性操作 ' + action + '。',
          }
        }
      }
      return next()
    })
  }

  const disposers: Array<() => void> = []
  for (const definition of tools) {
    disposers.push(ctx.tools.register(definition))
  }
  ctx.on('dispose', () => {
    for (const dispose of disposers) dispose()
  })
}

export * from './args.js'
export * from './config.js'
export * from './exec.js'
export * from './parse.js'
export * from './tools.js'
