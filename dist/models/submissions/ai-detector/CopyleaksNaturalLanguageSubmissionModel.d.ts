import { CopyleaksAIDetectionSubmissionModel } from "./CopyleaksAIDetectionSubmissionModel";
export declare class CopyleaksNaturalLanguageSubmissionModel extends CopyleaksAIDetectionSubmissionModel {
    language?: string | undefined;
    /**
     * @param text a text string.  25000 <= characters >= 255.
     * @param sandbox You can test the integration with the Copyleaks API for free using the sandbox mode. You will be able to submit content for a scan and get back mock results, simulating the way Copyleaks will work to make sure that you successfully integrated with the API.
     * @param language The language code of your content. The selected language should be on the Supported Languages list above. If the 'language' field is not supplied , our system will automatically detect the language of the content.
     */
    constructor(text: string, sandbox?: boolean, language?: string | undefined);
}
