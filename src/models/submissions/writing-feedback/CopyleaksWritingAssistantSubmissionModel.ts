import { ScoreWeights } from "./ScoreWeights.js";

export class CopyleaksWritingAssistantSubmissionModel {
  /**
   * @param text 1 to 25,000 characters.
   * @param sandbox Return mock results without using credits, to test your integration.
   * @param language Language code of the text. Detected automatically when not set.
   */
  constructor(
    public text: string,
    public sandbox?: boolean,
    public language?: string,
    public score?: ScoreWeights) {
  }
}
