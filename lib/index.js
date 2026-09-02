/**
 * dsh-docker —— 容器管理工具插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：注册六个面向模型的工具（docker_ps / docker_logs /
 * docker_images / docker_inspect / docker_exec / docker_manage）。进程执行走 DSH 官方 subprocess 服务
 * （argv 数组、无 shell），docker_exec 默认走宿主审批门。零运行时依赖。
 *
 * @module dsh-docker
 */
import { resolveConfig } from './config.js';
import { createSubprocessRunner } from './exec.js';
import { buildDockerTools } from './tools.js';
/** cordis 服务注入：apply 里要用 ctx.subprocess 与 ctx.tools。 */
export const name = 'docker';
export const inject = ['subprocess', 'tools'];
/**
 * 插件入口：解析配置、封装执行器、注册六工具；docker_exec 注入审批门。
 */
export function apply(ctx, config) {
    let cfg;
    try {
        cfg = resolveConfig(config);
    }
    catch (error) {
        console.warn('[dsh-docker] ' + (error instanceof Error ? error.message : String(error)));
        cfg = resolveConfig(null);
    }
    const runner = createSubprocessRunner(ctx.subprocess.spawn, cfg.graceMs, cfg.timeoutMs);
    const tools = buildDockerTools(cfg, runner);
    if (cfg.execApproval) {
        ctx.on('tools/pre-execute', async (exec, next) => {
            if (exec.name !== 'docker_exec')
                return next();
            const args = (typeof exec.arguments === 'object' && exec.arguments !== null ? exec.arguments : {});
            const command = typeof args.command === 'string' ? args.command : '';
            const container = typeof args.container === 'string' ? args.container : '';
            return {
                kind: 'ask',
                reason: 'docker_exec 需要确认：在容器 ' + (container || '（未指定）') + ' 内执行：' + command.slice(0, 200) + (command.length > 200 ? '…' : ''),
            };
        });
    }
    const disposers = [];
    for (const definition of tools) {
        disposers.push(ctx.tools.register(definition));
    }
    ctx.on('dispose', () => {
        for (const dispose of disposers)
            dispose();
    });
}
export * from './args.js';
export * from './config.js';
export * from './exec.js';
export * from './parse.js';
export * from './tools.js';
