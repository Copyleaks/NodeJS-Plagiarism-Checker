export interface AIGeneratedText {
  /**
   * Detect AI-generated text. Default: false.
   * A "suspected-ai-text" alert is then added to the completed webhook.
   */
  detect?: boolean;
  /**
   * 1 to 3, default 2. 1 finds unedited AI text, 2 also AI text with minor changes,
   * and 3 also AI text that was heavily modified.
   */
  sensitivity?: number;
  /** AI Logic: explain why the text was detected as AI. */
  explain?: AIGeneratedTextExplain;
}

/** AI Logic settings of `aiGeneratedText`. */
export interface AIGeneratedTextExplain {
  /** Default: false. Explanations are returned for the AI Logic supported languages only. */
  enable?: boolean;
}
