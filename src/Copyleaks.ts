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

import { CopyleaksConfig } from './app.config';
import { UnderMaintenanceException, CommandException, AuthExipredException, RateLimitException } from './models/exceptions';
import { CopyleaksExportModel } from './models/exports';
import { CopyleaksDeleteRequestModel } from './models/request';
import { CopyleaksStartRequestModel } from './models/request/CopyleaksStartRequestModel';
import { CopyleaksAuthToken } from './models/response';
import { CopyleaksFileOcrSubmissionModel, CopyleaksFileSubmissionModel, CopyleaksURLSubmissionModel } from './models/submissions';
import { isRateLimitResponse, isSuccessStatusCode, isUnderMaintenanceResponse } from './utils';

export class Copyleaks {
  /**
   * Login to Copyleaks authentication server.
   * For more info: https://api.copyleaks.com/documentation/v3/account/login.
   * * Exceptions:
   *  * CommandExceptions: Server reject the request. See response status code,
   *     headers and content for more info.
   *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
   *     We recommend to implement exponential backoff algorithm as described here:
   *     https://api.copyleaks.com/documentation/v3/exponential-backoff
   * @param email Copyleaks account email address.
   * @param key Copyleaks account secret key.
   * @returns A authentication token that being expired after certain amount of time.
   */
  public async loginAsync(email: string, key: string) {
    // missing args check

    const url = `${CopyleaksConfig.IDENTITY_SERVER_URI}/v3/account/login/api`;
    const payload = {
      email,
      key
    }
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': CopyleaksConfig.USER_AGENT
    }

    const response = await axios.post<CopyleaksAuthToken>(url, payload, { headers });

    if (isSuccessStatusCode(response.status)) {
      return response.data;
    } else if (isUnderMaintenanceResponse(response.status)) {
      throw new UnderMaintenanceException();
    } else {
      throw new CommandException(response)
    }
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
   * https://api.copyleaks.com/documentation/v3/education/submit/file
   * https://api.copyleaks.com/documentation/v3/businesses/submit/file
   * * Exceptions:
   *  * CommandExceptions: Server reject the request. See response status code,
   *     headers and content for more info.
   *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
   *     We recommend to implement exponential backoff algorithm as described here:
   *     https://api.copyleaks.com/documentation/v3/exponential-backoff
   * @param product Which product (education or business) is being use.
   * @param authToken Copyleaks authentication token
   * @param scanId Attach your own scan Id
   * @param submission Submission properties
   */
  public async submitFileAsync(product: 'education' | 'businesses', authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksFileSubmissionModel) {
    this.verifyAuthToken(authToken);

    const url = `${CopyleaksConfig.API_SERVER_URI}/v3/${product}/submit/file/${scanId}`;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': CopyleaksConfig.USER_AGENT,
      'Authorization': `Bearer ${authToken['access_token']}`
    }

