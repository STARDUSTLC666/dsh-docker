/**
 * docker CLI argv 构建器：纯函数，argv 数组、无 shell。
 *
 * @module dsh-docker/args
 */
/** 列出容器（JSON 格式，全部或按名称过滤）。 */
export function psArgs(docker, all, filter) {
    const argv = [docker, 'ps', all ? '--all' : '', '--format', 'json'].filter((item) => item !== '');
    if (filter !== undefined && filter !== '')
        argv.push('--filter', 'name=' + filter);
    return argv;
}
/** 查看日志（tail 钳制）。 */
export function logsArgs(docker, container, tail, follow) {
    return [docker, 'logs', follow ? '--follow' : '', '--tail', String(tail), container].filter((item) => item !== '');
}
/** 列出镜像（JSON 格式；dangling=true 只列悬空镜像）。 */
export function imagesArgs(docker, dangling = false) {
    const argv = [docker, 'images', '--format', 'json'];
    if (dangling)
        argv.push('--filter', 'dangling=true');
    return argv;
}
/** 查看详情（docker inspect 原生 JSON）。 */
export function inspectArgs(docker, container) {
    return [docker, 'inspect', container];
}
/** 容器内执行命令。 */
export function execArgs(docker, container, command) {
    return [docker, 'exec', container, ...command];
}
/** 生命周期管理：start/stop/restart/rm。 */
export function manageArgs(docker, action, container) {
    const flags = action === 'rm' ? ['rm', '--force'] : [action];
    return [docker, ...flags, container];
}
/** 拆分 exec 的命令字符串（按空白，支持引号）。 */
export function splitCommand(command) {
    if (command.length > 32768 || command.includes('\0'))
        throw new Error('命令超过 32768 字符或含 NUL；请检查输入。');
    const parts = [];
    let token = '', started = false, quote = '';
    for (let i = 0; i < command.length; i++) {
        const ch = command[i];
        if (quote === "'") {
            if (ch === "'")
                quote = '';
            else
                token += ch;
            continue;
        }
        if (ch === '\\' && quote !== "'") {
            const next = command[i + 1];
            if (next === undefined)
                throw new Error('命令末尾的转义未完成，请使用 argv 传递原始参数。');
            if (quote === '"' && !['"', '\\', '$', '`', '\n'].includes(next))
                token += ch;
            else {
                i++;
                if (next !== '\n')
                    token += next;
            }
            started = true;
            continue;
        }
        if (quote === '"') {
            if (ch === '"')
                quote = '';
            else
                token += ch;
            continue;
        }
        if (ch === '"' || ch === "'") {
            quote = ch;
            started = true;
            continue;
        }
        if (/\s/.test(ch)) {
            if (started) {
                parts.push(token);
                token = '';
                started = false;
            }
            ;
            continue;
        }
        token += ch;
        started = true;
    }
    if (quote)
        throw new Error('命令引号未闭合，请修正或使用 argv 参数数组。');
    if (started)
        parts.push(token);
    return parts;
}
