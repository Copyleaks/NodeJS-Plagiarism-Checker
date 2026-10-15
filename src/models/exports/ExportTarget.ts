/**
 * Where Copyleaks uploads one exported report: the `aiDetection`, `writingFeedback` and `overview`
 * targets of `CopyleaksExportModel`.
 */
export interface ExportTarget {
  /** URL that Copyleaks uploads the data to. */
  endpoint: string;
  /** HTTP method of the upload, for example POST. */
  verb: string;
  /** Headers of the upload request, such as Authorization. Example: [["header-key", "header-value"]] */
  headers?: string[][];
}
