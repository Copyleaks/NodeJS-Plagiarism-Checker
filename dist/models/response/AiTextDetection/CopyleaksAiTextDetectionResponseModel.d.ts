/**
 * Response of `AIDetectionClient.submitNaturalTextAsync`.
 * For more info: https://docs.copyleaks.com/reference/data-types/ai-detector/ai-text-detector-response
 */
export interface CopyleaksAiTextDetectionResponseModel {
    /** The version of the AI detection model used for the analysis. */
    modelVersion: string;
    /** Classified sections of the scanned text. */
    results: CopyleaksAiTextDetectionResultModel[];
    /** Human and AI portions of the scanned text. */
    summary: CopyleaksAiTextDetectionSummaryModel;
    /** General information about the scanned document. */
    scannedDocument: CopyleaksAiTextDetectionScannedDocumentModel;
    /** Explanation of the detection (AI Logic). Present only when explain was enabled for the scan. */
    explain?: CopyleaksAiTextDetectionExplainModel;
    /** Machine translation provider used before the detection. `0` means the text was not translated. */
    translationProvider?: number;
    /** The machine-translated English text. Present only when the text was translated. */
    translation?: string;
    /** `"sandbox"` for sandbox scans. Not sent for regular scans. */
    scanType?: string;
}
/**
 * A classified section of the scanned text.
 */
export interface CopyleaksAiTextDetectionResultModel {
    /** Classification of the section: `1` = human-written, `2` = AI-generated. */
    classification: number;
    /** Confidence of the classification. Deprecated by the API and may be missing. */
    probability?: number;
    /** Locations of the section in the scanned document. */
    matches: CopyleaksAiTextDetectionMatchModel[];
}
/**
 * Location of a classified section in the scanned document.
 */
export interface CopyleaksAiTextDetectionMatchModel {
    /** Positions of the section in the plain text. */
    text: CopyleaksAiTextDetectionMatchTextModel;
    /** Positions of the section in the HTML source. Present only for HTML submissions. */
    html?: CopyleaksAiTextDetectionMatchTextModel | null;
}
/**
 * Character and word positions of a classified section.
 */
export interface CopyleaksAiTextDetectionMatchTextModel {
    /** Character positions of the section. */
    chars: CopyleaksAiTextDetectionPositionsModel;
    /** Word positions of the section. */
    words: CopyleaksAiTextDetectionPositionsModel;
}
/**
 * Positions of matched segments, as parallel arrays of start positions and lengths.
 */
export interface CopyleaksAiTextDetectionPositionsModel {
    /** Start positions of the matched segments. */
    starts: number[];
    /** Lengths of the matched segments, one per start position. */
    lengths: number[];
    /** HTML group ids of the matched segments. Present only for HTML positions. */
    groupIds?: number[];
}
/**
 * Summary of the AI text detection.
 */
export interface CopyleaksAiTextDetectionSummaryModel {
    /** Portion of the scanned text classified as human-written, from 0 to 1. */
    human: number;
    /** Portion of the scanned text classified as AI-generated, from 0 to 1. */
    ai: number;
}
/**
 * General information about the scanned document.
 */
export interface CopyleaksAiTextDetectionScannedDocumentModel {
    /** The scan id given by the user. */
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
/**
 * Explanation of the AI detection (AI Logic).
 */
export interface CopyleaksAiTextDetectionExplainModel {
    /** AI patterns found in the text. */
    patterns: CopyleaksAiTextDetectionPatternsModel;
}
/**
 * AI patterns found in the text, with their statistics and positions.
 */
export interface CopyleaksAiTextDetectionPatternsModel {
    /** Statistics of each pattern. */
    statistics: CopyleaksAiTextDetectionPatternStatisticsModel;
    /** Positions of the patterns in the plain text. */
    text: CopyleaksAiTextDetectionPatternMatchModel;
    /** Positions of the patterns in the HTML source. Present only for HTML submissions. */
    html?: CopyleaksAiTextDetectionPatternMatchModel | null;
}
/**
 * Statistics of the AI patterns found in the text. The arrays are parallel, one entry per pattern.
 */
export interface CopyleaksAiTextDetectionPatternStatisticsModel {
    /** How often each pattern appears in AI-generated text. */
    aiCount: number[];
    /** How often each pattern appears in human-written text. */
    humanCount: number[];
    /** Ratio between the AI and the human frequency of each pattern. */
    proportion: number[];
    /** Source of each pattern: `1` = AI, `2` = humanizer. */
    source: number[];
}
/**
 * Positions of the AI patterns found in the text.
 */
export interface CopyleaksAiTextDetectionPatternMatchModel {
    /** Character positions of the patterns. */
    chars: CopyleaksAiTextDetectionPositionsModel;
    /** Word positions of the patterns. */
    words: CopyleaksAiTextDetectionPositionsModel;
}
