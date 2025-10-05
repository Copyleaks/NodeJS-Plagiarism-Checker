import { CopyleaksAiImageDetectionResponseModel, CopyleaksAuthToken } from "../models/response";
import { CopyleaksAiImageDetectionRequestModel } from "../models/request";
export declare class AiImageDetectionClient {
    /**
  This endpoint will receive submitted image to be checked.
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
   * @param submission Submission image request model
   */
    submitAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksAiImageDetectionRequestModel): Promise<CopyleaksAiImageDetectionResponseModel>;
}
