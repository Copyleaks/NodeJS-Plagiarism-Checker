import { NotificationsModel } from "./helperModels/completedModels/notificationsModel";
import { StatusWebhookModel } from "./helperModels/baseModels/statusWebhookModel";
import { ResultsModel } from "./helperModels/completedModels/resultsModel";
import { ScannedDocumentModel } from "./helperModels/completedModels/scannedDocumentModel";
export declare class CompletedWebhookModel extends StatusWebhookModel {
    results?: ResultsModel;
    notifications?: NotificationsModel;
    scannedDocument?: ScannedDocumentModel;
    constructor(init?: Partial<CompletedWebhookModel>);
}
