import { PdfReportColors } from "./PdfReportColors.js";
import { PdfReportVersion } from "./PdfReportVersion.js";

export interface SubmissionPDF {
  /** Generate a PDF report of the scan. */
  create?: boolean;
  title?: string;
  /** Logo image of the report. */
  largeLogo?: string;
  /** Align the report text from right to left. */
  rtl?: boolean;
  /**
   * PDF version to generate: 1, 2 or 3.
   * @deprecated Use `reportVersion` instead. `reportVersion` overrides this value when you send both.
   */
  version?: PdfReportVersion;
  /**
   * "v1", "v2", "v3" or "latest", lowercase: the server rejects other values such as "V3".
   * Overrides `version`. Needs `create`. Leave it undefined to get the server default.
   */
  reportVersion?: string;

  colors?: PdfReportColors;
}