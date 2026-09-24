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
     * or when additionalData is missing or empty.
     * Trailing NUL characters and whitespace are removed before parsing.
     * The raw additionalData string is not changed.
     *
     * @returns The decoded AI text detection result, or null.
     * @throws {SyntaxError} When additionalData is not valid JSON. The JSON.parse error is not caught.
     */
    getAIDetectionResult(): CopyleaksAiTextDetectionResponseModel | null;
}
