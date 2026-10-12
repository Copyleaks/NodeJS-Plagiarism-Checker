/**
 * Response of `Copyleaks.startAsync`.
 * For more info: https://docs.copyleaks.com/reference/actions/authenticity/start
 */
export interface CopyleaksStartResponseModel {
    /** Scans that were started. */
    success: CopyleaksStartResponseScanModel[];
    /** Scans that failed to start. */
    failed: CopyleaksStartResponseScanModel[];
}
/**
 * A scan listed in `CopyleaksStartResponseModel`.
 */
export interface CopyleaksStartResponseScanModel {
    /** The scan id. */
    id: string;
}
