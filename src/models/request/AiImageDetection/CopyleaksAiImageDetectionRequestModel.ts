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

import { CopyleaksAiImageObjectDetectionModel } from './CopyleaksAiImageObjectDetectionModel.js';

/**
 * Request model for Copyleaks AI image detection.
 * The request body is a JSON object containing the image to analyze.
 */
export class CopyleaksAiImageDetectionRequestModel {
    /**
     * The base64-encoded image data to be analyzed for AI generation.
     * 
     * Requirements:
     * - Minimum 512x512px, maximum 6000x4500px (27 megapixels), less than 32MB
     * - Supported formats: PNG, JPEG, BMP, WebP, HEIC/HEIF
     * 
     * @example "aGVsbG8gd29ybGQ="
     */
    public base64: string;

    /**
     * The name of the image file including its extension.
     * 
     * Requirements:
     * - Supported extensions: .png, .bmp, .jpg, .jpeg, .webp, .heic, .heif
     * - Maximum 255 characters
     * 
     * @example "my-image.png"
     */
    public fileName: string;

    /**
     * The AI detection model to use for analysis.
     * You can use either the full model name or its alias.
     * 
     * Available models:
     * - AI Image 1 Ultra: "ai-image-1-ultra-01-09-2025" (full name) or "ai-image-1-ultra" (alias)
     *   AI image detection model. Produces an overlay of the detected AI segments.
     * 
     * @example "ai-image-1-ultra-01-09-2025" or "ai-image-1-ultra"
     */
    public model: string;

    /**
     * Use sandbox mode to test your integration with the Copyleaks API without consuming any credits.
     * 
     * Submit images for AI detection and get returned mock results, simulating Copyleaks' API functionality 
     * to ensure you have successfully integrated the API.
     * This feature is intended to be used for development purposes only.
     * Default value is false.
     * 
     * @example false
     */
    public sandbox: boolean = false;

    /**
     * The type of detection mask to return: "binary" (default), "heatmap" or "none".
     * See `CopyleaksAiImageDetectionMaskTypes`.
     * - "binary": an RLE mask of the AI regions in `result.starts` and `result.lengths`.
     * - "heatmap": the RLE mask plus `result.labels`, a confidence band from 0 to 4 for each run.
     * - "none": no mask. The response has no `result`.
     */
    public maskType?: string;

    /**
     * Objects to find in the image, for example [{ object: "face" }]. Up to 3 entries, each 1 to 32 characters.
     * The response then contains `detectedObjects`, one entry for each object that was found.
     */
    public objectDetection?: CopyleaksAiImageObjectDetectionModel[];

    /**
     * @param base64 The base64-encoded image.
     * @param fileName The image file name, with its extension.
     * @param model The AI image detection model, for example `CopyleaksAiImageDetectionModels.AI_IMAGE_1_ULTRA`.
     * @param sandbox Return mock results without using credits. Default: false.
     * @param maskType The type of detection mask to return: "binary", "heatmap" or "none". Default: "binary".
     * @param objectDetection Objects to find in the image, for example [{ object: "face" }]. Up to 3 entries.
     */
    constructor(
        base64: string,
        fileName: string,
        model: string,
        sandbox: boolean = false,
        maskType?: string,
        objectDetection?: CopyleaksAiImageObjectDetectionModel[]) {
        this.base64 = base64;
        this.fileName = fileName;
        this.model = model;
        this.sandbox = sandbox;
        if (maskType !== undefined) {
            this.maskType = maskType;
        }
        if (objectDetection !== undefined) {
            this.objectDetection = objectDetection;
        }
    }
}
