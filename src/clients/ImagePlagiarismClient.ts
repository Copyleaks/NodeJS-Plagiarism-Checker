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
import { CopyleaksAuthToken, CopyleaksImagePlagiarismResponseModel } from "../models/response/index.js";
import { CopyleaksImagePlagiarismRequestModel } from "../models/request/index.js";
import { ClientUtils } from "../utils/client-utils.utils.js";
import { CopyleaksHttp } from "../http/CopyleaksHttp.js";
import { CopyleaksOptions } from "../http/CopyleaksOptions.js";
import { buildMultipartForm } from "../http/wire.js";

/**
 * Image Plagiarism Detector: search the web for copies of an image.
 */
export class ImagePlagiarismClient {
  private readonly http: CopyleaksHttp;

  /**
   * @param options Optional settings, see `CopyleaksOptions`. `new Copyleaks(options)` passes its own options.
   */
  constructor(options?: CopyleaksOptions) {
    this.http = new CopyleaksHttp(options);
  }

  /**
   * Searches the web for copies of an image: full matches (exact or near-exact copies) and partial matches
   * (cropped, resized or modified), with the web pages that show them. The image is uploaded as multipart/form-data.
   * Set `sandbox` to true to get mock results without using credits.
   * For more info: https://docs.copyleaks.com/reference/actions/image-plagiarism-detector/check
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException, AuthExipredException.
   * @param authToken Copyleaks authentication token
   * @param scanId Attach your own scan Id, 3 to 36 characters.
   * @param submission The image bytes, file name and options.
   */
  public async submitAsync(
    authToken: CopyleaksAuthToken,
    scanId: string,
    submission: CopyleaksImagePlagiarismRequestModel
  ): Promise<CopyleaksImagePlagiarismResponseModel> {
    ClientUtils.verifyAuthToken(authToken);
    const form = buildMultipartForm(
      { field: "image", data: submission.image, filename: submission.filename },
      {
        filename: submission.filename,
        sandbox: String(submission.sandbox ?? false),
        developerPayload: submission.developerPayload,
      });
    const response = await this.http.request<CopyleaksImagePlagiarismResponseModel>({
      method: "POST",
      url: this.http.apiUrl(`/v1/image-plagiarism-detector/${scanId}/check`),
      authToken,
      body: form,
    });
    return response.data;
  }
}
