export class CopyleaksAIDetectionSubmissionModel {
  /**
   * @param text 255 to 100,000 characters.
   * @param sandbox Return mock results without using credits, to test your integration.
   */
  constructor(
    public text: string, 
    public sandbox?: boolean) {
  }
}
