import { WebhookModel } from "./helperModels/baseModels/webhookModel";
import { TaskModel } from "./helperModels/exportModels/taskModel";
export declare class ExportCompletedWebhookModel extends WebhookModel {
    completed?: boolean;
    tasks?: TaskModel;
    constructor(init?: Partial<ExportCompletedWebhookModel>);
}
