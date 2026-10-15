export interface SubmissionOverview {
  /**
   * Enable the Gen-AI Overview, a summary of the key insights of the scan. Default: false.
   * Download it with the `overview` target of `exportAsync`.
   */
  enable?: boolean;
  /** Leave the AI detection out of the overview. Default: false. */
  ignoreAIDetection?: boolean;
  /** Leave the plagiarism detection out of the overview. Default: false. */
  ignorePlagiarismDetection?: boolean;
  /** Leave the Grammar Checker out of the overview. Default: false. */
  ignoreWritingFeedback?: boolean;
  /** Leave the author's historical data out of the overview. Default: false. */
  ignoreAuthorData?: boolean;
}
