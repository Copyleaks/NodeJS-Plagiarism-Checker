import { SubmissionScanningCopyleaksDB } from './CopyleaksDB.js';
import { CrossLanguages } from './CrossLanguages.js';
import { SubmissionScanningInclude } from './ScanningInclude.js';
import { SubmissionScanningExclude } from './ScanningExclude.js';
import { SubmissionScanningRepository } from './ScanningRepository.js';

export interface SubmissionScanning {
  /** Compare your content with online sources. */
  internet?: boolean;
  exclude?: SubmissionScanningExclude;
  repositories?: SubmissionScanningRepository[];
  copyleaksDb?: SubmissionScanningCopyleaksDB;
  /** Include only internal database and repository results whose scan id matches a pattern. */
  include?: SubmissionScanningInclude;
  /**
   * Cross-language plagiarism detection: also scan against content in these languages.
   * Each additional language is charged per page. Supported codes: `Copyleaks.getAllowedCrossLanguagesAsync()`.
   */
  crossLanguages?: CrossLanguages;
}