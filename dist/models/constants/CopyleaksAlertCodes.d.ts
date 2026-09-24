/**
 * Provides a collection of constants representing Copyleaks scan alert codes.
 * Scan alerts are listed in notifications.alerts of the completed webhook.
 */
export declare const CopyleaksAlertCodes: {
    /**
     * AI-generated text was detected (category 2, AI content detection; severity 4).
     * The alert's additionalData holds the AI text detection result as a JSON string.
     */
    readonly SUSPECTED_AI_TEXT: "suspected-ai-text";
    /**
     * AI text detection failed (category 2).
     */
    readonly AI_DETECTION_FAILED: "ai-detection-failed";
    /**
     * AI text detection did not run because the language is not supported (category 2).
     */
    readonly AI_DETECTION_LANG_NOT_SUPPORTED: "ai-detection-lang-not-supported";
    /**
     * AI text detection did not run because the text is too short (category 2).
     */
    readonly AI_DETECTION_TEXT_TOO_SHORT: "ai-detection-text-too-short";
    /**
     * AI text detection did not run because the file type is not supported (category 2).
     */
    readonly FILE_TYPE_NOT_SUPPORTED: "file-type-not-supported";
};
