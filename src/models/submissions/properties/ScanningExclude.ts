export interface SubmissionScanningExclude {
  /**
   * Exclude your submissions whose scan id matches this pattern from the batch, internal database
   * and repository results. Wildcards: `*` matches zero or more characters, `.` one non-whitespace character.
   */
  idPattern?: string
  /** Exclude results with backlinks to these domains. Up to 10 domains, each 1 to 256 characters. */
  backlinksDomains?: string[];
  /** Exclude results that contain these phrases. Up to 5 phrases, each 1 to 30 characters. */
  text?: string[];
}