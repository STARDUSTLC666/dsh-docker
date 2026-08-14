/**
 * docker 输出解析：ps JSON 行 → 容器列表；inspect JSON → 摘要。
 *
 * @module dsh-docker/parse
 */

/** 容器摘要。 */
export interface ContainerInfo {
  id: string
  name: string
  image: string
  status: string
  state: string
}

/** docker ps --format json 的每一行解析。 */
export function parsePsJson(text: string): ContainerInfo[] {
  const rows: ContainerInfo[] = []
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (trimmed === '') continue
    try {
      const raw = JSON.parse(trimmed) as Record<string, unknown>
      rows.push({
        id: typeof raw.ID === 'string' ? raw.ID : String(raw.ID ?? ''),
        name: typeof raw.Names === 'string' ? raw.Names : String(raw.Names ?? ''),
        image: typeof raw.Image === 'string' ? raw.Image : String(raw.Image ?? ''),
        status: typeof raw.Status === 'string' ? raw.Status : String(raw.Status ?? ''),
        state: typeof raw.State === 'string' ? raw.State : String(raw.State ?? ''),
      })
    } catch { /* 跳过坏行 */ }
  }
  return rows
}

/** docker inspect 的 JSON 摘要。 */
export function parseInspectJson(text: string): Record<string, unknown> {
  const raw = JSON.parse(text) as unknown
  if (!Array.isArray(raw) || raw.length === 0) return {}
  const first = raw[0] as Record<string, unknown>
  const config = (typeof first.Config === 'object' && first.Config !== null ? first.Config : {}) as Record<string, unknown>
  const networkSettings = (typeof first.NetworkSettings === 'object' && first.NetworkSettings !== null ? first.NetworkSettings : {}) as Record<string, unknown>
  const ports = Array.isArray(networkSettings.Ports) ? networkSettings.Ports as Array<Record<string, unknown>> : []
  const portList = ports.filter((port) => port.PublicPort !== undefined && port.PublicPort !== null)
  return {
    id: typeof first.Id === 'string' ? first.Id.slice(0, 12) : String(first.Id ?? '').slice(0, 12),
    name: typeof first.Name === 'string' ? first.Name.replace(/^\//, '') : '',
    image: typeof config.Image === 'string' ? config.Image : '',
    state: (typeof first.State === 'object' && first.State !== null ? (first.State as Record<string, unknown>).Status : '') ?? '',
    running: (typeof first.State === 'object' && first.State !== null ? (first.State as Record<string, unknown>).Running : false) === true,
    startedAt: (typeof first.State === 'object' && first.State !== null ? (first.State as Record<string, unknown>).StartedAt : '') ?? '',
    ports: portList.map((port) => String(port.PublicPort) + '/' + String(port.Type ?? 'tcp')),
  }
}
