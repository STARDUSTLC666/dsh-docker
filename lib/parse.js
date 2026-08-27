/**
 * docker 输出解析：ps JSON 行 → 容器列表；inspect JSON → 摘要。
 *
 * @module dsh-docker/parse
 */
/** docker ps --format json 的每一行解析。 */
export function parsePsJson(text) {
    const rows = [];
    for (const line of text.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (trimmed === '')
            continue;
        try {
            const raw = JSON.parse(trimmed);
            rows.push({
                id: typeof raw.ID === 'string' ? raw.ID : String(raw.ID ?? ''),
                name: typeof raw.Names === 'string' ? raw.Names : String(raw.Names ?? ''),
                image: typeof raw.Image === 'string' ? raw.Image : String(raw.Image ?? ''),
                status: typeof raw.Status === 'string' ? raw.Status : String(raw.Status ?? ''),
                state: typeof raw.State === 'string' ? raw.State : String(raw.State ?? ''),
            });
        }
        catch { /* 跳过坏行 */ }
    }
    return rows;
}
/** docker images --format json 的每一行解析。 */
export function parseImagesJson(text) {
    const rows = [];
    for (const line of text.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (trimmed === '')
            continue;
        try {
            const raw = JSON.parse(trimmed);
            rows.push({
                id: typeof raw.ID === 'string' ? raw.ID : String(raw.ID ?? ''),
                repository: typeof raw.Repository === 'string' ? raw.Repository : String(raw.Repository ?? ''),
                tag: typeof raw.Tag === 'string' ? raw.Tag : String(raw.Tag ?? ''),
                size: typeof raw.Size === 'string' ? raw.Size : String(raw.Size ?? ''),
                createdSince: typeof raw.CreatedSince === 'string' ? raw.CreatedSince : String(raw.CreatedSince ?? ''),
            });
        }
        catch { /* 跳过坏行 */ }
    }
    return rows;
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
    return {
        id: typeof first.Id === 'string' ? first.Id.slice(0, 12) : String(first.Id ?? '').slice(0, 12),
        name: typeof first.Name === 'string' ? first.Name.replace(/^\//, '') : '',
        image: typeof config.Image === 'string' ? config.Image : '',
        state: (typeof first.State === 'object' && first.State !== null ? first.State.Status : '') ?? '',
        running: (typeof first.State === 'object' && first.State !== null ? first.State.Running : false) === true,
        startedAt: (typeof first.State === 'object' && first.State !== null ? first.State.StartedAt : '') ?? '',
        ports: portList.map((port) => String(port.PublicPort) + '/' + String(port.Type ?? 'tcp')),
    };
}
