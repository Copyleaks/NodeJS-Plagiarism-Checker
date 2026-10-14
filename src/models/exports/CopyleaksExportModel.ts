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

import { ExportCrawledVersion } from './ExportCrawledVersion.js';
import { ExportPdfReport } from './ExportPdfReport.js';
import { ExportResults } from './ExportResults.js';
import { ExportTarget } from './ExportTarget.js';

export class CopyleaksExportModel {
  /**
   * Every export target is optional. Request at least one of them.
   * @param completionWebhook This webhook event is triggered once the export is completed.
   * @param results An array of results to be exported. The equivalent of downloading results manually. Up to 1000 results.
   * @param crawledVersion Download the crawled version of the submitted text. The equivalent of downloading crawled version manually.
   * @param maxRetries How many retries to send before giving up. Using high value (12) may lead to a longer time until the completionWebhook being executed. A low value (1) may lead to errors while your service is temporary having problems.
   * @param developerPayload Add a custom developer payload that will then be provided on the Export-Completed webhook. https://api.copyleaks.com/documentation/v3/webhooks/export-completed
   * @param pdfReport Download the PDF report. Allowed only when `properties.pdf.create` was set to true on the scan submittion.
   * @param completionWebhookHeaders Headers to add to the completionWebhook request. Example: [["header-key", "header-value"]]
   * @param aiDetection Download the AI detection report. Allowed only when `properties.aiGeneratedText.detect` was set to true on the scan submission.
   * @param writingFeedback Download the Grammar Checker report. Allowed only when `properties.writingFeedback.enable` was set to true on the scan submission.
   * @param overview Download the Gen-AI Overview. Allowed only when `properties.overview.enable` was set to true on the scan submission.
   */
  constructor(
    public completionWebhook: string,
    public results?: ExportResults[],
    public crawledVersion?: ExportCrawledVersion,
    public maxRetries?: number,
    public developerPayload?: string,
    public pdfReport?: ExportPdfReport,
    public completionWebhookHeaders?: string[][],
    public aiDetection?: ExportTarget,
    public writingFeedback?: ExportTarget,
    public overview?: ExportTarget
  ) { }
}
