import { WebhookModel } from "./webhookModel.js";
export declare class StatusWebhookModel extends WebhookModel {
    status?: number;
    constructor(init?: Partial<StatusWebhookModel>);
}
