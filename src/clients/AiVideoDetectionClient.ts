import { CopyleaksAuthToken } from "../models/response/index.js";
import { CopyleaksAiVideoDetectionRequestModel } from "../models/request/index.js";
import { ClientUtils } from "../utils/client-utils.utils.js";
import { CopyleaksHttp } from "../http/CopyleaksHttp.js";
import { CopyleaksOptions } from "../http/CopyleaksOptions.js";

/** AI Video Detector: detect AI-generated audio and visuals in a video. */
export class AiVideoDetectionClient {
  private readonly http: CopyleaksHttp;

  /**
   * @param options Optional settings, see `CopyleaksOptions`. `new Copyleaks(options)` passes its own options.
   */
  constructor(options?: CopyleaksOptions) {
    this.http = new CopyleaksHttp(options);
  }

  /**
   * Submits a video URL and returns once it is accepted (HTTP 201). Copyleaks downloads the video and POSTs
   * the result, a `CopyleaksAiVideoDetectionResponseModel`, to `submission.webhooks.url`.
   * For more info: https://docs.copyleaks.com/reference/actions/ai-video-detector/submit
   * @param scanId Your own ID for the scan, 3 to 36 characters.
   */
  public async submitAsync(
    authToken: CopyleaksAuthToken,
    scanId: string,
    submission: CopyleaksAiVideoDetectionRequestModel
  ): Promise<void> {
    ClientUtils.verifyAuthToken(authToken);
    await this.http.request({
      method: "POST",
      url: this.http.apiUrl(`/v1/ai-video-detector/${scanId}/submit`),
      authToken,
      body: submission,
    });
  }
}
