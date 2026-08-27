/**
 * 进程执行层：把 DSH 官方 subprocess 服务包装成 Promise 式 ProcessRunner（与 dsh-ffmpeg 同款）。
 * 全程 argv 数组、无 shell 解释。
 *
 * @module dsh-docker/exec
 */
export interface RunResult {
    exitCode: number | null;
    signal: string | null;
    stdout: string;
    stderr: string;
}
export interface ProcessRunner {
    run(argv: readonly string[], options?: {
        timeoutMs?: number;
    }): Promise<RunResult>;
}
export interface SubprocessHandleLike {
    done: Promise<{
        exitCode: number | null;
        signal: string | null;
    }>;
    collected: {
        stdout?: {
            readFrom(offset: number): {
                text: string;
            };
        };
        stderr?: {
            readFrom(offset: number): {
                text: string;
            };
        };
    };
    terminate(): void;
}
export interface SubprocessSpawnLike {
    (spec: {
        argv: readonly string[];
        cwd: string;
        stdio: {
            stdin: 'ignore';
            stdout: {
                maxBytes: number;
            };
            stderr: {
                maxBytes: number;
            };
        };
        graceMs: number;
        signal?: AbortSignal;
    }): SubprocessHandleLike;
}
/** 用 DSH subprocess 服务构造 ProcessRunner。 */
export declare function createSubprocessRunner(spawn: SubprocessSpawnLike, graceMs: number, defaultTimeoutMs: number): ProcessRunner;
