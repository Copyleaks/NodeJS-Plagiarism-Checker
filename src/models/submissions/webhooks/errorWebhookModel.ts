import { StatusWebhookModel } from "./helperModels/baseModels/statusWebhookModel.js";
import { ErrorModel } from "./helperModels/errorModels/errorModel.js";
export class ErrorWebhookModel extends StatusWebhookModel {
  error?: ErrorModel;

  constructor(init?: Partial<ErrorWebhookModel>) {
    super(init);
    if (init?.error) {
      this.error = new ErrorModel(init.error);
    }
  }
}
