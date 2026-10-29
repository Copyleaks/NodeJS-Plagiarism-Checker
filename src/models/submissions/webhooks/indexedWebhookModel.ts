import { StatusWebhookModel } from "./helperModels/baseModels/statusWebhookModel.js";

export class IndexedWebhookModel extends StatusWebhookModel {
  constructor(init?: Partial<IndexedWebhookModel>) {
    super(init);
  }
}
