/**
 * docker 输出解析：ps JSON 行 → 容器列表；inspect JSON → 摘要。
 *
 * @module dsh-docker/parse
 */
function parseJsonLines(text, command) {
    const rows = [];
    let lineNumber = 0;
    for (const line of text.split(/\r?\n/)) {
        lineNumber += 1;
        const trimmed = line.trim();
        if (trimmed === '')
            continue;
        let raw;
        try {
            raw = JSON.parse(trimmed);
        }
        catch (error) {
            throw new Error('docker ' + command + ' 输出第 ' + lineNumber + ' 行不是有效 JSON。', { cause: error });
        }
        if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
            throw new Error('docker ' + command + ' 输出第 ' + lineNumber + ' 行不是 JSON 对象。');
        }
        rows.push(raw);
    }
    return rows;
}
/** docker ps --format json 的每一行解析；任何坏行都视为不完整结果。 */
export function parsePsJson(text) {
    return parseJsonLines(text, 'ps').map((raw) => ({
        id: typeof raw.ID === 'string' ? raw.ID : String(raw.ID ?? ''),
        name: typeof raw.Names === 'string' ? raw.Names : String(raw.Names ?? ''),
        image: typeof raw.Image === 'string' ? raw.Image : String(raw.Image ?? ''),
        status: typeof raw.Status === 'string' ? raw.Status : String(raw.Status ?? ''),
        state: typeof raw.State === 'string' ? raw.State : String(raw.State ?? ''),
    }));
}
/** docker images --format json 的每一行解析；任何坏行都视为不完整结果。 */
export function parseImagesJson(text) {
    return parseJsonLines(text, 'images').map((raw) => ({
        id: typeof raw.ID === 'string' ? raw.ID : String(raw.ID ?? ''),
        repository: typeof raw.Repository === 'string' ? raw.Repository : String(raw.Repository ?? ''),
        tag: typeof raw.Tag === 'string' ? raw.Tag : String(raw.Tag ?? ''),
        size: typeof raw.Size === 'string' ? raw.Size : String(raw.Size ?? ''),
        createdSince: typeof raw.CreatedSince === 'string' ? raw.CreatedSince : String(raw.CreatedSince ?? ''),
    }));
}
/** docker inspect 的 JSON 摘要。 */
export function parseInspectJson(text) {
    const raw = JSON.parse(text);
    if (!Array.isArray(raw) || raw.length === 0)
        return {};
    const first = raw[0];
    const config = (typeof first.Config === 'object' && first.Config !== null ? first.Config : {});
    const networkSettings = (typeof first.NetworkSettings === 'object' && first.NetworkSettings !== null ? first.NetworkSettings : {});
    const ports = Array.isArray(networkSettings.Ports) ? networkSettings.Ports : [];
    const portList = ports.filter((port) => port.PublicPort !== undefined && port.PublicPort !== null);
    const bindings = typeof networkSettings.Ports === 'object' && networkSettings.Ports !== null && !Array.isArray(networkSettings.Ports)
        ? Object.entries(networkSettings.Ports).flatMap(([target, values]) => {
            if (!Array.isArray(values))
                return [];
            return values.flatMap(value => {
                if (typeof value !== 'object' || value === null || typeof value.HostPort !== 'string' || value.HostPort === '')
                    return [];
                const host = typeof value.HostIp === 'string' ? value.HostIp : '';
                return [(host ? (host.includes(':') ? '[' + host + ']' : host) + ':' : '') + value.HostPort + '->' + target];
            });
        }) : portList.map((port) => String(port.PublicPort) + '/' + String(port.Type ?? 'tcp'));
    return {
        id: typeof first.Id === 'string' ? first.Id.slice(0, 12) : String(first.Id ?? '').slice(0, 12),
        name: typeof first.Name === 'string' ? first.Name.replace(/^\//, '') : '',
        image: typeof config.Image === 'string' ? config.Image : '',
        state: (typeof first.State === 'object' && first.State !== null ? first.State.Status : '') ?? '',
        running: (typeof first.State === 'object' && first.State !== null ? first.State.Running : false) === true,
        startedAt: (typeof first.State === 'object' && first.State !== null ? first.State.StartedAt : '') ?? '',
        ports: bindings,
    };
}
