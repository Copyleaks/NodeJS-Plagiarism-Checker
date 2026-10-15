import { AuthExipredException } from './models/exceptions/index.js';
import { CopyleaksExportModel } from './models/exports/index.js';
import { CopyleaksDeleteRequestModel } from './models/request/index.js';
import { CopyleaksStartRequestModel } from './models/request/CopyleaksStartRequestModel.js';
import {
  CopyleaksAiTextDetectionFileTypesResponseModel,
  CopyleaksAuthToken,
  CopyleaksCreditsBalanceResponseModel,
  CopyleaksCrossLanguagesResponseModel,
  CopyleaksReleaseNotesResponseModel,
  CopyleaksRepositoryInfoResponseModel,
  CopyleaksStartResponseModel,
  CopyleaksSupportedFileTypesResponseModel
} from './models/response/index.js';
import { CopyleaksFileOcrSubmissionModel, CopyleaksFileSubmissionModel, CopyleaksURLSubmissionModel } from './models/submissions/index.js';
import { AIDetectionClient } from './clients/AIDetectionClient.js';
import { WritingAssistantClient } from './clients/WritingAssistantClient.js';
import { TextModerationClient } from './clients/TextModerationClient.js';
import { AiImageDetectionClient } from './clients/AiImageDetectionClient.js';
import { ImagePlagiarismClient } from './clients/ImagePlagiarismClient.js';
import { AiVideoDetectionClient } from './clients/AiVideoDetectionClient.js';
import { CopyleaksHttp, withResolvedAxiosInstance } from './http/CopyleaksHttp.js';
import { CopyleaksOptions } from './http/CopyleaksOptions.js';
import { toWireSubmission } from './http/wire.js';

/**
 * Copyleaks API client. Errors thrown by every API call, here and in the product clients:
 *  * CommandException: the server rejected the request. Read `status` and `body` for the reason.
 *  * RateLimitException: HTTP 429. Wait `retryAfter` seconds when it is set.
 *  * UnderMaintenanceException: HTTP 503. Retry later with exponential backoff, see
 *    https://api.copyleaks.com/documentation/v3/exponential-backoff
 *  * NetworkException: no HTTP response, for example a timeout or a connection error.
 *  * AuthExipredException: the token passed to the method has expired. Log in again.
 */
export class Copyleaks {

  public readonly aiDetectionClient: AIDetectionClient;
  public readonly writingAssistantClient: WritingAssistantClient;
  public readonly textModerationClient: TextModerationClient;
  public readonly aiImageDetectionClient: AiImageDetectionClient;
  public readonly imagePlagiarismClient: ImagePlagiarismClient;
  public readonly aiVideoDetectionClient: AiVideoDetectionClient;
  private readonly http: CopyleaksHttp;

  /**
   * @param options Timeout, pool, retries, axios instance and server URLs; the product clients share them.
   */
  constructor(options?: CopyleaksOptions) {
    const shared = withResolvedAxiosInstance(options);
    this.http = new CopyleaksHttp(shared);
    this.aiDetectionClient = new AIDetectionClient(shared);
    this.writingAssistantClient = new WritingAssistantClient(shared);
    this.textModerationClient = new TextModerationClient(shared);
    this.aiImageDetectionClient = new AiImageDetectionClient(shared);
    this.imagePlagiarismClient = new ImagePlagiarismClient(shared);
    this.aiVideoDetectionClient = new AiVideoDetectionClient(shared);
  }

  /**
   * For more info: https://docs.copyleaks.com/reference/actions/account/login
   * @param key Copyleaks account secret key.
   * @returns The token for the other calls. It expires, see `verifyAuthToken`.
   */
  public async loginAsync(email: string, key: string): Promise<CopyleaksAuthToken> {
    const response = await this.http.request<CopyleaksAuthToken>({
      method: 'POST',
      url: this.http.identityUrl('/v3/account/login/api'),
      body: { email, key },
    });
    return response.data;
  }

  /** Throws `AuthExipredException` when the token has expired or expires within 5 minutes. */
  public verifyAuthToken(authToken: CopyleaksAuthToken) {

    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() + 5);

    const expiresDate = new Date(authToken['.expires']);

