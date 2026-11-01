import { MaskingPolicy } from './Policies.js';
import { SubmissionRepository } from './Repository.js';

export interface SubmissionIndexingRepository extends SubmissionRepository {
  /** Masking policy of this document. When left out, the repository's own policy applies; otherwise the stricter one does. */
  maskingPolicy?: MaskingPolicy;

}
