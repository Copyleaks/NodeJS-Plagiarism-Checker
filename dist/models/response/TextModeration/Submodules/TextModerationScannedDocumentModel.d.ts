export declare class TextModerationScannedDocumentModel {
    /** The scan id given by the user. */
    scanId: string;
    /** Total number of words found in the scanned text. */
    totalWords: number;
    /** Total excluded words from the text. */
    totalExcluded: number;
    /** The cost of credits for this scan. */
    actualCredits: number;
    /** The amount of credits that was expected to be spent on the scan. */
    expectedCredits: number;
    /** Creation time of the scan. */
    creationTime: Date;
    /**
     * @param init Initialization object
     */
    constructor(init: {
        scanId: string;
        totalWords: number;
        totalExcluded: number;
        actualCredits: number;
        expectedCredits: number;
        creationTime: Date;
    });
}
