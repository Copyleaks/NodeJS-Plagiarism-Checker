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
}
