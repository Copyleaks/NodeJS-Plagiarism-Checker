export interface SubmissionScanningInclude {
  /**
   * Include internal database and repository results only when their scan id matches this pattern.
   * Wildcards: `*` matches zero or more characters, `.` matches one non-whitespace character.
   */
  idPattern?: string;
}
