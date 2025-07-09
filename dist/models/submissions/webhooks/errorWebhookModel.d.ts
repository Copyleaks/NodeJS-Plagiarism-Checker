import { StatusWebhookModel } from "./helperModels/baseModels/statusWebhookModel";
import { ErrorModel } from "./helperModels/errorModels/errorModel";
export declare class ErrorWebhookModel extends StatusWebhookModel {
    error?: ErrorModel;
    constructor(init?: Partial<ErrorWebhookModel>);
}
