import { ScoreWeights } from "./ScoreWeights";
export declare class CopyleaksWritingAssistantSubmissionModel {
    text: string;
    sandbox?: boolean | undefined;
    language?: string | undefined;
    score?: ScoreWeights | undefined;
    /**
     * @param text Text to produce Writing Assistant report for. 1 >= characters <= 25000.
     * @param sandbox Use sandbox mode to test your integration with the Copyleaks API without consuming any credits. Submit content for Writing Assistant and get returned mock results, simulating Copyleaks's API functionality to ensure you have successfully integrated the API. This feature is intended to be used for development purposes only.
     * @param language The language code of your content. The selected language should be on the Supported Languages list above. If the 'language' field is not supplied , our system will automatically detect the language of the content.
     * @param score
     */
    constructor(text: string, sandbox?: boolean | undefined, language?: string | undefined, score?: ScoreWeights | undefined);
}
