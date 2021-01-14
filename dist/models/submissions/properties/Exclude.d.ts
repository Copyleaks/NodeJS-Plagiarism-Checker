export interface SubmissionExclude {
    /**
     * Exclude quoted text from the scan.
     */
    quotes?: boolean;
    /**
     * Exclude referenced text from the scan.
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
}
