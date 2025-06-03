import { MaskingPolicy } from './Policies';
import { SubmissionRepository } from './Repository';
export interface SubmissionIndexingRepository extends SubmissionRepository {
    /**
     * allows to specify a document masking policy on the document level.
     *
     * If the repo has it's own masking policy, the stricter policy will be applied to results from this document.
     */
    maskingPolicy: MaskingPolicy;
}
