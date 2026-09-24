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

import { CopyleaksAiTextDetectionPositionsModel } from './CopyleaksAiTextDetectionPositionsModel';

/**
 * Positions of the AI Logic patterns found in the text.
 */
export class CopyleaksAiTextDetectionPatternMatchModel {
    /**
     * Pattern positions measured in characters.
     */
    public chars?: CopyleaksAiTextDetectionPositionsModel;

    /**
     * Pattern positions measured in words.
     */
    public words!: CopyleaksAiTextDetectionPositionsModel;

    /**
     * @param init Parsed JSON object. Unknown fields are ignored.
     */
    constructor(init?: Partial<CopyleaksAiTextDetectionPatternMatchModel>) {
        const raw: any = init || {};
        if (raw.chars != null) {
            this.chars = new CopyleaksAiTextDetectionPositionsModel(raw.chars);
        }
        if (raw.words != null) {
            this.words = new CopyleaksAiTextDetectionPositionsModel(raw.words);
        }
    }
}
