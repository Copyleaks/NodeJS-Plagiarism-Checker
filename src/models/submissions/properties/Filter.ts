import { SubmissionFilterDomainsMode } from './DomainsMode.js';

export interface SubmissionFilter {
  /** Match identical words. */
  identicalEnabled?: boolean;
  /** Match nearly identical words with small differences, like "slow" and "slowly". */
  minorChangesEnabled?: boolean;
  /** Match paraphrased content: similar ideas in different words. */
  relatedMeaningEnabled?: boolean;
  /** Only results with at least this many copied words. */
  minCopiedWords?: number;
  /** Block explicit adult content from the results. Not 100% effective on every website. */
  safeSearch?: boolean;
  /** Domains to include or exclude, depending on `domainsMode`. */
  domains?: string[];
  /** Whether `domains` are included or excluded, see `SubmissionFilterDomainsMode`. */
  domainsMode?: SubmissionFilterDomainsMode

  /** Allow results from the domain of the submitted url. */
  allowSameDomain?: boolean;
}
