import { SubmissionActions } from './Actions';
import { SubmissionAuthor } from './Author';
import { SubmissionExclude } from './Exclude';
import { SubmissionFilter } from './Filter';
import { SubmissionIndexing } from './Indexing';
import { SubmissionPDF } from './PdfProperties';
import { SubmissionScanning } from './Scanning';
import { SubmissionSensitiveData } from './SensitiveDataProtection';
import { SubmissionWebhooks } from './Webhooks';
export interface SubmissionProperties {
    webhooks: SubmissionWebhooks;
    /**
     * By default, Copyleaks will present the report in text format. If set to true, Copyleaks will also include html format.
     */
    includeHtml?: boolean;
    /**
     * Add custom developer payload that will then be provided on the webhooks.
     * https://api.copyleaks.com/documentation/v3/webhooks
     */
    developerPayload?: string;
    /**
     * You can test the integration with the Copyleaks API for free using the sandbox mode.
     *
     * You will be able to submit content for a scan and get back mock results, simulating the way Copyleaks will work to make sure that you successfully integrated with the API.
     *
     * Turn off this feature on production environment.
     */
    sandbox?: boolean;
    /**
     * Specify the maximum life span of a scan in hours on the Copyleaks servers.
     *
     * When expired, the scan will be deleted and will no longer be accessible.
     */
    expiration?: number;
    /**
     * You can control the level of plagiarism sensitivity that will be identified according to the speed of the scan.
     * If you prefer a faster scan with the results that contains the highest amount of plagiarism choose 1,
     * and if a slower, more comprehensive scan, that will also detect the smallest instances choose 5.
     */
    sensitivityLevel?: number;
    /**
     * When set to true the submitted document will be checked for cheating. If a cheating will be detected, a scan alert will be added to the completed webhook.
     */
    cheatDetection?: boolean;
    /**
     * Types of content submission actions.
     *
     * * Possible values:
     *  * Scan: Start scan immediately.
     *  * Check Credits: Check how many credits will be used for this scan.
     *  * Index Only: Only index the file in the Copyleaks internal database. No credits will be used.
     */
    action?: SubmissionActions;
    /**
     * Check inner properties for more details.
     */
    author?: SubmissionAuthor;
    /**
     * Check inner properties for more details.
     */
    filters?: SubmissionFilter;
    /**
     * Check inner properties for more details.
     */
    scanning?: SubmissionScanning;
    /**
     * Check inner properties for more details.
     */
    indexing?: SubmissionIndexing;
    /**
     * Check inner properties for more details.
     */
    exclude?: SubmissionExclude;
    /**
     * Check inner properties for more details.
     */
    pdf?: SubmissionPDF;
    /**
     * Check inner properties for more details.
     */
    sensitiveDataProtection?: SubmissionSensitiveData;
}
