export function dockerApprovalPolicy(service, execution) {
    try {
        const session = execution?.agent?.session;
        const policy = (session === undefined ? undefined : service?.overrideOf?.(session)) ?? service?.config?.policy;
        return policy === 'ask' || policy === 'never' ? policy : 'unknown';
    }
    catch {
        return 'unknown';
    }
}
export function dockerApprovalCheck(enabled, policy, setting) {
    if (!enabled)
        return { ok: true, detail: setting + '=false；本插件不要求单独确认，其它宿主策略仍生效' };
    if (policy === 'never')
        return { ok: false, detail: '插件要求确认，但当前审批策略 never 不允许询问；请切换为可询问模式，或由用户明确设置 ' + setting + '=false' };
    if (policy === 'ask')
        return { ok: true, detail: '开启；当前策略 ask，经宿主询问（无人回答时拒绝）' };
    return { ok: false, detail: '开启；无法读取当前会话审批策略，尚未确认可用' };
}
