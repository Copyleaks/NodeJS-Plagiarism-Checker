import { SubmissionRepository } from './Repository.js';

export interface SubmissionScanningRepository extends SubmissionRepository {
  /** Compare against your own submissions in the repository. */
  includeMySubmissions: boolean;
  /** Compare against other users' submissions in the repository. */
  includeOthersSubmissions: boolean;
}