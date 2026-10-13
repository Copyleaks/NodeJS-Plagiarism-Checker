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
import { CopyleaksAiTextDetectionResultModel } from './CopyleaksAiTextDetectionResultModel.js';
import { CopyleaksAiTextDetectionSummaryModel } from './CopyleaksAiTextDetectionSummaryModel.js';
import { CopyleaksAiTextDetectionExplainModel } from './CopyleaksAiTextDetectionExplainModel.js';
/**
 * Result of Copyleaks AI text detection.
 * Response of `AIDetectionClient.submitNaturalTextAsync`.
 * For more info: https://docs.copyleaks.com/reference/data-types/ai-detector/ai-text-detector-response
 * The "suspected-ai-text" alert of the completed webhook carries this result as a JSON string in additionalData.
 * Use CompletedWebhookModel.getAIDetectionResult() or AlertsModel.getAIDetectionResult() to decode it.
 */
export class CopyleaksAiTextDetectionResponseModel {
    /**
     * @param init Parsed JSON object. Unknown fields are ignored.
     */
    constructor(init) {
        const raw = init || {};
        if (raw.modelVersion != null) {
            this.modelVersion = raw.modelVersion;
        }
        if (Array.isArray(raw.results)) {
            this.results = raw.results.map((r) => new CopyleaksAiTextDetectionResultModel(r));
        }
        if (raw.summary != null) {
            this.summary = new CopyleaksAiTextDetectionSummaryModel(raw.summary);
        }
        if (raw.scannedDocument != null) {
            this.scannedDocument = raw.scannedDocument;
        }
        if (raw.translationProvider != null) {
            this.translationProvider = raw.translationProvider;
        }
        if (raw.translation != null) {
            this.translation = raw.translation;
        }
        if (raw.explain != null) {
            this.explain = new CopyleaksAiTextDetectionExplainModel(raw.explain);
        }
        if (raw.scanType != null) {
            this.scanType = raw.scanType;
        }
    }
}
