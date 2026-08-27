/**
 * docker 输出解析：ps JSON 行 → 容器列表；inspect JSON → 摘要。
 *
 * @module dsh-docker/parse
 */
/** 容器摘要。 */
export interface ContainerInfo {
    id: string;
    name: string;
    image: string;
    status: string;
    state: string;
}
/** docker ps --format json 的每一行解析。 */
export declare function parsePsJson(text: string): ContainerInfo[];
/** 镜像摘要。 */
export interface ImageInfo {
    id: string;
    repository: string;
    tag: string;
    size: string;
    createdSince: string;
}
/** docker images --format json 的每一行解析。 */
export declare function parseImagesJson(text: string): ImageInfo[];
/** docker inspect 的 JSON 摘要。 */
export declare function parseInspectJson(text: string): Record<string, unknown>;
