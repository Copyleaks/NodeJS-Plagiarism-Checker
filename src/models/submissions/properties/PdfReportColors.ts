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

export interface PdfReportColors {
    /**
     * The color of the main strip in the header
     */
    mainStrip?: string;
    /**
     * The color of titles in the PDF report, in HEX format. Default: #040F21.
     */
    titles?: string;
    /**
     * The color of titles in the PDF report.
     * @deprecated Use `titles`. The API field is `titles`; the SDK sends this value as `titles`
     * when `titles` is not set.
     */
    title?: string;
    /**
     * The highlight color for identical matches
     */
    identical?: string;
    /**
     * The highlight color for minor changes matches
     */
    minorChanges?: string;
    /**
     * The highlight color for related meaning matches
     */
    relatedMeaning?: string;
    /**
     * The highlight color for AI content detection, in HEX format. Default: #FE5758.
     */
    aiDetection?: string;
    /**
     * The highlight color for writing feedback (Grammar Checker), in HEX format. Default: #FF9A02.
     */
    writingFeedback?: string;
}
