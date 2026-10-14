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

/*
 * Errors thrown by every method that calls the API:
 *  * CommandException: the server rejected the request. Read `status` and `body` for the reason.
 *  * RateLimitException: HTTP 429, too many requests. Wait `retryAfter` seconds when it is set.
 *  * UnderMaintenanceException: HTTP 503, Copyleaks is under maintenance. Retry later with exponential backoff:
 *     https://api.copyleaks.com/documentation/v3/exponential-backoff
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
   * @param options Optional settings: request timeout, connection pool, retries, your own axios instance
   * and the server URLs. All clients of this instance share one connection pool.
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
   * Login to Copyleaks authentication server.
   * For more info: https://docs.copyleaks.com/reference/actions/account/login
   * * Exceptions:
   *  * CommandException: Server reject the request. See `status` and `body` for more info.
   *  * RateLimitException: Too many login attempts. Please wait before calling again.
   *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
   *     We recommend to implement exponential backoff algorithm as described here:
   *     https://api.copyleaks.com/documentation/v3/exponential-backoff
   *  * NetworkException: No HTTP response, for example a timeout.
   * @param email Copyleaks account email address.
   * @param key Copyleaks account secret key.
   * @returns A authentication token that being expired after certain amount of time.
   */
  public async loginAsync(email: string, key: string): Promise<CopyleaksAuthToken> {
    const response = await this.http.request<CopyleaksAuthToken>({
      method: 'POST',
      url: this.http.identityUrl('/v3/account/login/api'),
      body: { email, key },
    });
    return response.data;
  }

  /**
   * Verify that Copyleaks authentication token is exists and not exipired.
   * * Exceptions:
   *  * AuthExipredException: authentication expired. Need to login again.
   * @param authToken Copyleaks authentication token
   */
  public verifyAuthToken(authToken: CopyleaksAuthToken) {

    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() + 5); // adds 5 minutes ahead for a safety shield.

    const expiresDate = new Date(authToken['.expires']);

    if (expiresDate.getTime() <= date.getTime()) {
      throw new AuthExipredException(); // expired
    }
  }

  /**
   * Starting a new process by providing a file to scan.
   * For more info:
   * https://docs.copyleaks.com/reference/actions/authenticity/submit-file
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException, AuthExipredException.
   * @param authToken Copyleaks authentication token
   * @param scanId Attach your own scan Id
   * @param submission Submission properties
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
   * Starting a new process by providing a OCR image file to scan.
   * For more info:
   * https://docs.copyleaks.com/reference/actions/authenticity/submit-ocr
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException, AuthExipredException.
   * @param authToken Copyleaks authentication token
   * @param scanId Attach your own scan Id
   * @param submission Submission properties
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
   * Starting a new process by providing a URL to scan.
   * For more info:
   * https://docs.copyleaks.com/reference/actions/authenticity/submit-url
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException, AuthExipredException.
   * @param authToken Copyleaks authentication token
   * @param scanId Attach your own scan Id
   * @param submission Submission properties
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
   * Exporting scans artifact into your server.
   * For more info:
   * https://docs.copyleaks.com/reference/actions/downloads/export
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException, AuthExipredException.
   * @param authToken Your login token to Copyleaks server
   * @param scanId The scan ID of the specific scan to export.
   * @param exportId A new Id for the export process.
   * @param model Request of which artifact should be exported.
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
   * Start scanning all the files you submitted for a price-check.
   * For more info:
   * https://docs.copyleaks.com/reference/actions/authenticity/start
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException, AuthExipredException.
   * @param authToken Your login token to Copyleaks server.
   * @param model Include information about which scans should be started.
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
   * Delete the specific process from the server.
   * For more info:
   * https://docs.copyleaks.com/reference/actions/authenticity/delete
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException, AuthExipredException.
   * @param authToken Copyleaks authentication token
   * @param payloads
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
   * Resend status webhooks for existing scans.
   * For more info:
   * https://docs.copyleaks.com/reference/actions/authenticity/resend-webhook
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException, AuthExipredException.
   * @param authToken Copyleaks authentication token
   * @param scanId Copyleaks scan Id
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

  /**
   * Get current credits balance for the Copyleaks account.
   * For more info:
   * https://docs.copyleaks.com/reference/actions/admin/check-credits
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException, AuthExipredException.
   * @param authToken Copyleaks authentication token
   */
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
   * This endpoint allows you to export your usage history between two dates.
   * The output results will be exported to a csv file and it will be attached to the response.
   * For more info:
   * https://docs.copyleaks.com/reference/actions/admin/usage-history
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException, AuthExipredException.
   * @param authToken Copyleaks authentication token.
   * @param startDate The start date to collect usage history from. Date Format: `dd-MM-yyyy`.
   * @param endDate The end date to collect usage history from. Date Format: `dd-MM-yyyy`.
   * @returns The CSV text.
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

  /**
   * Get updates about copyleaks api release notes.
   * Public: no login needed.
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException.
   * @returns List of release notes.
   */
  public async getReleaseNotesAsync(): Promise<CopyleaksReleaseNotesResponseModel> {
    const response = await this.http.request<CopyleaksReleaseNotesResponseModel>({
      method: 'GET',
      url: this.http.apiUrl('/v3/release-logs.json'),
    });
    return response.data;
  }

  /**
   * Get a list of the file types supported by plagiarism scans.
   * Public: no login needed.
   * For more info: https://docs.copyleaks.com/reference/actions/miscellaneous/supported-plagiarism-file-types
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException.
   * @returns List of supported file types.
   */
  public async getSupportedFileTypesAsync(): Promise<CopyleaksSupportedFileTypesResponseModel> {
    const response = await this.http.request<CopyleaksSupportedFileTypesResponseModel>({
      method: 'GET',
      url: this.http.apiUrl('/v3/miscellaneous/supported-plagiarism-file-types'),
    });
    return response.data;
  }

  /**
   * Get a list of the file types supported by AI text detection.
   * Public: no login needed.
   * For more info: https://docs.copyleaks.com/reference/actions/miscellaneous/supported-ai-text-detection-file-types
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException.
   * @returns The supported file extensions.
   */
  public async getSupportedAiTextDetectionFileTypesAsync(): Promise<CopyleaksAiTextDetectionFileTypesResponseModel> {
    const response = await this.http.request<CopyleaksAiTextDetectionFileTypesResponseModel>({
      method: 'GET',
      url: this.http.apiUrl('/v3/miscellaneous/supported-ai-text-detection-file-types'),
    });
    return response.data;
  }

  /**
   * Get the languages supported by cross-language plagiarism detection
   * (`properties.scanning.crossLanguages`), as ISO-639-1 codes.
   * Public: no login needed.
   * For more info: https://docs.copyleaks.com/reference/actions/miscellaneous/supported-cross-languages
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException.
   * @returns The supported document languages and result languages.
   */
  public async getAllowedCrossLanguagesAsync(): Promise<CopyleaksCrossLanguagesResponseModel> {
    const response = await this.http.request<CopyleaksCrossLanguagesResponseModel>({
      method: 'GET',
      url: this.http.apiUrl('/v3/miscellaneous/allowed-cross-languages'),
    });
    return response.data;
  }

  /**
   * Get a list of the supported languages for OCR (this is not a list of supported languages for the api, but only for the OCR files scan).
   * Public: no login needed.
   * For more info: https://docs.copyleaks.com/reference/actions/miscellaneous/ocr-supported-languages
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException.
   * @returns List of supported OCR languages.
   */
  public async getOCRSupportedLanguagesAsync(): Promise<string[]> {
    const response = await this.http.request<string[]>({
      method: 'GET',
      url: this.http.apiUrl('/v3/miscellaneous/ocr-languages-list'),
    });
    return response.data;
  }

  /**
   * Get information about a Private Cloud Hub repository: credit use, settings and status.
   * Needs the "Admin" or "Super Admin" role in the organization.
   * For more info: https://docs.copyleaks.com/reference/actions/private-cloud-hub/info
   * * Exceptions: CommandException, RateLimitException, UnderMaintenanceException, NetworkException, AuthExipredException.
   * @param authToken Copyleaks authentication token.
   * @param repositoryId The repository id, as shown in the Copyleaks Admin Dashboard.
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
