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

export class TextModerationScannedDocumentModel {
  public scanId: String;
  public totalWords: number;
  public totalExcluded: number;
  public actualCredits: number;
  public expectedCredits: number;
  public creationTime: Date;
  /**
   * @param init Initialization object
   */
  constructor(init: {
    scanId: string;
    totalWords: number;
    totalExcluded: number;
    actualCredits: number;
    expectedCredits: number;
    creationTime: Date;
  }) {
    this.scanId = init.scanId;
    this.totalWords = init.totalWords;
    this.totalExcluded = init.totalExcluded;
    this.actualCredits = init.actualCredits;
    this.expectedCredits = init.expectedCredits;
    this.creationTime = init.creationTime;
  }
}
