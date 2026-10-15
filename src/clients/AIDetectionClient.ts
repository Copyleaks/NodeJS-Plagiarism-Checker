import { CopyleaksAiTextDetectionCreditsResponseModel, CopyleaksAiTextDetectionResponseModel, CopyleaksAuthToken } from '../models/response/index.js';
import { CopyleaksNaturalLanguageSubmissionModel } from '../models/submissions/index.js';
import { ClientUtils } from '../utils/client-utils.utils.js';
import { CopyleaksHttp } from '../http/CopyleaksHttp.js';
import { CopyleaksOptions } from '../http/CopyleaksOptions.js';

/** AI Text Detection. */
export class AIDetectionClient {
  private readonly http: CopyleaksHttp;

  /**
   * @param options Optional settings, see `CopyleaksOptions`. `new Copyleaks(options)` passes its own options.
   */
  constructor(options?: CopyleaksOptions) {
    this.http = new CopyleaksHttp(options);
  }

  /**
   * Classifies each section of the text as human-written or AI-generated.
   * For more info: https://docs.copyleaks.com/reference/actions/writer-detector/check
   * @param scanId Your own ID for the scan.
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
   * Credits available for AI text detection.
   * For more info: https://docs.copyleaks.com/reference/actions/writer-detector/credits
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
