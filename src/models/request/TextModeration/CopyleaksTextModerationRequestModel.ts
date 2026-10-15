/** The largest number of labels the Text Moderation API accepts in one request. */
export const MAX_TEXT_MODERATION_LABELS = 16;

export class CopyleaksTextModerationRequestModel {
  
  public text: string;

  /** Return mock results without using credits. */
  public sandbox: boolean;

  /** Language code of the text, see `CopyleaksTextModerationLanguages`. Detected automatically when not set. */
  public language?: string | null;

  /** Labels to check, 1 to `MAX_TEXT_MODERATION_LABELS` (16). See `CopyleaksTextModerationLabel`. */
  public labels: any[];

  constructor(init: {
    text: string;
    sandbox?: boolean;
    language?: string;
    labels: any[];
  }) {

  if (!init.text || typeof init.text !== "string") {
      throw new Error("Text is required and must be a string.");
    }

  if (!Array.isArray(init.labels) || init.labels.length < 1 || init.labels.length > MAX_TEXT_MODERATION_LABELS) {
    throw new Error(`Labels must be an array with at least 1 and no more than ${MAX_TEXT_MODERATION_LABELS} elements.`);
   }
   
    this.text = init.text;
    this.sandbox = init.sandbox ?? false;
    this.language = init.language ?? null;
    this.labels = init.labels;
  }
}
