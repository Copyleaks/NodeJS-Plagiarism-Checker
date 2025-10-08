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
exports.CopyleaksAiImageDetectionRequestModel = void 0;
/**
 * Request model for Copyleaks AI image detection.
 * The request body is a JSON object containing the image to analyze.
 */
class CopyleaksAiImageDetectionRequestModel {
    constructor(base64, fileName, model, sandbox = false) {
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
        this.sandbox = false;
        this.base64 = base64;
        this.fileName = fileName;
        this.model = model;
        this.sandbox = sandbox;
    }
}
exports.CopyleaksAiImageDetectionRequestModel = CopyleaksAiImageDetectionRequestModel;
