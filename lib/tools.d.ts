import { type ResolvedDockerConfig } from './config.js';
import { type ProcessRunner } from './exec.js';
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
/** 构建五个工具定义。 */
export declare function buildDockerTools(config: ResolvedDockerConfig, runner: ProcessRunner): DockerToolDefinition[];
