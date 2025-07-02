import { CopyleaksExportModel } from './models/exports';
import { CopyleaksDeleteRequestModel } from './models/request';
import { CopyleaksStartRequestModel } from './models/request/CopyleaksStartRequestModel';
import { CopyleaksAuthToken } from './models/response';
import { CopyleaksFileOcrSubmissionModel, CopyleaksFileSubmissionModel, CopyleaksURLSubmissionModel } from './models/submissions';
import { AIDetectionClient } from './clients/AIDetectionClient';
import { WritingAssistantClient } from './clients/WritingAssistantClient';
export declare class Copyleaks {
    readonly aiDetectionClient: AIDetectionClient;
    readonly writingAssistantClient: WritingAssistantClient;
    constructor();
    /**
     * Login to Copyleaks authentication server.
     * For more info: https://api.copyleaks.com/documentation/v3/account/login.
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     * @param email Copyleaks account email address.
     * @param key Copyleaks account secret key.
     * @returns A authentication token that being expired after certain amount of time.
     */
    loginAsync(email: string, key: string): Promise<CopyleaksAuthToken>;
    /**
     * Verify that Copyleaks authentication token is exists and not exipired.
     * * Exceptions:
     *  * AuthExipredException: authentication expired. Need to login again.
     * @param authToken Copyleaks authentication token
     */
    verifyAuthToken(authToken: CopyleaksAuthToken): void;
    /**
     * Starting a new process by providing a file to scan.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/submit/file
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     * @param authToken Copyleaks authentication token
     * @param scanId Attach your own scan Id
     * @param submission Submission properties
     */
    submitFileAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksFileSubmissionModel): Promise<void>;
    /**
     * Starting a new process by providing a OCR image file to scan.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/submit/ocr
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     * @param authToken Copyleaks authentication token
     * @param scanId Attach your own scan Id
     * @param submission Submission properties
     */
    submitFileOcrAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksFileOcrSubmissionModel): Promise<void>;
    /**
     * Starting a new process by providing a URL to scan.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/submit/url
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     * @param authToken Copyleaks authentication token
     * @param scanId Attach your own scan Id
     * @param submission Submission properties
     */
    submitUrlAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksURLSubmissionModel): Promise<void>;
    /**
     * Exporting scans artifact into your server.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/downloads/export
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     * @param authToken Your login token to Copyleaks server
     * @param scanId The scan ID of the specific scan to export.
     * @param exportId A new Id for the export process.
     * @param model Request of which artifact should be exported.
     */
    exportAsync(authToken: CopyleaksAuthToken, scanId: string, exportId: string, model: CopyleaksExportModel): Promise<void>;
    /**
     * Start scanning all the files you submitted for a price-check.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/start
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     * @param authToken Your login token to Copyleaks server.
     * @param model Include information about which scans should be started.
     */
    startAsync(authToken: CopyleaksAuthToken, model: CopyleaksStartRequestModel): Promise<any>;
    /**
     * Delete the specific process from the server.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/delete
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     * @param authToken Copyleaks authentication token
     * @param payloads
     */
    deleteAsync(authToken: CopyleaksAuthToken, payloads: CopyleaksDeleteRequestModel): Promise<void>;
    /**
     * Resend status webhooks for existing scans.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/webhook-resend
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     * @param authToken Copyleaks authentication token
     * @param scanId Copyleaks scan Id
     */
    resendWebhookAsync(authToken: CopyleaksAuthToken, scanId: string): Promise<void>;
    /**
     * Get current credits balance for the Copyleaks account.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/credits
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     *  * RateLimitException: Too many requests. Please wait before calling again.
     * @param authToken Copyleaks authentication token
     */
    getCreditsBalanceAsync(authToken: CopyleaksAuthToken): Promise<any>;
    /**
     * This endpoint allows you to export your usage history between two dates.
     * The output results will be exported to a csv file and it will be attached to the response.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/usages/history
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     *  * RateLimitException: Too many requests. Please wait before calling again.
     * @param authToken Copyleaks authentication token.
     * @param startDate The start date to collect usage history from. Date Format: `dd-MM-yyyy`.
     * @param endDate The end date to collect usage history from. Date Format: `dd-MM-yyyy`.
     */
    getUsagesHistoryCsvAsync(authToken: CopyleaksAuthToken, startDate: string, endDate: string): Promise<any>;
    /**
     * Get updates about copyleaks api release notes.
     * For more info: https://api.copyleaks.com/documentation/v3/release-notes
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     *  * RateLimitException: Too many requests. Please wait before calling again.
     * @returns List of release notes.
     */
    getReleaseNotesAsync(): Promise<any>;
    /**
     * Get a list of the supported file types.
     * For more info: https://api.copyleaks.com/documentation/v3/specifications/supported-file-types
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     *  * RateLimitException: Too many requests. Please wait before calling again.
     * @returns List of supported file types.
     */
    getSupportedFileTypesAsync(): Promise<any>;
    /**
     * Get a list of the supported languages for OCR (this is not a list of supported languages for the api, but only for the OCR files scan).
     * For more info: https://api.copyleaks.com/documentation/v3/specifications/ocr-languages/list
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     *  * RateLimitException: Too many requests. Please wait before calling again.
     * @returns List of supported OCR languages.
     */
    getOCRSupportedLanguagesAsync(): Promise<any>;
}
