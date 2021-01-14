export declare enum SubmissionActions {
    /**
     * Start scan immediately
     */
    Scan = 0,
    /**
     * Check how many credits will be used for this scan.
     */
    CheckCredits = 1,
    /**
     * Only index the file in the Copyleaks internal database. No credits will be used.
     */
    IndexOnly = 2
}
