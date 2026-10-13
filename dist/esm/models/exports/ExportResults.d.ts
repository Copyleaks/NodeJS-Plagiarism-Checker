export interface ExportResults {
    /**
     * Result identification to be downloaded. You get these identifications from the completed webhook.
     * https://api.copyleaks.com/documentation/v3/webhooks/completed
     */
    id: string;
    /**
     * The HTTP url to upload the data.
     */
    endpoint: string;
    /**
     * The HTTP verb (also called "HTTP Methods") to upload the data to your specified endpoint.
     */
    verb: string;
    /**
     * List of headers to be submitted with the upload request. You may use this field to provide additional request headers, such as "Authorization" header.
     *
     * Example: [["header-key1", "header-value1"], ["header-key2", "header-value2"]]
     */
    headers?: string[][];
}
