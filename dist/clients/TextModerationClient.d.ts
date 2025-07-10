import { CopyleaksAuthToken, CopyleaksTextModerationResponseModel } from "../models/response";
import { CopyleaksTextModerationRequestModel } from "../models/request/TextModeration/CopyleaksTextModerationRequestModel";
export declare class TextModerationClient {
    /**
  This endpoint will receive submitted text to be checked. The response will show potentially harmful content across multiple categories
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
    submitTextAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksTextModerationRequestModel): Promise<CopyleaksTextModerationResponseModel>;
}
