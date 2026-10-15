import { ExportCrawledVersion } from './ExportCrawledVersion.js';
import { ExportPdfReport } from './ExportPdfReport.js';
import { ExportResults } from './ExportResults.js';
import { ExportTarget } from './ExportTarget.js';

/** Request of `Copyleaks.exportAsync`. Every export target is optional; request at least one of them. */
export class CopyleaksExportModel {
  /**
   * @param results Up to 1000 results.
   * @param maxRetries Upload retries. High (12) can delay `completionWebhook`; low (1) can fail on short outages.
   * @param developerPayload Returned in the export-completed webhook.
   * @param pdfReport Needs `properties.pdf.create` on the scan.
   * @param aiDetection AI detection report. Needs `properties.aiGeneratedText.detect` on the scan.
   * @param writingFeedback Grammar Checker report. Needs `properties.writingFeedback.enable` on the scan.
   * @param overview Gen-AI Overview. Needs `properties.overview.enable` on the scan.
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
