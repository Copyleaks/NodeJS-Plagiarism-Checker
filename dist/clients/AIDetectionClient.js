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
exports.AIDetectionClient = void 0;
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
const app_config_1 = require("../app.config");
const exceptions_1 = require("../models/exceptions");
const utils_1 = require("../utils");
const client_utils_utils_1 = require("../utils/client-utils.utils");
class AIDetectionClient {
    /**
      This endpoint will receive submitted text to be checked. At the end of the processing stage,
      the result will be shown as classifications. Text classification is divided into sections. Each section may have a different classification.
    *
    * * Exceptions:
    *  * CommandExceptions: Server reject the request. See response status code,
    *     headers and content for more info.
    *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
    *     We recommend to implement exponential backoff algorithm as described here:
    *     https://api.copyleaks.com/documentation/v3/exponential-backoff
    *  * RateLimitException: Too many requests have been sent. The request has been rejected.
    * @param authToken Copyleaks authentication token
    * @param scanId Attach your own scan Id
    * @param submission Submission properties
    */
    submitNaturalTextAsync(authToken, scanId, submission) {
        return __awaiter(this, void 0, void 0, function* () {
            client_utils_utils_1.ClientUtils.verifyAuthToken(authToken);
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v2/writer-detector/${scanId}/check`;
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT,
                'Authorization': `Bearer ${authToken['access_token']}`
            };
            const response = yield axios_1.default.post(url, submission, { headers });
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
      This endpoint will receive submitted source code to be checked. At the end of the processing stage,
      the result will be shown as classifications. Source code classification is divided into sections. Each section may have a different classification.
     *
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     *  * RateLimitException: Too many requests have been sent. The request has been rejected.
     */
    submitSourceCodeAsync(authToken, scanId, submission) {
        return __awaiter(this, void 0, void 0, function* () {
            client_utils_utils_1.ClientUtils.verifyAuthToken(authToken);
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v2/writer-detector/source-code/${scanId}/check`;
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': app_config_1.CopyleaksConfig.USER_AGENT,
                'Authorization': `Bearer ${authToken['access_token']}`
            };
            const response = yield axios_1.default.post(url, submission, { headers });
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
exports.AIDetectionClient = AIDetectionClient;
