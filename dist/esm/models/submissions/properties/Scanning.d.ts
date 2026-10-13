import { SubmissionScanningCopyleaksDB } from './CopyleaksDB.js';
import { SubmissionScanningExclude } from './ScanningExclude.js';
import { SubmissionScanningRepository } from './ScanningRepository.js';
export interface SubmissionScanning {
    /**
     * Compare your content with online sources.
     */
    internet?: boolean;
    /**
     * Check inner properties for more details.
     */
    exclude?: SubmissionScanningExclude;
    /**
     * Check inner properties for more details.
     */
    repositories?: SubmissionScanningRepository[];
    /**
     * Check inner properties for more details.
     */
    copyleaksDb?: SubmissionScanningCopyleaksDB;
}
