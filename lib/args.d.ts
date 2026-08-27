/**
 * docker CLI argv 构建器：纯函数，argv 数组、无 shell。
 *
 * @module dsh-docker/args
 */
/** 列出容器（JSON 格式，全部或按名称过滤）。 */
export declare function psArgs(docker: string, all: boolean, filter?: string): string[];
/** 查看日志（tail 钳制）。 */
export declare function logsArgs(docker: string, container: string, tail: number, follow: boolean): string[];
/** 列出镜像（JSON 格式；dangling=true 只列悬空镜像）。 */
export declare function imagesArgs(docker: string, dangling?: boolean): string[];
/** 查看详情（docker inspect 原生 JSON）。 */
export declare function inspectArgs(docker: string, container: string): string[];
/** 容器内执行命令。 */
export declare function execArgs(docker: string, container: string, command: string[]): string[];
/** 生命周期管理：start/stop/restart/rm。 */
export declare function manageArgs(docker: string, action: 'start' | 'stop' | 'restart' | 'rm', container: string): string[];
/** 拆分 exec 的命令字符串（按空白，支持引号）。 */
export declare function splitCommand(command: string): string[];
