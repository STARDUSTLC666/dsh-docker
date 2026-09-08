/**
 * 进程执行层：把 DSH 官方 subprocess 服务包装成 Promise 式 ProcessRunner（与 dsh-ffmpeg 同款）。
 * 全程 argv 数组、无 shell 解释。
 *
 * @module dsh-docker/exec
 */

export interface RunResult {
  exitCode: number | null
  signal: string | null
  stdout: string
  stderr: string
}

export interface ProcessRunner {
  run(argv: readonly string[], options?: { timeoutMs?: number; signal?: AbortSignal }): Promise<RunResult>
}

export interface SubprocessHandleLike {
  done: Promise<{ exitCode: number | null; signal: string | null }>
  collected: {
    stdout?: { readFrom(offset: number): { text: string } }
    stderr?: { readFrom(offset: number): { text: string } }
  }
  terminate(): void
}

export interface SubprocessSpawnLike {
  (spec: {
    argv: readonly string[]
    cwd: string
    stdio: { stdin: 'ignore'; stdout: { maxBytes: number }; stderr: { maxBytes: number } }
    graceMs: number
    signal?: AbortSignal
  }): SubprocessHandleLike
}

const COLLECT_BYTES = 4 * 1024 * 1024

/** 用 DSH subprocess 服务构造 ProcessRunner。 */
export function createSubprocessRunner(spawn: SubprocessSpawnLike, graceMs: number, defaultTimeoutMs: number): ProcessRunner {
  return {
    async run(argv, options) {
      const timeoutMs = options?.timeoutMs ?? defaultTimeoutMs
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(new Error('docker operation timed out')), timeoutMs)
      const signal = options?.signal === undefined
        ? controller.signal
        : AbortSignal.any([options.signal, controller.signal])
      let handle: SubprocessHandleLike
      try {
        handle = spawn({
          argv,
          cwd: process.cwd(),
          stdio: {
            stdin: 'ignore',
            stdout: { maxBytes: COLLECT_BYTES },
            stderr: { maxBytes: COLLECT_BYTES },
          },
          graceMs,
          signal,
        })
        const outcome = await handle.done
        const stdout = handle.collected.stdout?.readFrom(0).text ?? ''
        const stderr = handle.collected.stderr?.readFrom(0).text ?? ''
        return { exitCode: outcome.exitCode, signal: outcome.signal, stdout, stderr }
      } finally {
        clearTimeout(timer)
      }
    },
  }
}
