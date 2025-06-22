import { CopyleaksAuthToken } from '../models/response';
import { CopyleaksNaturalLanguageSubmissionModel, CopyleaksSourceCodeSubmissionModel } from '../models/submissions';
export declare class AIDetectionClient {
    /**
      This endpoint will receive submitted text to be checked. At the end of the processing stage,
      the result will be shown as classifications. Text classification is divided into sections. Each section may have a different classification.
    *
    * * Exceptions:
    *  * CommandExceptions: Server reject the request. See response status code,
    *     headers and content for more info.
    *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
    *     We recommend to implement exponential backoff algorithm as described here:
    *     https://api.copyleaks.com/documentation/v3/exponential-backoff
    *  * RateLimitException: Too many requests have been sent. The request has been rejected.
    * @param authToken Copyleaks authentication token
    * @param scanId Attach your own scan Id
    * @param submission Submission properties
    */
    submitNaturalTextAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksNaturalLanguageSubmissionModel): Promise<any>;
    /**
      This endpoint will receive submitted source code to be checked. At the end of the processing stage,
      the result will be shown as classifications. Source code classification is divided into sections. Each section may have a different classification.
     *
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     *  * RateLimitException: Too many requests have been sent. The request has been rejected.
     */
    submitSourceCodeAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksSourceCodeSubmissionModel): Promise<any>;
}
