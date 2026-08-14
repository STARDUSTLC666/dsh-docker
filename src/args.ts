/**
 * docker CLI argv 构建器：纯函数，argv 数组、无 shell。
 *
 * @module dsh-docker/args
 */

/** 列出容器（JSON 格式，全部或按名称过滤）。 */
export function psArgs(docker: string, all: boolean, filter?: string): string[] {
  const argv = [docker, 'ps', all ? '--all' : '', '--format', 'json'].filter((item) => item !== '')
  if (filter !== undefined && filter !== '') argv.push('--filter', 'name=' + filter)
  return argv
}

/** 查看日志（tail 钳制）。 */
export function logsArgs(docker: string, container: string, tail: number, follow: boolean): string[] {
  return [docker, 'logs', follow ? '--follow' : '', '--tail', String(tail), container].filter((item) => item !== '')
}

/** 查看详情（docker inspect 原生 JSON）。 */
export function inspectArgs(docker: string, container: string): string[] {
  return [docker, 'inspect', container]
}

/** 容器内执行命令。 */
export function execArgs(docker: string, container: string, command: string[]): string[] {
  return [docker, 'exec', container, ...command]
}

/** 生命周期管理：start/stop/restart/rm。 */
export function manageArgs(docker: string, action: 'start' | 'stop' | 'restart' | 'rm', container: string): string[] {
  const flags = action === 'rm' ? ['rm', '--force'] : [action]
  return [docker, ...flags, container]
}

/** 拆分 exec 的命令字符串（按空白，支持引号）。 */
export function splitCommand(command: string): string[] {
  const parts: string[] = []
  const matches = command.match(/"[^"]*"|'[^']*'|\S+/g)
  if (matches === null) return []
  return matches.map((part) => part.replace(/^["']|["']$/g, ''))
}
