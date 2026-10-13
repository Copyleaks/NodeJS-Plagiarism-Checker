export declare class CopyleaksAIDetectionSubmissionModel {
    text: string;
    sandbox?: boolean | undefined;
    /**
     * @param text a text string.  25000 <= characters >= 255.
     * @param sandbox You can test the integration with the Copyleaks API for free using the sandbox mode. You will be able to submit content for a scan and get back mock results, simulating the way Copyleaks will work to make sure that you successfully integrated with the API.
     */
    constructor(text: string, sandbox?: boolean | undefined);
}
