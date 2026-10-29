export interface SubmissionWebhooks {
  /** Called for each new result while the scan runs, so a live report can show results as they are found. */
  newResult?: string;
  /**
   * Called when the scan status changes. Copyleaks replaces the `{STATUS}` token in the URL with
   * completed, error, creditschecked or indexed.
   */
  status: string;
  /** Headers of the newResult webhook request. Example: [["header-key", "header-value"]] */
  newResultHeaders?: string[][];
  /** Headers of the status webhook request. Example: [["header-key", "header-value"]] */
  statusHeaders?: string[][];
}