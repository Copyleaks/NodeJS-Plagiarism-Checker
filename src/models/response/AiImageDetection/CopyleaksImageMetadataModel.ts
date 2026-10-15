/** Optional metadata extracted from the image. */
export class CopyleaksImageMetadataModel {
    /** When the image was created, if available. */
    public issuedTime?: string;

    /** The AI service or tool that created the image, if detected. */
    public issuedBy?: string;

    /** The application or device used to create the image. */
    public appOrDeviceUsed?: string;
    /** A summary of how the image was generated, if available in the metadata. */
    public contentSummary?: string;

    constructor(issuedTime?: string, issuedBy?: string, appOrDeviceUsed?: string, contentSummary?: string) {
        this.issuedTime = issuedTime;
        this.issuedBy = issuedBy;
        this.appOrDeviceUsed = appOrDeviceUsed;
        if (contentSummary !== undefined) {
            this.contentSummary = contentSummary;
        }
    }
}
