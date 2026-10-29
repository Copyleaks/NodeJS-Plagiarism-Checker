import type { ExportTarget } from './ExportTarget.js';

/** Where Copyleaks uploads one result. */
export interface ExportResults extends ExportTarget {
  /** Result ID, from the completed webhook. */
  id: string;
}
