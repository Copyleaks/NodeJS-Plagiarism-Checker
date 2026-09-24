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
exports.CopyleaksAiTextDetectionPatternStatisticsModel = void 0;
/**
 * Statistics of the AI Logic patterns.
 * Index i of every array describes pattern i.
 */
class CopyleaksAiTextDetectionPatternStatisticsModel {
    /**
     * @param init Parsed JSON object. Unknown fields are ignored.
     */
    constructor(init) {
        const raw = init || {};
        if (raw.aiCount != null) {
            this.aiCount = raw.aiCount;
        }
        if (raw.humanCount != null) {
            this.humanCount = raw.humanCount;
        }
        if (raw.proportion != null) {
            this.proportion = raw.proportion;
        }
        if (raw.source != null) {
            this.source = raw.source;
        }
    }
}
exports.CopyleaksAiTextDetectionPatternStatisticsModel = CopyleaksAiTextDetectionPatternStatisticsModel;
