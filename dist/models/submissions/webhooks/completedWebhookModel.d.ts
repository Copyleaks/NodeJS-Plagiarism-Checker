import { NotificationsModel } from "./helperModels/completedModels/notificationsModel.js";
import { StatusWebhookModel } from "./helperModels/baseModels/statusWebhookModel.js";
import { ResultsModel } from "./helperModels/completedModels/resultsModel.js";
import { ScannedDocumentModel } from "./helperModels/completedModels/scannedDocumentModel.js";
export declare class CompletedWebhookModel extends StatusWebhookModel {
    results?: ResultsModel;
    notifications?: NotificationsModel;
    scannedDocument?: ScannedDocumentModel;
    constructor(init?: Partial<CompletedWebhookModel>);
}
