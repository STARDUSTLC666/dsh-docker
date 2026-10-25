/** Match the host policy without importing another copy of its services. */
export type DockerApprovalPolicy = 'ask' | 'never' | 'unknown'
export interface DockerApprovalService {
  config?: { policy?: unknown }
  overrideOf?(session: unknown): unknown
}
export function dockerApprovalPolicy(service: DockerApprovalService | undefined, execution: unknown): DockerApprovalPolicy {
  try {
    const session = (execution as { agent?: { session?: unknown } } | null)?.agent?.session
    const policy = (session === undefined ? undefined : service?.overrideOf?.(session)) ?? service?.config?.policy
    return policy === 'ask' || policy === 'never' ? policy : 'unknown'
  } catch { return 'unknown' }
}
export function dockerApprovalCheck(enabled: boolean, policy: DockerApprovalPolicy, setting: string) {
  if (!enabled) return { ok: true, detail: setting + '=false；本插件不要求单独确认，其它宿主策略仍生效' }
  if (policy === 'never') return { ok: false, detail: '插件要求确认，但当前审批策略 never 不允许询问；请切换为可询问模式，或由用户明确设置 ' + setting + '=false' }
  if (policy === 'ask') return { ok: true, detail: '开启；当前策略 ask，经宿主询问（无人回答时拒绝）' }
  return { ok: false, detail: '开启；无法读取当前会话审批策略，尚未确认可用' }
}
