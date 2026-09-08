/**
 * dsh-docker 配置解析：docker CLI 路径、超时与 exec 审批策略。
 *
 * @module dsh-docker/config
 */
/** 插件行配置（cordis.patch.yml 里的 config 段，可缺省）。 */
export interface DockerConfig {
    dockerPath?: string;
    timeoutMs?: number;
    graceMs?: number;
    execApproval?: boolean;
    manageApproval?: boolean;
}
/** 解析后的配置。 */
export interface ResolvedDockerConfig {
    dockerPath: string;
    timeoutMs: number;
    graceMs: number;
    execApproval: boolean;
    manageApproval: boolean;
}
/**
 * 解析并校验配置。
 */
export declare function resolveConfig(config: DockerConfig | undefined | null, env?: NodeJS.ProcessEnv): ResolvedDockerConfig;
/** 校验容器名/ID，防参数注入（只允许字母数字与 _-.:/ 之外的拒绝）。 */
export declare function assertContainerRef(value: string): string;
