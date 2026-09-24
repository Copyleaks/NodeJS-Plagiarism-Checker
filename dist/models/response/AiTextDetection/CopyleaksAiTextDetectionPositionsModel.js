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
exports.CopyleaksAiTextDetectionPositionsModel = void 0;
/**
 * Positions of text segments.
 * Segment i starts at starts[i] and spans lengths[i] characters or words.
 */
class CopyleaksAiTextDetectionPositionsModel {
    /**
     * @param init Parsed JSON object. Accepts both camelCase keys (starts, lengths) and
     * the PascalCase keys (Starts, Lengths) that sandbox scans send. Unknown fields are ignored.
     */
    constructor(init) {
        var _a, _b;
        const raw = init || {};
        const starts = (_a = raw.starts) !== null && _a !== void 0 ? _a : raw.Starts;
        const lengths = (_b = raw.lengths) !== null && _b !== void 0 ? _b : raw.Lengths;
        if (starts != null) {
            this.starts = starts;
        }
        if (lengths != null) {
            this.lengths = lengths;
        }
        if (raw.groupIds != null) {
            this.groupIds = raw.groupIds;
        }
    }
}
exports.CopyleaksAiTextDetectionPositionsModel = CopyleaksAiTextDetectionPositionsModel;
