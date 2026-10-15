export interface PdfReportColors {
    /** Color of the main strip in the header. */
    mainStrip?: string;
    /** Color of the titles, in HEX format. Default: #040F21. */
    titles?: string;
    /** @deprecated Use `titles`. The SDK sends this value as `titles` when `titles` is not set. */
    title?: string;
    /** Highlight color of identical matches. */
    identical?: string;
    /** Highlight color of minor-change matches. */
    minorChanges?: string;
    /** Highlight color of related-meaning matches. */
    relatedMeaning?: string;
    /** Highlight color of AI content, in HEX format. Default: #FE5758. */
    aiDetection?: string;
    /** Highlight color of Grammar Checker feedback, in HEX format. Default: #FF9A02. */
    writingFeedback?: string;
}
