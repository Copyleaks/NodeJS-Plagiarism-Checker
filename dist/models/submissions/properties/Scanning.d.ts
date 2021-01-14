import { SubmissionScanningCopyleaksDB } from './CopyleaksDB';
import { SubmissionScanningExclude } from './ScanningExclude';
import { SubmissionScanningRepository } from './ScanningRepository';
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
