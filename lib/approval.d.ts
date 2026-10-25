/** Match the host policy without importing another copy of its services. */
export type DockerApprovalPolicy = 'ask' | 'never' | 'unknown';
export interface DockerApprovalService {
    config?: {
        policy?: unknown;
    };
    overrideOf?(session: unknown): unknown;
}
export declare function dockerApprovalPolicy(service: DockerApprovalService | undefined, execution: unknown): DockerApprovalPolicy;
export declare function dockerApprovalCheck(enabled: boolean, policy: DockerApprovalPolicy, setting: string): {
    ok: boolean;
    detail: string;
};
