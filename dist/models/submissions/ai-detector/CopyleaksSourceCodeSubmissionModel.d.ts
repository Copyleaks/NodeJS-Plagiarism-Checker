import { CopyleaksAIDetectionSubmissionModel } from "./CopyleaksAIDetectionSubmissionModel";
export declare class CopyleaksSourceCodeSubmissionModel extends CopyleaksAIDetectionSubmissionModel {
    filename: string;
    /**
     * @param text a text string.  25000 <= characters >= 255.
     * @param sandbox You can test the integration with the Copyleaks API for free using the sandbox mode. You will be able to submit content for a scan and get back mock results, simulating the way Copyleaks will work to make sure that you successfully integrated with the API.
     * @param filename The name of the file as it will appear in the Copyleaks scan report Make sure to include the right extension for your filetype.
     */
    constructor(text: string, filename: string, sandbox?: boolean);
}
