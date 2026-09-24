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

/**
 * Summary of the AI text detection result.
 */
export class CopyleaksAiTextDetectionSummaryModel {
    /**
     * Share of the scanned text classified as human-written.
     * Range: 0.0-1.0
     */
    public human!: number;

    /**
     * Share of the scanned text classified as AI-generated.
     * Range: 0.0-1.0
     */
    public ai!: number;

    /**
     * @param init Parsed JSON object. Accepts both camelCase keys (human, ai) and
     * the PascalCase keys (Human, Ai) that sandbox scans send. Unknown fields are ignored.
     */
    constructor(init?: Partial<CopyleaksAiTextDetectionSummaryModel>) {
        const raw: any = init || {};
        const human = raw.human ?? raw.Human;
        const ai = raw.ai ?? raw.Ai;
        if (human != null) {
            this.human = human;
        }
        if (ai != null) {
            this.ai = ai;
        }
    }
}
