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

export class CopyleaksTextModerationRequestModel {
  public text: string;
  public sandbox: boolean;
  public language?: string | null;
  public labels: any[];

  /**
   * @param init Initialization object
   */
  constructor(init: {
    text: string;
    sandbox?: boolean;
    language?: string;
    labels: any[];
  }) {
    if (!init.text || typeof init.text !== "string") {
      throw new Error("Text is required and must be a string.");
    }

    if (!Array.isArray(init.labels) || init.labels.length < 1) {
      throw new Error("Labels array must have at least 1 element.");
    }

    this.text = init.text;
    this.sandbox = init.sandbox ?? false;
    this.language = init.language ?? null;
    this.labels = init.labels;
  }
}
