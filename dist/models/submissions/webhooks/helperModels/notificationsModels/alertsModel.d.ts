import { CopyleaksAiTextDetectionResponseModel } from '../../../../response/AiTextDetection/CopyleaksAiTextDetectionResponseModel';
export declare class AlertsModel {
    category: number;
    code: string;
    title: string;
    message: string;
    helpLink?: string;
    severity: number;
    additionalData?: string;
    constructor(init?: Partial<AlertsModel>);
    /**
     * Decodes the additionalData of a "suspected-ai-text" alert into a typed AI text detection result.
     *
     * Returns null when the alert code is not CopyleaksAlertCodes.SUSPECTED_AI_TEXT,
     * when additionalData is missing or empty,
     * or when additionalData is valid JSON but not a JSON object (an array, number, string, true/false or null).
     * Trailing NUL characters (U+0000) and ASCII whitespace (tab, line feed, vertical tab, form feed,
     * carriage return and space) are removed before parsing. Other characters are not trimmed.
     * The raw additionalData string is not changed.
     *
     * @returns The decoded AI text detection result, or null.
     * @throws {SyntaxError} When additionalData is not valid JSON. The JSON.parse error is not caught.
     */
    getAIDetectionResult(): CopyleaksAiTextDetectionResponseModel | null;
}
