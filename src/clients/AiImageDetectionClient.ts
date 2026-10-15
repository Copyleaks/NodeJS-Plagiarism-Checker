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

/** AI Image Detection. */
export class AiImageDetectionClient {
  private readonly http: CopyleaksHttp;

  /**
   * @param options Optional settings, see `CopyleaksOptions`. `new Copyleaks(options)` passes its own options.
   */
  constructor(options?: CopyleaksOptions) {
    this.http = new CopyleaksHttp(options);
  }

  /**
   * Checks a base64-encoded image for AI generation. To upload the raw bytes, use `submitFileAsync`.
   * For more info: https://docs.copyleaks.com/reference/actions/ai-image-detector/check
   * @param scanId Your own ID for the scan.
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
   * Same as `submitAsync`, but uploads the raw image bytes as multipart/form-data, without the base64 overhead.
   * For more info: https://docs.copyleaks.com/reference/actions/ai-image-detector/check
   * @param scanId Your own ID for the scan.
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
   * Submits an image URL and returns once it is accepted (HTTP 201). Copyleaks downloads the image and POSTs
   * the result, a `CopyleaksAiImageDetectionResponseModel`, to `submission.webhooks.url`.
   * For more info: https://docs.copyleaks.com/reference/actions/ai-image-detector/submit
   * @param scanId Your own ID for the scan.
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
