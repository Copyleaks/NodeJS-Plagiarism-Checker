import { SubmissionIndexingRepository } from './IndexingRepository.js';

export interface SubmissionIndexing {
  repositories?: SubmissionIndexingRepository[];
  /** Add the submitted document to the Copyleaks Shared Data Hub. Default: false. */
  copyleaksDb?: boolean;
}
