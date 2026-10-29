export enum SubmissionActions {
  /** Start the scan immediately. */
  Scan,
  /** Only check how many credits the scan would use. Start it later with `Copyleaks.startAsync`. */
  CheckCredits,
  /** Only index the file in the Copyleaks internal database. No credits are used. */
  IndexOnly
}