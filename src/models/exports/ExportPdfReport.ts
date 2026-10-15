import type { ExportTarget } from './ExportTarget.js';

/** Where Copyleaks uploads the PDF report. Same as `ExportTarget`. */
// An interface, not a type alias, so that 6.x declaration merging keeps working.
// tslint:disable-next-line:no-empty-interface
export interface ExportPdfReport extends ExportTarget {}
