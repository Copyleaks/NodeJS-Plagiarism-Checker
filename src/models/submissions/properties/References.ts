export interface SubmissionReferences {
  /**
   * Citation Checker: detect, parse and validate every reference in the submitted text. Default: false.
   * The completed webhook then contains `referencesValidation`.
   */
  validate?: boolean;
}
