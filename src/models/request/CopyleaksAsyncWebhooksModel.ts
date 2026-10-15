/** Where Copyleaks sends the result of an asynchronous detection (AI image async submit and AI video). */
export interface CopyleaksAsyncWebhooksModel {
  /** URL that Copyleaks POSTs the result to when processing is complete. */
  url: string;
  /** Headers of the webhook request. Example: [["Authorization", "Bearer my-webhook-token"]] */
  headers?: string[][];
}
