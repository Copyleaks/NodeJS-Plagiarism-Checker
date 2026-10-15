import { CopyleaksAiTextDetectionResultModel } from './CopyleaksAiTextDetectionResultModel.js';
import { CopyleaksAiTextDetectionSummaryModel } from './CopyleaksAiTextDetectionSummaryModel.js';
import { CopyleaksAiTextDetectionExplainModel } from './CopyleaksAiTextDetectionExplainModel.js';

/**
 * AI text detection result: the response of `AIDetectionClient.submitNaturalTextAsync`, and the data of the
 * "suspected-ai-text" alert (decode it with `CompletedWebhookModel.getAIDetectionResult()`).
 * For more info: https://docs.copyleaks.com/reference/data-types/ai-detector/ai-text-detector-response
 */
export class CopyleaksAiTextDetectionResponseModel {
    /** Version of the detection model that was used. */
    public modelVersion!: string;

    /** Each result lists the text segments classified as human-written or AI-generated. */
    public results!: CopyleaksAiTextDetectionResultModel[];

    public summary!: CopyleaksAiTextDetectionSummaryModel;

    /** Can be missing in the "suspected-ai-text" alert data, for example for sandbox scans. */
    public scannedDocument?: CopyleaksAiTextDetectionScannedDocumentModel;

    /** Machine translation used before detection: 0 = none, 1 = Google Translate, 2 = Helsinki, 3 = Azure. */
    public translationProvider?: number;

    /** The English translation that was analyzed, when the text was machine-translated. */
    public translation?: string;

    /** AI Logic explanation, when AI Logic was enabled for the scan. */
    public explain?: CopyleaksAiTextDetectionExplainModel;

    /** `"sandbox"` for sandbox scans. Not sent for regular scans. */
    public scanType?: string;

    /**
     * @param init Parsed JSON object. Unknown fields are ignored.
     */
    constructor(init?: Partial<CopyleaksAiTextDetectionResponseModel>) {
        const raw: any = init || {};
        if (raw.modelVersion != null) {
            this.modelVersion = raw.modelVersion;
        }
        if (Array.isArray(raw.results)) {
            this.results = raw.results.map((r: any) => new CopyleaksAiTextDetectionResultModel(r));
        }
        if (raw.summary != null) {
            this.summary = new CopyleaksAiTextDetectionSummaryModel(raw.summary);
        }
        if (raw.scannedDocument != null) {
            this.scannedDocument = raw.scannedDocument;
        }
        if (raw.translationProvider != null) {
            this.translationProvider = raw.translationProvider;
        }
        if (raw.translation != null) {
            this.translation = raw.translation;
        }
        if (raw.explain != null) {
            this.explain = new CopyleaksAiTextDetectionExplainModel(raw.explain);
        }
        if (raw.scanType != null) {
            this.scanType = raw.scanType;
        }
    }
}

/** General information about the scanned document. */
export interface CopyleaksAiTextDetectionScannedDocumentModel {
    scanId: string;
    /** Total number of words found in the scanned text. */
    totalWords: number;
    /** Number of excluded words in the scanned text. */
    totalExcluded: number;
    /** The number of credits spent on the scan. */
    actualCredits: number;
    /** The number of credits that was expected to be spent on the scan. */
    expectedCredits: number;
    /** ISO 8601 creation time of the scan (UTC). */
    creationTime: string;
}
