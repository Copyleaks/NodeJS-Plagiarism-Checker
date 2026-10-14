/*
 The MIT License(MIT)

 Copyright(c) 2016 Copyleaks LTD (https://copyleaks.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/
import { CopyleaksAuthToken, CopyleaksTextModerationResponseModel } from "../models/response/index.js";
import { ClientUtils } from "../utils/client-utils.utils.js";
import { CopyleaksTextModerationRequestModel } from "../models/request/TextModeration/CopyleaksTextModerationRequestModel.js";
import { CopyleaksHttp } from "../http/CopyleaksHttp.js";
import { CopyleaksOptions } from "../http/CopyleaksOptions.js";

export class TextModerationClient {
  private readonly http: CopyleaksHttp;

  /**
   * @param options Optional settings, see `CopyleaksOptions`. `new Copyleaks(options)` passes its own options.
   */
  constructor(options?: CopyleaksOptions) {
    this.http = new CopyleaksHttp(options);
  }

      /**
    This endpoint will receive submitted text to be checked. The response will show potentially harmful content across multiple categories
     * For more info: https://docs.copyleaks.com/reference/actions/text-moderation/check
     * * Exceptions:
     *  * CommandException: Server reject the request. See `status` and `body` for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     *  * RateLimitException: Too many requests have been sent. The request has been rejected.
     *  * NetworkException: No HTTP response, for example a timeout.
     * @param authToken Copyleaks authentication token
     * @param scanId Attach your own scan Id
     * @param submission Submission properties
     */
  public async submitTextAsync(
    authToken: CopyleaksAuthToken,
    scanId: string,
    submission: CopyleaksTextModerationRequestModel
  ): Promise<CopyleaksTextModerationResponseModel> {
    ClientUtils.verifyAuthToken(authToken);
    const response = await this.http.request<CopyleaksTextModerationResponseModel>({
      method: "POST",
      url: this.http.apiUrl(`/v1/text-moderation/${scanId}/check`),
      authToken,
      body: submission,
    });
    return new CopyleaksTextModerationResponseModel(response.data);
  }
}
