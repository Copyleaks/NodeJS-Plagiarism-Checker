"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Copyleaks = void 0;
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
const axios_1 = require("axios");
const app_config_1 = require("./app.config");
const exceptions_1 = require("./models/exceptions");
const utils_1 = require("./utils");
const AIDetectionClient_1 = require("./clients/AIDetectionClient");
const WritingAssistantClient_1 = require("./clients/WritingAssistantClient");
class Copyleaks {
    constructor() {
        this.aiDetectionClient = new AIDetectionClient_1.AIDetectionClient();
        this.writingAssistantClient = new WritingAssistantClient_1.WritingAssistantClient();
    }
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
    loginAsync(email, key) {
        return __awaiter(this, void 0, void 0, function* () {
            // missing args check
            const url = `${app_config_1.CopyleaksConfig.IDENTITY_SERVER_URI}/v3/account/login/api`;
            const payload = {
                email,
                key
            };
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT
            };
            const response = yield axios_1.default.post(url, payload, { headers });
            if (utils_1.isSuccessStatusCode(response.status)) {
                return response.data;
            }
            else if (utils_1.isUnderMaintenanceResponse(response.status)) {
                throw new exceptions_1.UnderMaintenanceException();
            }
            else {
                throw new exceptions_1.CommandException(response);
            }
        });
    }
    /**
     * Verify that Copyleaks authentication token is exists and not exipired.
     * * Exceptions:
     *  * AuthExipredException: authentication expired. Need to login again.
     * @param authToken Copyleaks authentication token
     */
    verifyAuthToken(authToken) {
        const date = new Date(Date.now());
        date.setMinutes(date.getMinutes() + 5); // adds 5 minutes ahead for a safety shield.
        const expiresDate = new Date(authToken['.expires']);
        if (expiresDate.getTime() <= date.getTime()) {
            throw new exceptions_1.AuthExipredException(); // expired
        }
    }
    /**
     * Starting a new process by providing a file to scan.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/submit/file
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     * @param authToken Copyleaks authentication token
     * @param scanId Attach your own scan Id
     * @param submission Submission properties
     */
    submitFileAsync(authToken, scanId, submission) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyAuthToken(authToken);
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v3/scans/submit/file/${scanId}`;
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT,
                'Authorization': `Bearer ${authToken['access_token']}`
            };
            const response = yield axios_1.default.put(url, submission, { headers });
            if (utils_1.isSuccessStatusCode(response.status))
                return; // Completed successfully
            else if (utils_1.isUnderMaintenanceResponse(response.status)) {
                throw new exceptions_1.UnderMaintenanceException();
            }
            else {
                throw new exceptions_1.CommandException(response);
            }
        });
    }
    /**
     * Starting a new process by providing a OCR image file to scan.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/submit/ocr
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     * @param authToken Copyleaks authentication token
     * @param scanId Attach your own scan Id
     * @param submission Submission properties
     */
    submitFileOcrAsync(authToken, scanId, submission) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyAuthToken(authToken);
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v3/scans/submit/ocr/${scanId}`;
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT,
                'Authorization': `Bearer ${authToken['access_token']}`
            };
            const response = yield axios_1.default.put(url, submission, { headers });
            if (utils_1.isSuccessStatusCode(response.status))
                return; // Completed successfully
            else if (utils_1.isUnderMaintenanceResponse(response.status)) {
                throw new exceptions_1.UnderMaintenanceException();
            }
            else {
                throw new exceptions_1.CommandException(response);
            }
        });
    }
    /**
     * Starting a new process by providing a URL to scan.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/submit/url
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     * @param authToken Copyleaks authentication token
     * @param scanId Attach your own scan Id
     * @param submission Submission properties
     */
    submitUrlAsync(authToken, scanId, submission) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyAuthToken(authToken);
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v3/scans/submit/url/${scanId}`;
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT,
                'Authorization': `Bearer ${authToken['access_token']}`
            };
            const response = yield axios_1.default.put(url, submission, { headers });
            if (utils_1.isSuccessStatusCode(response.status))
                return; // Completed successfully
            else if (utils_1.isUnderMaintenanceResponse(response.status)) {
                throw new exceptions_1.UnderMaintenanceException();
            }
            else {
                throw new exceptions_1.CommandException(response);
            }
        });
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
    exportAsync(authToken, scanId, exportId, model) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyAuthToken(authToken);
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v3/downloads/${scanId}/export/${exportId}`;
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT,
                'Authorization': `Bearer ${authToken['access_token']}`
            };
            const response = yield axios_1.default.post(url, model, { headers });
            if (utils_1.isSuccessStatusCode(response.status)) {
                return; // Completed successfully
            }
            else if (utils_1.isUnderMaintenanceResponse(response.status)) {
                throw new exceptions_1.UnderMaintenanceException();
            }
            else {
                throw new exceptions_1.CommandException(response);
            }
        });
    }
    /**
     * Start scanning all the files you submitted for a price-check.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/start
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     * @param authToken Your login token to Copyleaks server.
     * @param model Include information about which scans should be started.
     */
    startAsync(authToken, model) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyAuthToken(authToken);
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v3/scans/start`;
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT,
                'Authorization': `Bearer ${authToken['access_token']}`
            };
            const response = yield axios_1.default.patch(url, model, { headers });
            if (utils_1.isSuccessStatusCode(response.status)) {
                return response.data; // Completed successfully
            }
            else if (utils_1.isUnderMaintenanceResponse(response.status)) {
                throw new exceptions_1.UnderMaintenanceException();
            }
            else {
                throw new exceptions_1.CommandException(response);
            }
        });
    }
    /**
     * Delete the specific process from the server.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/delete
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     * @param authToken Copyleaks authentication token
     * @param payloads
     */
    deleteAsync(authToken, payloads) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyAuthToken(authToken);
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v3.1/scans/delete`;
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT,
                'Authorization': `Bearer ${authToken['access_token']}`
            };
            const response = yield axios_1.default.patch(url, payloads, { headers });
            if (utils_1.isSuccessStatusCode(response.status))
                return; // Completed successfully;
            else if (utils_1.isUnderMaintenanceResponse(response.status)) {
                throw new exceptions_1.UnderMaintenanceException();
            }
            else if (utils_1.isRateLimitResponse(response.status)) {
                throw new exceptions_1.RateLimitException();
            }
            else {
                throw new exceptions_1.CommandException(response);
            }
        });
    }
    /**
     * Resend status webhooks for existing scans.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/webhook-resend
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     * @param authToken Copyleaks authentication token
     * @param scanId Copyleaks scan Id
     */
    resendWebhookAsync(authToken, scanId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyAuthToken(authToken);
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v3/scans/${scanId}/webhooks/resend`;
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT,
                'Authorization': `Bearer ${authToken['access_token']}`
            };
            const response = yield axios_1.default.post(url, null, { headers });
            if (utils_1.isSuccessStatusCode(response.status))
                return; // Completed successfully
            else if (utils_1.isUnderMaintenanceResponse(response.status)) {
                throw new exceptions_1.UnderMaintenanceException();
            }
            else {
                throw new exceptions_1.CommandException(response);
            }
        });
    }
    /**
     * Get current credits balance for the Copyleaks account.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/credits
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     *  * RateLimitException: Too many requests. Please wait before calling again.
     * @param authToken Copyleaks authentication token
     */
    getCreditsBalanceAsync(authToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyAuthToken(authToken);
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v3/scans/credits`;
            const headers = {
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT,
                'Authorization': `Bearer ${authToken['access_token']}`
            };
            const response = yield axios_1.default.get(url, { headers });
            if (utils_1.isSuccessStatusCode(response.status))
                return response.data;
            else if (utils_1.isUnderMaintenanceResponse(response.status)) {
                throw new exceptions_1.UnderMaintenanceException();
            }
            else if (utils_1.isRateLimitResponse(response.status)) {
                throw new exceptions_1.RateLimitException();
            }
            else {
                throw new exceptions_1.CommandException(response);
            }
        });
    }
    /**
     * This endpoint allows you to export your usage history between two dates.
     * The output results will be exported to a csv file and it will be attached to the response.
     * For more info:
     * https://api.copyleaks.com/documentation/v3/scans/usages/history
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     *  * RateLimitException: Too many requests. Please wait before calling again.
     * @param authToken Copyleaks authentication token.
     * @param startDate The start date to collect usage history from. Date Format: `dd-MM-yyyy`.
     * @param endDate The end date to collect usage history from. Date Format: `dd-MM-yyyy`.
     */
    getUsagesHistoryCsvAsync(authToken, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyAuthToken(authToken);
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v3/scans/usages/history?start=${startDate}&end=${endDate}`;
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT,
                'Authorization': `Bearer ${authToken['access_token']}`
            };
            const response = yield axios_1.default.get(url, { headers });
            if (utils_1.isSuccessStatusCode(response.status))
                return response.data;
            else if (utils_1.isUnderMaintenanceResponse(response.status)) {
                throw new exceptions_1.UnderMaintenanceException();
            }
            else if (utils_1.isRateLimitResponse(response.status)) {
                throw new exceptions_1.RateLimitException();
            }
            else {
                throw new exceptions_1.CommandException(response);
            }
        });
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
    getReleaseNotesAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v3/release-logs.json`;
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT,
            };
            const response = yield axios_1.default.get(url, { headers });
            if (utils_1.isSuccessStatusCode(response.status))
                return response.data;
            else if (utils_1.isUnderMaintenanceResponse(response.status)) {
                throw new exceptions_1.UnderMaintenanceException();
            }
            else if (utils_1.isRateLimitResponse(response.status)) {
                throw new exceptions_1.RateLimitException();
            }
            else {
                throw new exceptions_1.CommandException(response);
            }
        });
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
    getSupportedFileTypesAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v3/miscellaneous/supported-file-types`;
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT,
            };
            const response = yield axios_1.default.get(url, { headers });
            if (utils_1.isSuccessStatusCode(response.status))
                return response.data;
            else if (utils_1.isUnderMaintenanceResponse(response.status)) {
                throw new exceptions_1.UnderMaintenanceException();
            }
            else if (utils_1.isRateLimitResponse(response.status)) {
                throw new exceptions_1.RateLimitException();
            }
            else {
                throw new exceptions_1.CommandException(response);
            }
        });
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
    getOCRSupportedLanguagesAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v3/miscellaneous/ocr-languages-list`;
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT,
            };
            const response = yield axios_1.default.get(url, { headers });
            if (utils_1.isSuccessStatusCode(response.status))
                return response.data;
            else if (utils_1.isUnderMaintenanceResponse(response.status)) {
                throw new exceptions_1.UnderMaintenanceException();
            }
            else if (utils_1.isRateLimitResponse(response.status)) {
                throw new exceptions_1.RateLimitException();
            }
            else {
                throw new exceptions_1.CommandException(response);
            }
        });
    }
}
exports.Copyleaks = Copyleaks;
