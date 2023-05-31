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

import { ExcludeCode } from "./ExcludeCode";

export interface SubmissionExclude {
  /**
   * Exclude quoted text from the scan.
   */
  quotes?: boolean;
  /**
   * Exclude quoted text from the scan.
   */
  citations?: boolean;
  /**
   * Exclude citations from the scan.
   */
  references?: boolean;
  /**
   * Exclude table of contents from the scan.
   */
  tableOfContents?: boolean;
  /**
   * Exclude titles from the scan.
   */
  titles?: boolean;
  /**
   * When the scanned document is an HTML document, exclude irrelevant text that appears across the site like the website footer or header.
   */
  htmlTemplate?: boolean;
  /**
   * Exclude text based on text found within other documents.
   * Specify an array of scan ids containing text to exclude from your scan's text.
   * Each scan ID specified should be in a completed success state and should not have expired at the time of submission.
   */
  documentTemplateIds?: string[];
  /**
   * Exclude sections of source code
   */
  code?: ExcludeCode;
}