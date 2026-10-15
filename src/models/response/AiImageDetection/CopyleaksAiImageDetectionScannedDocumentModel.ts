/** Metadata of an AI image detection scan. */
export class CopyleaksAiImageDetectionScannedDocumentModel {
    public scanId: string;

    /** Credits charged for the scan. */
    public actualCredits: number;

    /** Credits the scan was expected to cost. */
    public expectedCredits: number;

    /** ISO 8601 creation time of the scan. */
    public creationTime: string;

    constructor(scanId: string, actualCredits: number, expectedCredits: number, creationTime: string) {
        this.scanId = scanId;
        this.actualCredits = actualCredits;
        this.expectedCredits = expectedCredits;
        this.creationTime = creationTime;
    }
}
