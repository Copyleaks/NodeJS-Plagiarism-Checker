/** Scan alert codes, as found in `notifications.alerts` of the completed webhook. */
export const CopyleaksAlertCodes = {
  /**
   * AI-generated text was detected (category 2, severity 4).
   * Decode the result with `AlertsModel.getAIDetectionResult()`.
   */
  SUSPECTED_AI_TEXT: 'suspected-ai-text',
} as const;
