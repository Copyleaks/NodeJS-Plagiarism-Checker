import { CopyleaksAuthToken } from '../models/response';
import { CopyleaksWritingAssistantSubmissionModel } from '../models/submissions';
export declare class WritingAssistantClient {
    /**
    This endpoint will receive submitted text to be checked. The response will show the suggested corrections to the input text.
     *
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     *  * RateLimitException: Too many requests have been sent. The request has been rejected.
     */
    submitTextAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksWritingAssistantSubmissionModel): Promise<any>;
    /**
    Get a list of correction types supported within the Writing Assistant API. Correction types apply to all supported languages.
    The supplied language code for this request is used to determine the language of the texts returned.
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     */
    getCorrectionTypesAsync(authToken: CopyleaksAuthToken, languageCode: string): Promise<any>;
}
