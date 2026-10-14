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

import { CopyleaksAiImageDetectionResultModel } from './CopyleaksAiImageDetectionResultModel.js';
import { CopyleaksAiImageDetectionSummaryModel } from './CopyleaksAiImageDetectionSummaryModel.js';
import { CopyleaksAiImageDetectionImageInfoModel } from './CopyleaksAiImageDetectionImageInfoModel.js';
import { CopyleaksAiImageDetectionScannedDocumentModel } from './CopyleaksAiImageDetectionScannedDocumentModel.js';
import { CopyleaksAiImageDetectedObjectModel } from './CopyleaksAiImageDetectedObjectModel.js';
import { CopyleaksAsyncWebhookErrorModel } from '../CopyleaksAsyncWebhookErrorModel.js';

/**
 * Response model for Copyleaks AI image detection analysis.
 * Contains the AI detection results, image information, and scan metadata.
 * It is the response of `AiImageDetectionClient.submitAsync` and `submitFileAsync`, and the webhook body
 * of `submitUrlAsync`: use `new CopyleaksAiImageDetectionResponseModel(req.body)` in your webhook handler.
 * In the webhook, check `error` first: when the scan failed, the webhook has `error` and `developerPayload` only,
 * and no result fields.
 * Every field of the JSON is kept, including fields this SDK version does not declare.
 */
export class CopyleaksAiImageDetectionResponseModel {
    /**
     * The version of the AI detection model used for analysis.
     */
    public model!: string;
    /**
     * RLE-encoded mask data containing arrays of start positions and lengths for AI-detected regions.
     * Missing when the request set `maskType` to "none".
     */
    public result?: CopyleaksAiImageDetectionResultModel;
    /**
     * Summary statistics of the AI detection analysis.
     */
    public summary!: CopyleaksAiImageDetectionSummaryModel;
    /**
     * Whether the image was determined to be AI-generated.
     */
    public isAiDetected?: boolean;
    /**
     * Information about the analyzed image.
     */
    public imageInfo!: CopyleaksAiImageDetectionImageInfoModel;
    /**
     * The objects found in the image, when the request included `objectDetection`.
     * Objects that were not found are left out, so look entries up by `object`, not by position.
     */
    public detectedObjects?: CopyleaksAiImageDetectedObjectModel[];
    /**
     * Metadata about the scan operation.
     */
    public scannedDocument!: CopyleaksAiImageDetectionScannedDocumentModel;
    /**
     * Why the scan failed, in the webhook of `submitUrlAsync`. Set only when the scan failed,
     * and then the result fields are missing.
     */
    public error?: CopyleaksAsyncWebhookErrorModel;
    /**
     * The `developerPayload` of the `submitUrlAsync` request, unchanged.
     */
    public developerPayload?: string;

    /**
     * @param init The parsed JSON response. Every field is copied, including fields this SDK version does not declare.
     */
    constructor(init?: Partial<CopyleaksAiImageDetectionResponseModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
