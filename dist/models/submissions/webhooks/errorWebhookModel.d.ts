import { StatusWebhookModel } from "./helperModels/baseModels/statusWebhookModel.js";
import { ErrorModel } from "./helperModels/errorModels/errorModel.js";
export declare class ErrorWebhookModel extends StatusWebhookModel {
    error?: ErrorModel;
    constructor(init?: Partial<ErrorWebhookModel>);
}
