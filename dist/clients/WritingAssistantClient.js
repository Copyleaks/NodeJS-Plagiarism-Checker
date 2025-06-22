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
exports.WritingAssistantClient = void 0;
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
class WritingAssistantClient {
    /**
    This endpoint will receive submitted text to be checked. The response will show the suggested corrections to the input text.
     *
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     *  * RateLimitException: Too many requests have been sent. The request has been rejected.
     */
    submitTextAsync(authToken, scanId, submission) {
        return __awaiter(this, void 0, void 0, function* () {
            client_utils_utils_1.ClientUtils.verifyAuthToken(authToken);
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v1/writing-feedback/${scanId}/check`;
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
    Get a list of correction types supported within the Writing Assistant API. Correction types apply to all supported languages.
    The supplied language code for this request is used to determine the language of the texts returned.
     * * Exceptions:
     *  * CommandExceptions: Server reject the request. See response status code,
     *     headers and content for more info.
     *  * UnderMaintenanceException: Copyleaks servers are unavailable for maintenance.
     *     We recommend to implement exponential backoff algorithm as described here:
     *     https://api.copyleaks.com/documentation/v3/exponential-backoff
     */
    getCorrectionTypesAsync(authToken, languageCode) {
        return __awaiter(this, void 0, void 0, function* () {
            client_utils_utils_1.ClientUtils.verifyAuthToken(authToken);
            const url = `${app_config_1.CopyleaksConfig.API_SERVER_URI}/v1/writing-feedback/correction-types/${languageCode}`;
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
            else {
                throw new exceptions_1.CommandException(response);
            }
        });
    }
}
exports.WritingAssistantClient = WritingAssistantClient;
