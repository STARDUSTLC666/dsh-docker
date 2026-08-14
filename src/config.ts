/**
 * dsh-docker 配置解析：docker CLI 路径、超时与 exec 审批策略。
 *
 * @module dsh-docker/config
 */

/** 插件行配置（cordis.patch.yml 里的 config 段，可缺省）。 */
export interface DockerConfig {
  dockerPath?: string
  timeoutMs?: number
  graceMs?: number
  execApproval?: boolean
}

/** 解析后的配置。 */
export interface ResolvedDockerConfig {
  dockerPath: string
  timeoutMs: number
  graceMs: number
  execApproval: boolean
}

/**
 * 解析并校验配置。
 */
export function resolveConfig(config: DockerConfig | undefined | null): ResolvedDockerConfig {
  const cfg = config ?? {}
  const dockerPath = typeof cfg.dockerPath === 'string' && cfg.dockerPath.trim() !== '' ? cfg.dockerPath.trim() : 'docker'
  let timeoutMs = 60000
  if (cfg.timeoutMs !== undefined) {
    if (typeof cfg.timeoutMs !== 'number' || !Number.isFinite(cfg.timeoutMs) || cfg.timeoutMs <= 0) throw new Error('timeoutMs 必须是大于 0 的数字（毫秒）。')
    timeoutMs = Math.min(10 * 60 * 1000, Math.max(5000, Math.round(cfg.timeoutMs)))
  }
  let graceMs = 15000
  if (cfg.graceMs !== undefined) {
    if (typeof cfg.graceMs !== 'number' || !Number.isFinite(cfg.graceMs) || cfg.graceMs <= 0) throw new Error('graceMs 必须是大于 0 的数字（毫秒）。')
    graceMs = Math.min(120000, Math.max(1000, Math.round(cfg.graceMs)))
  }
  const execApproval = cfg.execApproval !== false
  return { dockerPath, timeoutMs, graceMs, execApproval }
}

/** 校验容器名/ID，防参数注入（只允许字母数字与 _-.:/ 之外的拒绝）。 */
export function assertContainerRef(value: string): string {
  const trimmed = value.trim()
  if (!/^[A-Za-z0-9][A-Za-z0-9_.:-]*$/.test(trimmed)) {
    throw new Error('容器名/ID 非法（只允许字母数字开头，后续可含 _ . : -）：' + value)
  }
  return trimmed
}
