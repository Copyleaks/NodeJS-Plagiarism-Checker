export interface ExportResults {
  /** Result ID, from the completed webhook. */
  id: string;
  /** URL that Copyleaks uploads the data to. */
  endpoint: string;
  /** HTTP method of the upload, for example POST. */
  verb: string;
  /** Headers of the upload request, such as Authorization. Example: [["header-key", "header-value"]] */
  headers?: string[][];
}