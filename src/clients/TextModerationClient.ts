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
import { CopyleaksConfig } from "../app.config";
import {
  UnderMaintenanceException,
  RateLimitException,
  CommandException,
} from "../models/exceptions";
import {
  CopyleaksAuthToken,
  TextModerationResponseModel,
} from "../models/response";
import {
  isSuccessStatusCode,
  isUnderMaintenanceResponse,
  isRateLimitResponse,
} from "../utils";
import { ClientUtils } from "../utils/client-utils.utils";
import { CopyleaksTextModerationRequestModel } from "../models/request/TextModeration/CopyleaksTextModerationRequestModel";

export class TextModerationClient {
  public async submitTextAsync(
    authToken: CopyleaksAuthToken,
    scanId: string,
    submission: CopyleaksTextModerationRequestModel
  ) {
    ClientUtils.verifyAuthToken(authToken);
    const url = `${CopyleaksConfig.API_SERVER_URI}/v1/text-moderation/${scanId}/check`;

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": CopyleaksConfig.USER_AGENT,
      Authorization: `Bearer ${authToken["access_token"]}`,
    };

    const response = await axios.post(url, submission, { headers });
    if (isSuccessStatusCode(response.status))
      return new TextModerationResponseModel(response.data);
    else if (isUnderMaintenanceResponse(response.status)) {
      throw new UnderMaintenanceException();
    } else if (isRateLimitResponse(response.status)) {
      throw new RateLimitException();
    } else {
      throw new CommandException(response);
    }
  }
}
