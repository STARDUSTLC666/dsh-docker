/**
 * dsh-docker —— 容器管理工具插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：注册六个面向模型的工具（docker_ps / docker_logs /
 * docker_images / docker_inspect / docker_exec / docker_manage）。进程执行走 DSH 官方 subprocess 服务
 * （argv 数组、无 shell），docker_exec 默认走宿主审批门。零运行时依赖。
 *
 * @module dsh-docker
 */

import { resolveConfig, type DockerConfig } from './config.js'
import { createSubprocessRunner, type SubprocessSpawnLike } from './exec.js'
import { buildDockerTools, type DockerToolDefinition } from './tools.js'

/** cordis 服务注入：apply 里要用 ctx.subprocess 与 ctx.tools。 */
export const inject = ['subprocess', 'tools']

/** 审批服务最小面。 */
export interface DockerApproval {
  request(options: { agent?: unknown; toolName?: unknown; callId?: unknown; reason: string; signal?: unknown }): Promise<'allowed-once' | 'cancelled' | 'unavailable' | string>
}

/** 插件所需的最小 ctx 面。 */
export interface DockerPluginContext {
  subprocess: { spawn: SubprocessSpawnLike }
  tools: { register(definition: DockerToolDefinition, options?: { prepend?: boolean }): () => void }
  get?(name: 'approval'): DockerApproval | undefined
  on?(event: string, listener: () => void): () => void
}

/**
 * 插件入口：解析配置、封装执行器、注册六工具；docker_exec 注入审批门。
 */
export function apply(ctx: DockerPluginContext, config?: DockerConfig | null): void {
  let cfg
  try {
    cfg = resolveConfig(config)
  } catch (error) {
    console.warn('[dsh-docker] ' + (error instanceof Error ? error.message : String(error)))
    cfg = resolveConfig(null)
  }

  const runner = createSubprocessRunner(ctx.subprocess.spawn, cfg.graceMs, cfg.timeoutMs)
  const tools = buildDockerTools(cfg, runner)
  const disposers: Array<() => void> = []
  for (const definition of tools) {
    if (definition.name === 'docker_exec' && cfg.execApproval) {
      definition.gate = async (exec: unknown, next: () => Promise<unknown>) => {
        const approval = ctx.get?.('approval')
        if (approval === undefined) {
          return { kind: 'deny', reason: 'docker_exec 需要确认，但当前环境没有审批通道（如 headless）。如确定安全，可在配置中设置 execApproval: false 后直接执行。' }
        }
        const record = (typeof exec === 'object' && exec !== null ? exec : {}) as Record<string, unknown>
        const args = (typeof record.args === 'object' && record.args !== null ? record.args : {}) as Record<string, unknown>
        const command = typeof args.command === 'string' ? args.command : ''
        const container = typeof args.container === 'string' ? args.container : ''
        const outcome = await approval.request({
          agent: record.agent,
          toolName: record.name,
          callId: record.callId,
          reason: '在容器 ' + container + ' 内执行：' + command.slice(0, 200),
          signal: record.signal,
        })
        if (outcome === 'allowed-once') return next()
        if (outcome === 'cancelled') return { kind: 'deny', reason: '容器内执行确认被取消，命令未执行。' }
        if (outcome === 'unavailable') return { kind: 'deny', reason: '容器内执行确认不可用（没有可用的审批界面），命令未执行。' }
        return { kind: 'deny', reason: '容器内执行未获批准：要么你拒绝了，要么当前会话处于 Full Access（审批策略 never）。若在 Full Access：切到 Read Only / Write 再执行，或关闭 execApproval（自行承担风险）。' }
      }
    }
    disposers.push(ctx.tools.register(definition, { prepend: true }))
  }
  if (typeof ctx.on === 'function') {
    ctx.on('dispose', () => {
      for (const dispose of disposers) dispose()
    })
  }
}

export * from './args.js'
export * from './config.js'
export * from './exec.js'
export * from './parse.js'
export * from './tools.js'
