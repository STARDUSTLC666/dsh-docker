/**
 * dsh-docker —— 容器管理工具插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：注册七个面向模型的工具（docker_ps / docker_logs /
 * docker_images / docker_inspect / docker_exec / docker_manage / docker_health）。进程执行走 DSH 官方 subprocess 服务
 * （argv 数组、无 shell），docker_exec 与破坏性 docker_manage 默认走宿主审批门。零运行时依赖。
 *
 * @module dsh-docker
 */
import { type DockerConfig } from './config.js';
import { type SubprocessSpawnLike } from './exec.js';
import { type DockerToolDefinition } from './tools.js';
/** cordis 服务注入：apply 里要用 ctx.subprocess 与 ctx.tools。 */
export declare const name = "docker";
export declare const inject: string[];
/** Harness `tools/pre-execute` 的决策结果。 */
type DockerPreToolDecision = {
    kind: 'allow';
} | {
    kind: 'deny';
    reason: string;
} | {
    kind: 'ask';
    reason?: string;
};
/** 审批策略需要读取的工具执行字段。 */
interface DockerToolExecution {
    readonly name: string;
    readonly arguments: unknown;
}
/** Harness `tools/pre-execute` waterfall 监听器。 */
type DockerPreExecuteListener = (exec: DockerToolExecution, next: () => Promise<DockerPreToolDecision>) => Promise<DockerPreToolDecision>;
/** 插件所需的最小 ctx 面。 */
export interface DockerPluginContext {
    subprocess: {
        spawn: SubprocessSpawnLike;
    };
    tools: {
        register(definition: DockerToolDefinition): () => void;
    };
    on(event: 'tools/pre-execute', listener: DockerPreExecuteListener): () => void;
    on(event: 'dispose', listener: () => void): () => void;
}
/**
 * 插件入口：解析配置、封装执行器、注册七工具；为 docker_exec 与破坏性 docker_manage 注入审批门。
 */
export declare function apply(ctx: DockerPluginContext, config?: DockerConfig | null): void;
export * from './args.js';
export * from './config.js';
export * from './exec.js';
export * from './parse.js';
export * from './tools.js';
