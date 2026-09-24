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
import { CopyleaksAiTextDetectionResultModel } from './CopyleaksAiTextDetectionResultModel';
import { CopyleaksAiTextDetectionSummaryModel } from './CopyleaksAiTextDetectionSummaryModel';
import { CopyleaksAiTextDetectionExplainModel } from './CopyleaksAiTextDetectionExplainModel';
/**
 * Result of Copyleaks AI text detection.
 * The "suspected-ai-text" alert of the completed webhook carries this result as a JSON string in additionalData.
 * Use CompletedWebhookModel.getAIDetectionResult() or AlertsModel.getAIDetectionResult() to decode it.
 */
export declare class CopyleaksAiTextDetectionResponseModel {
    /**
     * The version of the AI detection model used for analysis.
     */
    modelVersion: string;
    /**
     * The classifications of the scanned text.
     * Each result lists the text segments classified as human-written or AI-generated.
     */
    results: CopyleaksAiTextDetectionResultModel[];
    /**
     * Summary of the AI text detection result.
     */
    summary: CopyleaksAiTextDetectionSummaryModel;
    /**
     * The machine translation provider used before detection.
     * 0 = none, 1 = Google Translate, 2 = Helsinki, 3 = Azure.
     */
    translationProvider?: number;
    /**
     * The English translation that was analyzed.
     * Returned only when the text was machine-translated.
     */
    translation?: string;
    /**
     * AI Logic explanation.
     * Returned only when AI Logic was enabled for the scan.
     */
    explain?: CopyleaksAiTextDetectionExplainModel;
    /**
     * @param init Parsed JSON object. Unknown fields are ignored.
     */
    constructor(init?: Partial<CopyleaksAiTextDetectionResponseModel>);
}
