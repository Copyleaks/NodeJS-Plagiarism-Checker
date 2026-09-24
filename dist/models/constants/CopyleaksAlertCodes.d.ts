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
};
