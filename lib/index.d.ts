/**
 * dsh-docker —— 容器管理工具插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：注册六个面向模型的工具（docker_ps / docker_logs /
 * docker_images / docker_inspect / docker_exec / docker_manage）。进程执行走 DSH 官方 subprocess 服务
 * （argv 数组、无 shell），docker_exec 默认走宿主审批门。零运行时依赖。
 *
 * @module dsh-docker
 */
import { type DockerConfig } from './config.js';
import { type SubprocessSpawnLike } from './exec.js';
import { type DockerToolDefinition } from './tools.js';
/** cordis 服务注入：apply 里要用 ctx.subprocess 与 ctx.tools。 */
export declare const name = "docker";
export declare const inject: string[];
/** 审批服务最小面。 */
export interface DockerApproval {
    request(options: {
        agent?: unknown;
        toolName?: unknown;
        callId?: unknown;
        reason: string;
        signal?: unknown;
    }): Promise<'allowed-once' | 'cancelled' | 'unavailable' | string>;
}
/** 插件所需的最小 ctx 面。 */
export interface DockerPluginContext {
    subprocess: {
        spawn: SubprocessSpawnLike;
    };
    tools: {
        register(definition: DockerToolDefinition, options?: {
            prepend?: boolean;
        }): () => void;
    };
    get?(name: 'approval'): DockerApproval | undefined;
    on?(event: string, listener: () => void): () => void;
}
/**
 * 插件入口：解析配置、封装执行器、注册六工具；docker_exec 注入审批门。
 */
export declare function apply(ctx: DockerPluginContext, config?: DockerConfig | null): void;
export * from './args.js';
export * from './config.js';
export * from './exec.js';
export * from './parse.js';
export * from './tools.js';
