/** Response of `Copyleaks.startAsync`. */
export interface CopyleaksStartResponseModel {
  /** Scans that were started. */
  success: CopyleaksStartResponseScanModel[];
  /** Scans that failed to start. */
  failed: CopyleaksStartResponseScanModel[];
}

/** A scan listed in `CopyleaksStartResponseModel`. */
export interface CopyleaksStartResponseScanModel {
  id: string;
}
