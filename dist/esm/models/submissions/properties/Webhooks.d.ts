export interface SubmissionWebhooks {
    /**
     * Http endpoint to be triggered while the scan is still running and a new result is found.
     * This is useful when the report is being viewed by the user in real time so the results will load gradually as they are found.
     */
    newResult?: string;
    /**
     * This webhook event is triggered once the scan status changes.
     * Use the special token {STATUS} to track the current scan status.
     * This special token will automatically be replaced by the Copyleaks servers with the optional values: completed, error, creditsChecked and indexed.
     * Read more about webhooks: https://api.copyleaks.com/documentation/v3/webhooks
     */
    status: string;
}
