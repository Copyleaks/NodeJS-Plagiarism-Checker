import { WebhookModel } from "./webhookModel.js";
export class StatusWebhookModel extends WebhookModel {
  
  status?: number;

  constructor(init?: Partial<StatusWebhookModel>) {
    super(init);
    Object.assign(this, init);
  }
}
