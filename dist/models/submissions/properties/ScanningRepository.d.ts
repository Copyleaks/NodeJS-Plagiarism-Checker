import { SubmissionRepository } from './Repository';
export interface SubmissionScanningRepository extends SubmissionRepository {
    /**
     * Compare the scanned document against MY submittions in the repository.
     */
    includeMySubmissions: boolean;
    /**
     * Compare the scanned document against OTHER users submittions in the repository.
     */
    includeOthersSubmissions: boolean;
}
