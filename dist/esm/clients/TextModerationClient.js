var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import axios from "axios";
import { CopyleaksConfig } from "../app.config.js";
import { UnderMaintenanceException, RateLimitException, CommandException, } from "../models/exceptions/index.js";
import { CopyleaksTextModerationResponseModel, } from "../models/response/index.js";
import { isSuccessStatusCode, isUnderMaintenanceResponse, isRateLimitResponse, } from "../utils/index.js";
import { ClientUtils } from "../utils/client-utils.utils.js";
export class TextModerationClient {
    /**
  This endpoint will receive submitted text to be checked. The response will show potentially harmful content across multiple categories
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
    submitTextAsync(authToken, scanId, submission) {
        return __awaiter(this, void 0, void 0, function* () {
            ClientUtils.verifyAuthToken(authToken);
            const url = `${CopyleaksConfig.API_SERVER_URI}/v1/text-moderation/${scanId}/check`;
            const headers = {
                "Content-Type": "application/json",
                "User-Agent": CopyleaksConfig.USER_AGENT,
                Authorization: `Bearer ${authToken["access_token"]}`,
            };
            const response = yield axios.post(url, submission, { headers });
            if (isSuccessStatusCode(response.status))
                return new CopyleaksTextModerationResponseModel(response.data);
            else if (isUnderMaintenanceResponse(response.status)) {
                throw new UnderMaintenanceException();
            }
            else if (isRateLimitResponse(response.status)) {
                throw new RateLimitException();
            }
            else {
                throw new CommandException(response);
            }
        });
    }
}
