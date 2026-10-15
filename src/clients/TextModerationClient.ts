import { CopyleaksAuthToken, CopyleaksTextModerationResponseModel } from "../models/response/index.js";
import { ClientUtils } from "../utils/client-utils.utils.js";
import { CopyleaksTextModerationRequestModel } from "../models/request/TextModeration/CopyleaksTextModerationRequestModel.js";
import { CopyleaksHttp } from "../http/CopyleaksHttp.js";
import { CopyleaksOptions } from "../http/CopyleaksOptions.js";

/** Text Moderation. */
export class TextModerationClient {
  private readonly http: CopyleaksHttp;

  /**
   * @param options Optional settings, see `CopyleaksOptions`. `new Copyleaks(options)` passes its own options.
   */
  constructor(options?: CopyleaksOptions) {
    this.http = new CopyleaksHttp(options);
  }

  /**
   * Finds potentially harmful content in the text, for the requested labels.
   * For more info: https://docs.copyleaks.com/reference/actions/text-moderation/check
   * @param scanId Your own ID for the scan.
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
