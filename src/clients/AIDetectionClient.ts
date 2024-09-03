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
import axios from 'axios';
import { CopyleaksConfig } from '../app.config';
import { UnderMaintenanceException, RateLimitException, CommandException } from '../models/exceptions';
import { CopyleaksAuthToken } from '../models/response';
import { CopyleaksNaturalLanguageSubmissionModel, CopyleaksSourceCodeSubmissionModel, CopyleaksWritingAssistantSubmissionModel } from '../models/submissions';
import { isSuccessStatusCode, isUnderMaintenanceResponse, isRateLimitResponse } from '../utils';
import { ClientUtils } from '../utils/client-utils.utils';

export class AIDetectionClient {

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
  public async submitNaturalTextAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksNaturalLanguageSubmissionModel) {
    ClientUtils.verifyAuthToken(authToken);

    const url = `${CopyleaksConfig.API_SERVER_URI}/v2/writer-detector/${scanId}/check`;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': CopyleaksConfig.USER_AGENT,
      'Authorization': `Bearer ${authToken['access_token']}`
    }

    const response = await axios.post(url, submission, { headers });
    if (isSuccessStatusCode(response.status))
      return response.data;
    else if (isUnderMaintenanceResponse(response.status)) {
      throw new UnderMaintenanceException()
    } else if (isRateLimitResponse(response.status)) {
      throw new RateLimitException();
    } else {
      throw new CommandException(response)
    }
  }

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
  public async submitSourceCodeAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksSourceCodeSubmissionModel) {
    ClientUtils.verifyAuthToken(authToken);

    const url = `${CopyleaksConfig.API_SERVER_URI}/v2/writer-detector/source-code/${scanId}/check`;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': CopyleaksConfig.USER_AGENT,
      'Authorization': `Bearer ${authToken['access_token']}`
    }

    const response = await axios.post(url, submission, { headers });
    if (isSuccessStatusCode(response.status))
      return response.data;
    else if (isUnderMaintenanceResponse(response.status)) {
      throw new UnderMaintenanceException()
    } else if (isRateLimitResponse(response.status)) {
      throw new RateLimitException();
    } else {
      throw new CommandException(response)
    }
  }
}
