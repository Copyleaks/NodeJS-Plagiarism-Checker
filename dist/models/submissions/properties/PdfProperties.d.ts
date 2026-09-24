import { PdfReportColors } from "./PdfReportColors";
import { PdfReportVersion } from "./PdfReportVersion";
export interface SubmissionPDF {
    /**
     * Add a request to generate a customizable export of the scan report, in a pdf format.
     * Set to true in order to generate a pdf report for this scan.
     */
    create: boolean;
    /**
     * Customize the title for the PDF report.
     */
    title: string;
    /**
     * Customize the logo image in the PDF report.
     */
    largeLogo: string;
    /**
     * When set to true the text in the report will be aligned from right to left.
     */
    rtl: boolean;
    /**
     * PDF version to generate. By default version 1 will be generated as it our current stable version.
     * Version 2 is our latest iteration of our PDF report and is currently in beta.
     */
    version: PdfReportVersion;
    /**
     * Which version of the PDF report to generate.
     * Supported values are lowercase and case-sensitive: v1, v2, v3, latest.
     * Any other value (for example "V3" or "Latest") is rejected by the server.
     * Overrides version when both are supplied.
     * Only takes effect when create is true.
     * Leave it undefined to get the server default.
     */
    reportVersion?: string;
    /**
     * Customizable colors
     */
    colors?: PdfReportColors;
}
