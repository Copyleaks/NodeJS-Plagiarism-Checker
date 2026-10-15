import { CopyleaksAuthToken, CopyleaksImagePlagiarismResponseModel } from "../models/response/index.js";
import { CopyleaksImagePlagiarismRequestModel } from "../models/request/index.js";
import { ClientUtils } from "../utils/client-utils.utils.js";
import { CopyleaksHttp } from "../http/CopyleaksHttp.js";
import { CopyleaksOptions } from "../http/CopyleaksOptions.js";
import { buildMultipartForm } from "../http/wire.js";

/** Image Plagiarism Detector: search the web for copies of an image. */
export class ImagePlagiarismClient {
  private readonly http: CopyleaksHttp;

  /**
   * @param options Optional settings, see `CopyleaksOptions`. `new Copyleaks(options)` passes its own options.
   */
  constructor(options?: CopyleaksOptions) {
    this.http = new CopyleaksHttp(options);
  }

  /**
   * Returns the full and partial matches of the image, with the web pages that show them.
   * For more info: https://docs.copyleaks.com/reference/actions/image-plagiarism-detector/check
   * @param scanId Your own ID for the scan, 3 to 36 characters.
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
