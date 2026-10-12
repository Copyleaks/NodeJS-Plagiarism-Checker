import { ScannedDocumentModel } from "./helperModels/completedModels/scannedDocumentModel.js";
import { StatusWebhookModel } from "./helperModels/baseModels/statusWebhookModel.js";
export declare class CreditsCheckedWebhookModel extends StatusWebhookModel {
    credits?: number;
    scannedDocument?: ScannedDocumentModel;
    constructor(init?: Partial<CreditsCheckedWebhookModel>);
}
