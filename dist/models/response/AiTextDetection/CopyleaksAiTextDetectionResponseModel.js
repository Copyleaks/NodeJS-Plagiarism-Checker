"use strict";
/********************************************************************************
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
********************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyleaksAiTextDetectionResponseModel = void 0;
const CopyleaksAiTextDetectionResultModel_1 = require("./CopyleaksAiTextDetectionResultModel");
const CopyleaksAiTextDetectionSummaryModel_1 = require("./CopyleaksAiTextDetectionSummaryModel");
const CopyleaksAiTextDetectionExplainModel_1 = require("./CopyleaksAiTextDetectionExplainModel");
/**
 * Result of Copyleaks AI text detection.
 * The "suspected-ai-text" alert of the completed webhook carries this result as a JSON string in additionalData.
 * Use CompletedWebhookModel.getAIDetectionResult() or AlertsModel.getAIDetectionResult() to decode it.
 */
class CopyleaksAiTextDetectionResponseModel {
    /**
     * @param init Parsed JSON object. Unknown fields are ignored.
     */
    constructor(init) {
        const raw = init || {};
        if (raw.modelVersion != null) {
            this.modelVersion = raw.modelVersion;
        }
        if (Array.isArray(raw.results)) {
            this.results = raw.results.map((r) => new CopyleaksAiTextDetectionResultModel_1.CopyleaksAiTextDetectionResultModel(r));
        }
        if (raw.summary != null) {
            this.summary = new CopyleaksAiTextDetectionSummaryModel_1.CopyleaksAiTextDetectionSummaryModel(raw.summary);
        }
        if (raw.translationProvider != null) {
            this.translationProvider = raw.translationProvider;
        }
        if (raw.translation != null) {
            this.translation = raw.translation;
        }
        if (raw.explain != null) {
            this.explain = new CopyleaksAiTextDetectionExplainModel_1.CopyleaksAiTextDetectionExplainModel(raw.explain);
        }
    }
}
exports.CopyleaksAiTextDetectionResponseModel = CopyleaksAiTextDetectionResponseModel;
