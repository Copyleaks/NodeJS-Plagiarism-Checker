export interface SubmissionScanningCopyleaksDB {
  /**
   * Also compare against content that you uploaded to the Copyleaks internal database.
   * When true, the scan is also indexed there.
   */
  includeMySubmissions: boolean;
  /**
   * Also compare against content that others uploaded to the Copyleaks internal database.
   * When true, the scan is also indexed there.
   */
  includeOthersSubmissions: boolean;
}