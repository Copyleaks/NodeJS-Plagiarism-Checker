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

import { CopyleaksAiTextDetectionMatchTextModel } from './CopyleaksAiTextDetectionMatchTextModel';

/**
 * Location of the text segments that received a classification.
 */
export class CopyleaksAiTextDetectionMatchModel {
    /**
     * Positions in the text of the document.
     */
    public text!: CopyleaksAiTextDetectionMatchTextModel;

    /**
     * Positions in the HTML version of the document.
     * Returned only for HTML sources.
     */
    public html?: CopyleaksAiTextDetectionMatchTextModel;

    /**
     * @param init Parsed JSON object. Unknown fields are ignored.
     */
    constructor(init?: Partial<CopyleaksAiTextDetectionMatchModel>) {
        const raw: any = init || {};
        if (raw.text != null) {
            this.text = new CopyleaksAiTextDetectionMatchTextModel(raw.text);
        }
        if (raw.html != null) {
            this.html = new CopyleaksAiTextDetectionMatchTextModel(raw.html);
        }
    }
}
