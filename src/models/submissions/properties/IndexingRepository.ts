import { MaskingPolicy } from './Policies.js';
import { SubmissionRepository } from './Repository.js';

export interface SubmissionIndexingRepository extends SubmissionRepository {
  /** Masking policy of this document. When the repository has its own policy, the stricter one applies. */
  maskingPolicy: MaskingPolicy;

}