    if (expiresDate.getTime() <= date.getTime()) {
      throw new AuthExipredException();
    }
  }

  /**
   * Scans a file sent as base64.
   * For more info: https://docs.copyleaks.com/reference/actions/authenticity/submit-file
   * @param scanId Your own ID for the scan.
   */
  public async submitFileAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksFileSubmissionModel): Promise<void> {
    this.verifyAuthToken(authToken);
    await this.http.request({
      method: 'PUT',
      url: this.http.apiUrl(`/v3/scans/submit/file/${scanId}`),
      authToken,
      body: toWireSubmission(submission),
    });
  }

  /**
   * Scans the text in an image file (OCR).
   * For more info: https://docs.copyleaks.com/reference/actions/authenticity/submit-ocr
   * @param scanId Your own ID for the scan.
   */
  public async submitFileOcrAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksFileOcrSubmissionModel): Promise<void> {
    this.verifyAuthToken(authToken);
    await this.http.request({
      method: 'PUT',
      url: this.http.apiUrl(`/v3/scans/submit/ocr/${scanId}`),
      authToken,
      body: toWireSubmission(submission),
    });
  }

  /**
   * Scans the content at a URL.
   * For more info: https://docs.copyleaks.com/reference/actions/authenticity/submit-url
   * @param scanId Your own ID for the scan.
   */
  public async submitUrlAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksURLSubmissionModel): Promise<void> {
    this.verifyAuthToken(authToken);
    await this.http.request({
      method: 'PUT',
      url: this.http.apiUrl(`/v3/scans/submit/url/${scanId}`),
      authToken,
      body: toWireSubmission(submission),
    });
  }

  /**
   * Uploads scan artifacts (results, crawled version, reports) to your endpoints.
   * For more info: https://docs.copyleaks.com/reference/actions/downloads/export
   * @param exportId Your own new ID for the export.
   */
  public async exportAsync(authToken: CopyleaksAuthToken, scanId: string, exportId: string, model: CopyleaksExportModel): Promise<void> {
    this.verifyAuthToken(authToken);
    await this.http.request({
      method: 'POST',
      url: this.http.apiUrl(`/v3/downloads/${scanId}/export/${exportId}`),
      authToken,
      body: model,
    });
  }

  /**
   * Starts scans that were submitted with the `CheckCredits` action.
   * For more info: https://docs.copyleaks.com/reference/actions/authenticity/start
   */
  public async startAsync(authToken: CopyleaksAuthToken, model: CopyleaksStartRequestModel): Promise<CopyleaksStartResponseModel> {
    this.verifyAuthToken(authToken);
    const response = await this.http.request<CopyleaksStartResponseModel>({
      method: 'PATCH',
      url: this.http.apiUrl('/v3/scans/start'),
      authToken,
      body: model,
    });
    return response.data;
  }

  /**
   * Deletes scans from the Copyleaks servers.
   * For more info: https://docs.copyleaks.com/reference/actions/authenticity/delete
   */
  public async deleteAsync(authToken: CopyleaksAuthToken, payloads: CopyleaksDeleteRequestModel): Promise<void> {
    this.verifyAuthToken(authToken);
    await this.http.request({
      method: 'PATCH',
      url: this.http.apiUrl('/v3.1/scans/delete'),
      authToken,
      body: payloads,
    });
  }

  /**
   * Resends the status webhook of an existing scan.
   * For more info: https://docs.copyleaks.com/reference/actions/authenticity/resend-webhook
   */
  public async resendWebhookAsync(authToken: CopyleaksAuthToken, scanId: string): Promise<void> {
    this.verifyAuthToken(authToken);
    await this.http.request({
      method: 'POST',
      url: this.http.apiUrl(`/v3/scans/${scanId}/webhooks/resend`),
      authToken,
      // No body. The JSON content type is kept as in earlier versions, instead of the axios form default.
      json: true,
    });
  }

  /** Credit balance of the account. Docs: https://docs.copyleaks.com/reference/actions/admin/check-credits */
  public async getCreditsBalanceAsync(authToken: CopyleaksAuthToken): Promise<CopyleaksCreditsBalanceResponseModel> {
    this.verifyAuthToken(authToken);
    const response = await this.http.request<CopyleaksCreditsBalanceResponseModel>({
      method: 'GET',
      url: this.http.apiUrl('/v3/scans/credits'),
      authToken,
    });
    return response.data;
  }

  /**
   * Usage history between two dates, as CSV text.
   * For more info: https://docs.copyleaks.com/reference/actions/admin/usage-history
   * @param startDate Format: `dd-MM-yyyy`.
   * @param endDate Format: `dd-MM-yyyy`.
   */
  public async getUsagesHistoryCsvAsync(authToken: CopyleaksAuthToken, startDate: string, endDate: string): Promise<string> {
    this.verifyAuthToken(authToken);
    const response = await this.http.request<string>({
      method: 'GET',
      url: this.http.apiUrl('/v3/scans/usages/history'),
      authToken,
      params: { start: startDate, end: endDate },
      responseType: 'text',
    });
    return response.data;
  }

  /** Copyleaks API release notes. No login needed. */
  public async getReleaseNotesAsync(): Promise<CopyleaksReleaseNotesResponseModel> {
    const response = await this.http.request<CopyleaksReleaseNotesResponseModel>({
      method: 'GET',
      url: this.http.apiUrl('/v3/release-logs.json'),
    });
    return response.data;
  }

  /**
   * File types supported by plagiarism scans. No login needed.
   * For more info: https://docs.copyleaks.com/reference/actions/miscellaneous/supported-plagiarism-file-types
   */
  public async getSupportedFileTypesAsync(): Promise<CopyleaksSupportedFileTypesResponseModel> {
    const response = await this.http.request<CopyleaksSupportedFileTypesResponseModel>({
      method: 'GET',
      url: this.http.apiUrl('/v3/miscellaneous/supported-plagiarism-file-types'),
    });
    return response.data;
  }

  /**
   * File types supported by AI text detection. No login needed.
   * For more info: https://docs.copyleaks.com/reference/actions/miscellaneous/supported-ai-text-detection-file-types
   */
  public async getSupportedAiTextDetectionFileTypesAsync(): Promise<CopyleaksAiTextDetectionFileTypesResponseModel> {
    const response = await this.http.request<CopyleaksAiTextDetectionFileTypesResponseModel>({
      method: 'GET',
      url: this.http.apiUrl('/v3/miscellaneous/supported-ai-text-detection-file-types'),
    });
    return response.data;
  }

  /**
   * Languages for `properties.scanning.crossLanguages`, as ISO-639-1 codes. No login needed.
   * For more info: https://docs.copyleaks.com/reference/actions/miscellaneous/supported-cross-languages
   */
  public async getAllowedCrossLanguagesAsync(): Promise<CopyleaksCrossLanguagesResponseModel> {
    const response = await this.http.request<CopyleaksCrossLanguagesResponseModel>({
      method: 'GET',
      url: this.http.apiUrl('/v3/miscellaneous/allowed-cross-languages'),
    });
    return response.data;
  }

  /**
   * Languages supported by OCR scans (`submitFileOcrAsync`), not by the API in general. No login needed.
   * For more info: https://docs.copyleaks.com/reference/actions/miscellaneous/ocr-supported-languages
   */
  public async getOCRSupportedLanguagesAsync(): Promise<string[]> {
    const response = await this.http.request<string[]>({
      method: 'GET',
      url: this.http.apiUrl('/v3/miscellaneous/ocr-languages-list'),
    });
    return response.data;
  }

  /**
   * Credit use, settings and status of a Private Cloud Hub repository. Needs the Admin or Super Admin role.
   * For more info: https://docs.copyleaks.com/reference/actions/private-cloud-hub/info
   * @param repositoryId As shown in the Copyleaks Admin Dashboard.
   */
  public async getRepositoryInfoAsync(authToken: CopyleaksAuthToken, repositoryId: string): Promise<CopyleaksRepositoryInfoResponseModel> {
    this.verifyAuthToken(authToken);
    const response = await this.http.request<CopyleaksRepositoryInfoResponseModel>({
      method: 'GET',
      url: this.http.apiUrl(`/v3/repositories/repository/${encodeURIComponent(repositoryId)}/info`),
      authToken,
    });
    return response.data;
  }
}
