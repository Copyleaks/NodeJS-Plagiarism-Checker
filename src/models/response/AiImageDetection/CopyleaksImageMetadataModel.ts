/** Metadata extracted from the image or video file. */
export class CopyleaksImageMetadataModel {
    /** When the image or video was created, if available. */
    public issuedTime?: string;

    /** The AI service or tool that created the image or video, if detected. */
    public issuedBy?: string;

    /** The application or device used to create the image or video. */
    public appOrDeviceUsed?: string;
    /** A summary of how the image or video was generated, if available in the metadata. */
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
