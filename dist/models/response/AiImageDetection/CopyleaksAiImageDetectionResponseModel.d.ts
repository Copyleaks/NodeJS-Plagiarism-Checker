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
import { CopyleaksAiImageDetectionResultModel } from './CopyleaksAiImageDetectionResultModel';
import { CopyleaksAiImageDetectionSummaryModel } from './CopyleaksAiImageDetectionSummaryModel';
import { CopyleaksAiImageDetectionImageInfoModel } from './CopyleaksAiImageDetectionImageInfoModel';
import { CopyleaksAiImageDetectionScannedDocumentModel } from './CopyleaksAiImageDetectionScannedDocumentModel';
/**
 * Response model for Copyleaks AI image detection analysis.
 * Contains the AI detection results, image information, and scan metadata.
 */
export declare class CopyleaksAiImageDetectionResponseModel {
    /**
     * The version of the AI detection model used for analysis.
     */
    model: string;
    /**
     * RLE-encoded mask data containing arrays of start positions and lengths for AI-detected regions.
     */
    result: CopyleaksAiImageDetectionResultModel;
    /**
     * Summary statistics of the AI detection analysis.
     */
    summary: CopyleaksAiImageDetectionSummaryModel;
    /**
     * Information about the analyzed image.
     */
    imageInfo: CopyleaksAiImageDetectionImageInfoModel;
    /**
     * Metadata about the scan operation.
     */
    scannedDocument: CopyleaksAiImageDetectionScannedDocumentModel;
    constructor(init: {
        model: string;
        result: CopyleaksAiImageDetectionResultModel;
        summary: CopyleaksAiImageDetectionSummaryModel;
        imageInfo: CopyleaksAiImageDetectionImageInfoModel;
        scannedDocument: CopyleaksAiImageDetectionScannedDocumentModel;
    });
}
