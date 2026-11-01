import { CopyleaksAIDetectionSubmissionModel } from "./CopyleaksAIDetectionSubmissionModel.js";

export class CopyleaksNaturalLanguageSubmissionModel extends CopyleaksAIDetectionSubmissionModel {
  /**
   * @param language Language code of the text. Detected automatically when not set.
   * @param explain AI Logic: the response then has `explain`, why the text was detected as AI. Default: false.
   * @param sensitivity 1 to 3. Default: 2. See `AIGeneratedText.sensitivity`.
   */
  constructor(
    text: string, 
    sandbox?: boolean,
    public language?: string,
    public explain?: boolean,
    public sensitivity?: number) {
      super(text, sandbox);
  }
}
