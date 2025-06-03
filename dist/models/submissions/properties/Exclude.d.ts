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
