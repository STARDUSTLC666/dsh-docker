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

function parseJsonLines(text: string, command: string): Record<string, unknown>[] {
  const rows: Record<string, unknown>[] = []
  let lineNumber = 0
  for (const line of text.split(/\r?\n/)) {
    lineNumber += 1
    const trimmed = line.trim()
    if (trimmed === '') continue
    let raw: unknown
    try {
      raw = JSON.parse(trimmed)
    } catch (error) {
      throw new Error('docker ' + command + ' 输出第 ' + lineNumber + ' 行不是有效 JSON。', { cause: error })
    }
    if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
      throw new Error('docker ' + command + ' 输出第 ' + lineNumber + ' 行不是 JSON 对象。')
    }
    rows.push(raw as Record<string, unknown>)
  }
  return rows
}

/** docker ps --format json 的每一行解析；任何坏行都视为不完整结果。 */
export function parsePsJson(text: string): ContainerInfo[] {
  return parseJsonLines(text, 'ps').map((raw) => ({
    id: typeof raw.ID === 'string' ? raw.ID : String(raw.ID ?? ''),
    name: typeof raw.Names === 'string' ? raw.Names : String(raw.Names ?? ''),
    image: typeof raw.Image === 'string' ? raw.Image : String(raw.Image ?? ''),
    status: typeof raw.Status === 'string' ? raw.Status : String(raw.Status ?? ''),
    state: typeof raw.State === 'string' ? raw.State : String(raw.State ?? ''),
  }))
}

/** 镜像摘要。 */
export interface ImageInfo {
  id: string
  repository: string
  tag: string
  size: string
  createdSince: string
}

/** docker images --format json 的每一行解析；任何坏行都视为不完整结果。 */
export function parseImagesJson(text: string): ImageInfo[] {
  return parseJsonLines(text, 'images').map((raw) => ({
    id: typeof raw.ID === 'string' ? raw.ID : String(raw.ID ?? ''),
    repository: typeof raw.Repository === 'string' ? raw.Repository : String(raw.Repository ?? ''),
    tag: typeof raw.Tag === 'string' ? raw.Tag : String(raw.Tag ?? ''),
    size: typeof raw.Size === 'string' ? raw.Size : String(raw.Size ?? ''),
    createdSince: typeof raw.CreatedSince === 'string' ? raw.CreatedSince : String(raw.CreatedSince ?? ''),
  }))
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
  const bindings = typeof networkSettings.Ports === 'object' && networkSettings.Ports !== null && !Array.isArray(networkSettings.Ports)
    ? Object.entries(networkSettings.Ports as Record<string, unknown>).flatMap(([target, values]) => {
      if (!Array.isArray(values)) return []
      return values.flatMap(value => {
        if (typeof value !== 'object' || value === null || typeof value.HostPort !== 'string' || value.HostPort === '') return []
        const host = typeof value.HostIp === 'string' ? value.HostIp : ''
        return [(host ? (host.includes(':') ? '[' + host + ']' : host) + ':' : '') + value.HostPort + '->' + target]
      })
    }) : portList.map((port) => String(port.PublicPort) + '/' + String(port.Type ?? 'tcp'))
  return {
    id: typeof first.Id === 'string' ? first.Id.slice(0, 12) : String(first.Id ?? '').slice(0, 12),
    name: typeof first.Name === 'string' ? first.Name.replace(/^\//, '') : '',
    image: typeof config.Image === 'string' ? config.Image : '',
    state: (typeof first.State === 'object' && first.State !== null ? (first.State as Record<string, unknown>).Status : '') ?? '',
    running: (typeof first.State === 'object' && first.State !== null ? (first.State as Record<string, unknown>).Running : false) === true,
    startedAt: (typeof first.State === 'object' && first.State !== null ? (first.State as Record<string, unknown>).StartedAt : '') ?? '',
    ports: bindings,
  }
}
