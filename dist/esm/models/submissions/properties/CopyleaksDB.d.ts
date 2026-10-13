export interface SubmissionScanningCopyleaksDB {
    /**
     * When set to true: Copyleaks will also compare against content which was uploaded by YOU to the Copyleaks internal database.
     * If true, it will also index the scan in the Copyleaks internal database.
     */
    includeMySubmissions: boolean;
    /**
     * When set to true: Copyleaks will also compare against content which was uploaded by OTHERS to the Copyleaks internal database.
     * If true, it will also index the scan in the Copyleaks internal database.
     */
    includeOthersSubmissions: boolean;
}
