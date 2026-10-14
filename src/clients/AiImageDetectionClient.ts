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
import {
  CopyleaksAiImageDetectionResponseModel,
  CopyleaksAuthToken,
} from "../models/response/index.js";
import { ClientUtils } from "../utils/client-utils.utils.js";
import {
  CopyleaksAiImageDetectionAsyncRequestModel,
  CopyleaksAiImageDetectionFileRequestModel,
  CopyleaksAiImageDetectionRequestModel,
} from "../models/request/index.js";
import { CopyleaksHttp } from "../http/CopyleaksHttp.js";
import { CopyleaksOptions } from "../http/CopyleaksOptions.js";
import { buildMultipartForm } from "../http/wire.js";

export class AiImageDetectionClient {
  private readonly http: CopyleaksHttp;

  /**
   * @param options Optional settings, see `CopyleaksOptions`. `new Copyleaks(options)` passes its own options.
   */
  constructor(options?: CopyleaksOptions) {
    this.http = new CopyleaksHttp(options);
  }

      /**
    This endpoint will receive submitted image to be checked. The image is sent as base64 in a JSON body.
    To upload the image bytes without base64, use `submitFileAsync`.
     * For more info: https://docs.copyleaks.com/reference/actions/ai-image-detector/check
     * * Exceptions:
     *  * CommandException: Server reject the request. See `status` and `body` for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     *  * RateLimitException: Too many requests have been sent. The request has been rejected.
     *  * NetworkException: No HTTP response, for example a timeout.
     * @param authToken Copyleaks authentication token
     * @param scanId Attach your own scan Id
     * @param submission Submission image request model
     */
  public async submitAsync(
    authToken: CopyleaksAuthToken,
    scanId: string,
    submission: CopyleaksAiImageDetectionRequestModel
  ): Promise<CopyleaksAiImageDetectionResponseModel> {
    ClientUtils.verifyAuthToken(authToken);
    const response = await this.http.request<CopyleaksAiImageDetectionResponseModel>({
      method: "POST",
      url: this.http.apiUrl(`/v1/ai-image-detector/${scanId}/check`),
      authToken,
      body: submission,
    });
    return new CopyleaksAiImageDetectionResponseModel(response.data);
  }

  /**
   * Checks an image for AI generation, uploading the image bytes as multipart/form-data.
   * Same endpoint and response as `submitAsync`, without the base64 overhead.
   * For more info: https://docs.copyleaks.com/reference/actions/ai-image-detector/check
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException, AuthExipredException.
   * @param authToken Copyleaks authentication token
   * @param scanId Attach your own scan Id
   * @param submission The image bytes, file name, model and options.
   */
  public async submitFileAsync(
    authToken: CopyleaksAuthToken,
    scanId: string,
    submission: CopyleaksAiImageDetectionFileRequestModel
  ): Promise<CopyleaksAiImageDetectionResponseModel> {
    ClientUtils.verifyAuthToken(authToken);
    const form = buildMultipartForm(
      { field: "image", data: submission.image, filename: submission.filename },
      {
        filename: submission.filename,
        model: submission.model,
        sandbox: String(submission.sandbox ?? false),
        maskType: submission.maskType,
        objectDetection: submission.objectDetection === undefined ? undefined : JSON.stringify(submission.objectDetection),
      });
    const response = await this.http.request<CopyleaksAiImageDetectionResponseModel>({
      method: "POST",
      url: this.http.apiUrl(`/v1/ai-image-detector/${scanId}/check`),
      authToken,
      body: form,
    });
    return new CopyleaksAiImageDetectionResponseModel(response.data);
  }

  /**
   * Submits an image URL for asynchronous AI image detection.
   * Copyleaks downloads the image and POSTs the result to `submission.webhooks.url`.
   * Parse the webhook body with `new CopyleaksAiImageDetectionResponseModel(body)`.
   * The call returns once the request is accepted (HTTP 201).
   * For more info: https://docs.copyleaks.com/reference/actions/ai-image-detector/submit
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException, AuthExipredException.
   * @param authToken Copyleaks authentication token
   * @param scanId Attach your own scan Id
   * @param submission The image URL, file name, model, webhook and options.
   */
  public async submitUrlAsync(
    authToken: CopyleaksAuthToken,
    scanId: string,
    submission: CopyleaksAiImageDetectionAsyncRequestModel
  ): Promise<void> {
    ClientUtils.verifyAuthToken(authToken);
    await this.http.request({
      method: "PUT",
      url: this.http.apiUrl(`/v1/ai-image-detector-async/${scanId}/submit`),
      authToken,
      body: submission,
    });
  }
}
