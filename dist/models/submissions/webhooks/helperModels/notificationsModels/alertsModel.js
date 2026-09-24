"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsModel = void 0;
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
const CopyleaksAlertCodes_1 = require("../../../../constants/CopyleaksAlertCodes");
const CopyleaksAiTextDetectionResponseModel_1 = require("../../../../response/AiTextDetection/CopyleaksAiTextDetectionResponseModel");
class AlertsModel {
    constructor(init) {
        Object.assign(this, init);
    }
    /**
     * Decodes the additionalData of a "suspected-ai-text" alert into a typed AI text detection result.
     *
     * Returns null when the alert code is not CopyleaksAlertCodes.SUSPECTED_AI_TEXT,
     * or when additionalData is missing or empty.
     * Trailing NUL characters and whitespace are removed before parsing.
     * The raw additionalData string is not changed.
     *
     * @returns The decoded AI text detection result, or null.
     * @throws {SyntaxError} When additionalData is not valid JSON. The JSON.parse error is not caught.
     */
    getAIDetectionResult() {
        if (this.code !== CopyleaksAlertCodes_1.CopyleaksAlertCodes.SUSPECTED_AI_TEXT || !this.additionalData) {
            return null;
        }
        const json = trimTrailingNulAndWhitespace(this.additionalData);
        if (json.length === 0) {
            return null;
        }
        const parsed = JSON.parse(json);
        return parsed == null ? null : new CopyleaksAiTextDetectionResponseModel_1.CopyleaksAiTextDetectionResponseModel(parsed);
    }
}
exports.AlertsModel = AlertsModel;
/**
 * Removes trailing NUL characters and whitespace with a single backward scan.
 * The server can send additionalData padded with NUL characters.
 */
function trimTrailingNulAndWhitespace(value) {
    let end = value.length;
    while (end > 0) {
        const ch = value.charAt(end - 1);
        if (ch !== '\u0000' && ch.trim() !== '') {
            break;
        }
        end--;
    }
    return value.substring(0, end);
}
