import { SubmissionFilterDomainsMode } from './DomainsMode';
export interface SubmissionFilter {
    /**
     * Enable matching of exact words in the text.
     */
    identicalEnabled?: boolean;
    /**
     * Enable matching of nearly identical words with small differences like slow becomes slowly.
     */
    minorChangesEnabled?: boolean;
    /**
     * Enable matching of paraphrased content stating similar ideas with different words.
     */
    relatedMeaningEnabled?: boolean;
    /**
     * Select results with at least minCopiedWords copied words.
     */
    minCopiedWords?: number;
    /**
     * Block explicit adult content from the scan results such as web pages containing inappropriate images and videos. SafeSearch is not 100% effective with all websites.
     */
    safeSearch?: boolean;
    /**
     *  list of domains to either include or exclude from the scan - depending on the value of domainsMode.
     */
    domains?: string[];
    /**
     * Include or Exclude the list of domains you specified under the domains property
     *
     * When Include is selected, Copyleaks will filter out all results that are not part of the properties.filters.domains list.
     *
     * When Exclude is selected, Copyleaks will only find results outside of the properties.filters.domains list.
     */
    domainsMode?: SubmissionFilterDomainsMode;
    /**
     * when set to true it will allow results from the same domain as the submitted url.
     */
    allowSameDomain?: boolean;
}
