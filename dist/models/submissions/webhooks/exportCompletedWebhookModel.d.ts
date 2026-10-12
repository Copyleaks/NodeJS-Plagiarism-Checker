import { WebhookModel } from "./helperModels/baseModels/webhookModel.js";
import { TaskModel } from "./helperModels/exportModels/taskModel.js";
export declare class ExportCompletedWebhookModel extends WebhookModel {
    completed?: boolean;
    tasks?: TaskModel;
    constructor(init?: Partial<ExportCompletedWebhookModel>);
}
