/** Response of `Copyleaks.getRepositoryInfoAsync`. */
export interface CopyleaksRepositoryInfoResponseModel {
  id: string;
  name: string;
  description?: string | null;
  /** Your permission level on the repository. */
  permission: number;
  /** 0 = running, 1 = pending for deletion, 2 = error, 3 = updating, 4 = payment required. */
  status: number;
  /** Credit limit of the repository. */
  maxCredits?: number;
  /** Credits used by the repository. */
  currentCredits?: number;
  /** 0 = no masking, 1 = mask other users' documents, 2 = mask all documents. See `MaskingPolicy`. */
  maskingPolicy?: number;
  /** Creation time of the repository. */
  creationTime?: string;
}
