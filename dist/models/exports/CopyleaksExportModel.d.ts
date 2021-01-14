import { ExportCrawledVersion } from './ExportCrawledVersion';
import { ExportPdfReport } from './ExportPdfReport';
import { ExportResults } from './ExportResults';
export declare class CopyleaksExportModel {
    completionWebhook: string;
    results: ExportResults[];
    crawledVersion: ExportCrawledVersion;
    maxRetries?: number | undefined;
    developerPayload?: string | undefined;
    pdfReport?: ExportPdfReport | undefined;
    /**
     * @param completionWebhook This webhook event is triggered once the export is completed.
     * @param results An array of results to be exported. The equivalent of downloading results manually.
     * @param crawledVersion Download the crawled version of the submitted text. The equivalent of downloading crawled version manually.
     * @param maxRetries How many retries to send before giving up. Using high value (12) may lead to a longer time until the completionWebhook being executed. A low value (1) may lead to errors while your service is temporary having problems.
     * @param developerPayload Add a custom developer payload that will then be provided on the Export-Completed webhook. https://api.copyleaks.com/documentation/v3/webhooks/export-completed
     * @param pdfReport Download the PDF report. Allowed only when `properties.pdf.create` was set to true on the scan submittion.
     */
    constructor(completionWebhook: string, results: ExportResults[], crawledVersion: ExportCrawledVersion, maxRetries?: number | undefined, developerPayload?: string | undefined, pdfReport?: ExportPdfReport | undefined);
}
