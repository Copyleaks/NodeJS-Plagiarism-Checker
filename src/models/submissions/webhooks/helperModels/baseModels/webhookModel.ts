export class WebhookModel {
  
  /** The `developerPayload` of the submission, unchanged. */
  developerPayload?: string;

  constructor(init?: Partial<WebhookModel>) {
    Object.assign(this, init);
  }
}
