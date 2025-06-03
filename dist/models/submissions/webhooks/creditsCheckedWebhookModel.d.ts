import { ScannedDocumentModel } from "./helperModels/completedModels/scannedDocumentModel";
import { StatusWebhookModel } from "./helperModels/baseModels/statusWebhookModel";
export declare class CreditsCheckedWebhookModel extends StatusWebhookModel {
    credits?: number;
    scannedDocument?: ScannedDocumentModel;
    constructor(init?: Partial<CreditsCheckedWebhookModel>);
}
