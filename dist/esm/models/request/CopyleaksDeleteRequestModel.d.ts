export declare class CopyleaksDeleteRequestModel {
    scans: {
        id: string;
    }[];
    purge?: boolean | undefined;
    completionWebhook?: string | undefined;
    /**
     * @param scans The list of scans to delete
     * @param purge Delete all trace of the scan from Copyleaks server, including from internal database. A purged process will not be available as a result for previous scans.
     * @param completionWebhook Allows you to register to a webhook that will be fired once the removal has been completed. Make sure that your endpoint is listening to a POST method (no body parameters were supplied).
     */
    constructor(scans: {
        id: string;
    }[], purge?: boolean | undefined, completionWebhook?: string | undefined);
}
