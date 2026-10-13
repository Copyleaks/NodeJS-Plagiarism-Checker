export interface PdfReportColors {
    /**
     * The color of the main strip in the header
     */
    mainStrip?: string;
    /**
     * The color for titles in copyleaks result report
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
}
