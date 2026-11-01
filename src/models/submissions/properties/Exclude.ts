import { ExcludeCode } from "./ExcludeCode.js";

/** Parts of the document to leave out of the scan. */
export interface SubmissionExclude {
  quotes?: boolean;
  citations?: boolean;
  references?: boolean;
  tableOfContents?: boolean;
  titles?: boolean;
  /** For HTML documents: text repeated across the site, such as the header and footer. */
  htmlTemplate?: boolean;
  /** Exclude the text of these scans. Each one must have completed successfully and must not have expired. */
  documentTemplateIds?: string[];
  code?: ExcludeCode;
}
