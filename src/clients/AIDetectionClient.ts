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
import { CopyleaksAiTextDetectionCreditsResponseModel, CopyleaksAiTextDetectionResponseModel, CopyleaksAuthToken } from '../models/response/index.js';
import { CopyleaksNaturalLanguageSubmissionModel } from '../models/submissions/index.js';
import { ClientUtils } from '../utils/client-utils.utils.js';
import { CopyleaksHttp } from '../http/CopyleaksHttp.js';
import { CopyleaksOptions } from '../http/CopyleaksOptions.js';

export class AIDetectionClient {
  private readonly http: CopyleaksHttp;

  /**
   * @param options Optional settings, see `CopyleaksOptions`. `new Copyleaks(options)` passes its own options.
   */
  constructor(options?: CopyleaksOptions) {
    this.http = new CopyleaksHttp(options);
  }

  /**
    This endpoint will receive submitted text to be checked. At the end of the processing stage, 
    the result will be shown as classifications. Text classification is divided into sections. Each section may have a different classification.
  * For more info: https://docs.copyleaks.com/reference/actions/writer-detector/check
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
  public async submitNaturalTextAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksNaturalLanguageSubmissionModel): Promise<CopyleaksAiTextDetectionResponseModel> {
    ClientUtils.verifyAuthToken(authToken);
    const response = await this.http.request<CopyleaksAiTextDetectionResponseModel>({
      method: 'POST',
      url: this.http.apiUrl(`/v2/writer-detector/${scanId}/check`),
      authToken,
      body: submission,
    });
    return response.data;
  }

  /**
   * Get the credits available for AI text detection in your account wallet.
   * For more info: https://docs.copyleaks.com/reference/actions/writer-detector/credits
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException, AuthExipredException.
   * @param authToken Copyleaks authentication token
   */
  public async getCreditsBalanceAsync(authToken: CopyleaksAuthToken): Promise<CopyleaksAiTextDetectionCreditsResponseModel> {
    ClientUtils.verifyAuthToken(authToken);
    const response = await this.http.request<CopyleaksAiTextDetectionCreditsResponseModel>({
      method: 'GET',
      url: this.http.apiUrl('/v2/writer-detector/credits'),
      authToken,
    });
    return response.data;
  }
}
