export declare class TextModerationScannedDocumentModel {
    scanId: String;
    totalWords: number;
    totalExcluded: number;
    actualCredits: number;
    expectedCredits: number;
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
