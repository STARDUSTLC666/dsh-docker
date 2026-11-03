import { type ResolvedDockerConfig } from './config.js';
import { type ProcessRunner } from './exec.js';
import { type DockerApprovalPolicy } from './approval.js';
export interface ContentBlock {
    type: 'text';
    text: string;
}
export interface DockerToolDefinition {
    name: string;
    description: string;
    parameters: {
        type: 'object';
        properties: Record<string, unknown>;
        required?: string[];
    };
    output: {
        schema: Record<string, unknown>;
        render(args: unknown, value: unknown): ContentBlock[];
    };
    execute(args: unknown, exec: unknown): Promise<unknown>;
    timeoutMs?: number;
}
/**
 * 把 docker 的原始 stderr 映射成一行可执行的「下一步」。
 *
 * 原来非零退出只提示「请确认 docker 可用（docker version）」，守护进程没起、
 * 权限不足、容器名写错、端口冲突看起来都一样，用户只能反复试。原始输出保留，
 * 这里只追加一条最可能的原因与动作。
 */
export declare function dockerErrorHint(text: string): string | undefined;
/** 构建七个工具定义。 */
export declare function buildDockerTools(config: ResolvedDockerConfig, runner: ProcessRunner, policyOf?: (execution: unknown) => DockerApprovalPolicy): DockerToolDefinition[];