    const response = await axios.put(url, submission, { headers });
    if (isSuccessStatusCode(response.status))
      return; // Completed successfully
    else if (isUnderMaintenanceResponse(response.status)) {
      throw new UnderMaintenanceException()
    } else {
      throw new CommandException(response)
    }
  }

  /**
   * Starting a new process by providing a OCR image file to scan.
   * For more info:
   * https://api.copyleaks.com/documentation/v3/education/submit/ocr
   * https://api.copyleaks.com/documentation/v3/businesses/submit/ocr
   * * Exceptions:
   *  * CommandExceptions: Server reject the request. See response status code,
   *     headers and content for more info.
   *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
   *     We recommend to implement exponential backoff algorithm as described here:
   *     https://api.copyleaks.com/documentation/v3/exponential-backoff
   * @param product Which product (education or business) is being use.
   * @param authToken Copyleaks authentication token
   * @param scanId Attach your own scan Id
   * @param submission Submission properties
   */
  public async submitFileOcrAsync(product: 'education' | 'businesses', authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksFileOcrSubmissionModel) {
    this.verifyAuthToken(authToken);

    const url = `${CopyleaksConfig.API_SERVER_URI}/v3/${product}/submit/ocr/${scanId}`;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': CopyleaksConfig.USER_AGENT,
      'Authorization': `Bearer ${authToken['access_token']}`
    }

    const response = await axios.put(url, submission, { headers });
    if (isSuccessStatusCode(response.status))
      return; // Completed successfully
    else if (isUnderMaintenanceResponse(response.status)) {
      throw new UnderMaintenanceException()
    } else {
      throw new CommandException(response)
    }
  }

  /**
   * Starting a new process by providing a URL to scan.
   * For more info:
   * https://api.copyleaks.com/documentation/v3/education/submit/url
   * https://api.copyleaks.com/documentation/v3/businesses/submit/url
   * * Exceptions:
   *  * CommandExceptions: Server reject the request. See response status code,
   *     headers and content for more info.
   *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
   *     We recommend to implement exponential backoff algorithm as described here:
   *     https://api.copyleaks.com/documentation/v3/exponential-backoff
   * @param product Which product (education or business) is being use.
   * @param authToken Copyleaks authentication token
   * @param scanId Attach your own scan Id
   * @param submission Submission properties
   */
  public async submitUrlAsync(product: 'education' | 'businesses', authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksURLSubmissionModel) {
    this.verifyAuthToken(authToken);

    const url = `${CopyleaksConfig.API_SERVER_URI}/v3/${product}/submit/url/${scanId}`;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': CopyleaksConfig.USER_AGENT,
      'Authorization': `Bearer ${authToken['access_token']}`
    }

    const response = await axios.put(url, submission, { headers });
    if (isSuccessStatusCode(response.status))
      return; // Completed successfully
    else if (isUnderMaintenanceResponse(response.status)) {
      throw new UnderMaintenanceException()
    } else {
      throw new CommandException(response)
    }
  }

  /**
   * Exporting scans artifact into your server.
   * For more info:
   * https://api.copyleaks.com/documentation/v3/downloads/export
   * * Exceptions:
   *  * CommandExceptions: Server reject the request. See response status code,
   *     headers and content for more info.
   *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
   *     We recommend to implement exponential backoff algorithm as described here:
   *     https://api.copyleaks.com/documentation/v3/exponential-backoff
   * @param authToken Your login token to Copyleaks server
   * @param scanId The scan ID of the specific scan to export.
   * @param exportId A new Id for the export process.
   * @param model Request of which artifact should be exported.
   */
  public async exportAsync(authToken: CopyleaksAuthToken, scanId: string, exportId: string, model: CopyleaksExportModel) {
    this.verifyAuthToken(authToken);

    const url = `${CopyleaksConfig.API_SERVER_URI}/v3/downloads/${scanId}/export/${exportId}`;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': CopyleaksConfig.USER_AGENT,
      'Authorization': `Bearer ${authToken['access_token']}`
    }

    const response = await axios.post(url, model, { headers });

    if (isSuccessStatusCode(response.status)) {
      return; // Completed successfully
    } else if (isUnderMaintenanceResponse(response.status)) {
      throw new UnderMaintenanceException();
    } else {
      throw new CommandException(response);
    }
  }

  /**
   * Start scanning all the files you submitted for a price-check.
   * For more info:
   * https://api.copyleaks.com/documentation/v3/education/start
   * https://api.copyleaks.com/documentation/v3/businesses/start
   * * Exceptions:
   *  * CommandExceptions: Server reject the request. See response status code,
   *     headers and content for more info.
   *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
   *     We recommend to implement exponential backoff algorithm as described here:
   *     https://api.copyleaks.com/documentation/v3/exponential-backoff
   * @param product Which product (education or business) is being use.
   * @param authToken Your login token to Copyleaks server.
   * @param model Include information about which scans should be started.
   */
  public async startAsync(product: 'education' | 'businesses', authToken: CopyleaksAuthToken, model: CopyleaksStartRequestModel) {
    this.verifyAuthToken(authToken);
    const url = `${CopyleaksConfig.API_SERVER_URI}/v3/${product}/start`;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': CopyleaksConfig.USER_AGENT,
      'Authorization': `Bearer ${authToken['access_token']}`
    }

    const response = await axios.patch(url, model, { headers });

    if (isSuccessStatusCode(response.status)) {
      return response.data; // Completed successfully
    } else if (isUnderMaintenanceResponse(response.status)) {
      throw new UnderMaintenanceException();
    } else {
      throw new CommandException(response);
    }
  }

  /**
   * Delete the specific process from the server.
   * For more info:
   * https://api.copyleaks.com/documentation/v3/education/delete
   * https://api.copyleaks.com/documentation/v3/businesses/delete
   * * Exceptions:
   *  * CommandExceptions: Server reject the request. See response status code,
   *     headers and content for more info.
   *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
   *     We recommend to implement exponential backoff algorithm as described here:
   *     https://api.copyleaks.com/documentation/v3/exponential-backoff
   * @param product Which product (education or business) is being use.
   * @param authToken Copyleaks authentication token
   * @param payloads
   */
  public async deleteAsync(product: 'education' | 'businesses', authToken: CopyleaksAuthToken, payloads: CopyleaksDeleteRequestModel) {

    this.verifyAuthToken(authToken);

    const url = `${CopyleaksConfig.API_SERVER_URI}/v3.1/${product}/delete`;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': CopyleaksConfig.USER_AGENT,
      'Authorization': `Bearer ${authToken['access_token']}`
    }

    const response = await axios.patch(url, payloads, { headers });

    if (isSuccessStatusCode(response.status))
      return; // Completed successfully;
    else if (isUnderMaintenanceResponse(response.status)) {
      throw new UnderMaintenanceException()
    } else if (isRateLimitResponse(response.status)) {
      throw new RateLimitException();
    } else {
      throw new CommandException(response)
    }
  }

  /**
   * Resend status webhooks for existing scans.
   * For more info:
   * https://api.copyleaks.com/documentation/v3/education/webhook-resend
   * https://api.copyleaks.com/documentation/v3/businesses/webhook-resend
   * * Exceptions:
   *  * CommandExceptions: Server reject the request. See response status code,
   *     headers and content for more info.
   *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
   *     We recommend to implement exponential backoff algorithm as described here:
   *     https://api.copyleaks.com/documentation/v3/exponential-backoff
   * @param product Which product (education or business) is being use.
   * @param authToken Copyleaks authentication token
   * @param scanId Copyleaks scan Id
   */
  public async resendWebhookAsync(product: 'education' | 'businesses', authToken: CopyleaksAuthToken, scanId: string) {
    this.verifyAuthToken(authToken);

    const url = `${CopyleaksConfig.API_SERVER_URI}/v3/${product}/scans/${scanId}/webhooks/resend`;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': CopyleaksConfig.USER_AGENT,
      'Authorization': `Bearer ${authToken['access_token']}`
    }

    const response = await axios.post(url, null, { headers });

    if (isSuccessStatusCode(response.status))
      return;  // Completed successfully
    else if (isUnderMaintenanceResponse(response.status)) {
      throw new UnderMaintenanceException()
    } else {
      throw new CommandException(response)
    }
  }

  /**
   * Get current credits balance for the Copyleaks account.
   * For more info:
   * https://api.copyleaks.com/documentation/v3/education/credits
   * https://api.copyleaks.com/documentation/v3/businesses/credits
   * * Exceptions:
   *  * CommandExceptions: Server reject the request. See response status code,
   *     headers and content for more info.
   *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
   *     We recommend to implement exponential backoff algorithm as described here:
   *     https://api.copyleaks.com/documentation/v3/exponential-backoff
   *  * RateLimitException: Too many requests. Please wait before calling again.
   * @param product Which product (education or business) is being use.
   * @param authToken Copyleaks authentication token
   */
  public async getCreditsBalanceAsync(product: 'education' | 'businesses', authToken: CopyleaksAuthToken) {
    this.verifyAuthToken(authToken);

    const url = `${CopyleaksConfig.API_SERVER_URI}/v3/${product}/credits`;

    const headers = {
      'User-Agent': CopyleaksConfig.USER_AGENT,
      'Authorization': `Bearer ${authToken['access_token']}`
    }

    const response = await axios.get(url, { headers });

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
   * This endpoint allows you to export your usage history between two dates.
   * The output results will be exported to a csv file and it will be attached to the response.
   * For more info:
   * https://api.copyleaks.com/documentation/v3/education/usages/history
   * https://api.copyleaks.com/documentation/v3/businesses/usages/history
   * * Exceptions:
   *  * CommandExceptions: Server reject the request. See response status code,
   *     headers and content for more info.
   *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
   *     We recommend to implement exponential backoff algorithm as described here:
   *     https://api.copyleaks.com/documentation/v3/exponential-backoff
   *  * RateLimitException: Too many requests. Please wait before calling again.
   * @param product Which product (education or business) is being use.
   * @param authToken Copyleaks authentication token.
   * @param startDate The start date to collect usage history from. Date Format: `dd-MM-yyyy`.
   * @param endDate The end date to collect usage history from. Date Format: `dd-MM-yyyy`.
   */
  public async getUsagesHistoryCsvAsync(product: 'education' | 'businesses', authToken: CopyleaksAuthToken, startDate: string, endDate: string) {
    this.verifyAuthToken(authToken);

    const url = `${CopyleaksConfig.API_SERVER_URI}/v3/${product}/usages/history?start=${startDate}&end=${endDate}`;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': CopyleaksConfig.USER_AGENT,
      'Authorization': `Bearer ${authToken['access_token']}`
    }

    const response = await axios.get(url, { headers });

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
   * Get updates about copyleaks api release notes.
   * For more info: https://api.copyleaks.com/documentation/v3/release-notes
   * * Exceptions:
   *  * CommandExceptions: Server reject the request. See response status code,
   *     headers and content for more info.
   *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
   *     We recommend to implement exponential backoff algorithm as described here:
   *     https://api.copyleaks.com/documentation/v3/exponential-backoff
   *  * RateLimitException: Too many requests. Please wait before calling again.
   * @returns List of release notes.
   */
  public async getReleaseNotesAsync() {
    const url = `${CopyleaksConfig.API_SERVER_URI}/v3/release-logs.json`;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': CopyleaksConfig.USER_AGENT,
    }

    const response = await axios.get(url, { headers });

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
   * Get a list of the supported file types.
   * For more info: https://api.copyleaks.com/documentation/v3/specifications/supported-file-types
   * * Exceptions:
   *  * CommandExceptions: Server reject the request. See response status code,
   *     headers and content for more info.
   *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
   *     We recommend to implement exponential backoff algorithm as described here:
   *     https://api.copyleaks.com/documentation/v3/exponential-backoff
   *  * RateLimitException: Too many requests. Please wait before calling again.
   * @returns List of supported file types.
   */
  public async getSupportedFileTypesAsync() {
    const url = `${CopyleaksConfig.API_SERVER_URI}/v3/miscellaneous/supported-file-types`;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': CopyleaksConfig.USER_AGENT,
    }

    const response = await axios.get(url, { headers });

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
   * Get a list of the supported languages for OCR (this is not a list of supported languages for the api, but only for the OCR files scan).
   * For more info: https://api.copyleaks.com/documentation/v3/specifications/ocr-languages/list
   * * Exceptions:
   *  * CommandExceptions: Server reject the request. See response status code,
   *     headers and content for more info.
   *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
   *     We recommend to implement exponential backoff algorithm as described here:
   *     https://api.copyleaks.com/documentation/v3/exponential-backoff
   *  * RateLimitException: Too many requests. Please wait before calling again.
   * @returns List of supported OCR languages.
   */
  public async getOCRSupportedLanguagesAsync() {
    const url = `${CopyleaksConfig.API_SERVER_URI}/v3/miscellaneous/ocr-languages-list`;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': CopyleaksConfig.USER_AGENT,
    }

    const response = await axios.get(url, { headers });

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
