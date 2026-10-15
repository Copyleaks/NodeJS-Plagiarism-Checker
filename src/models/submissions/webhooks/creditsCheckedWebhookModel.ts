import { ScannedDocumentModel } from "./helperModels/completedModels/scannedDocumentModel.js";
import { StatusWebhookModel } from "./helperModels/baseModels/statusWebhookModel.js";

export class CreditsCheckedWebhookModel extends StatusWebhookModel {
  credits?: number;
  scannedDocument?: ScannedDocumentModel;

  constructor(init?: Partial<CreditsCheckedWebhookModel>) {
    if (init) {
      super(init);
      Object.assign(this, init);
      if (init.scannedDocument) {
        this.scannedDocument = new ScannedDocumentModel(init.scannedDocument);
      }
    }
  }
}
