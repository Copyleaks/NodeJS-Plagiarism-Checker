import { WebhookModel } from "./helperModels/baseModels/webhookModel.js";
import { NewResultInternetModel } from "./helperModels/newResultsModels/newResultInternetModel.js";
import { NewResultScoreModel } from "./helperModels/newResultsModels/newResultScoreModel.js";
import { NewResultsRepositoriesModel } from "./helperModels/newResultsModels/NewResultsRepositoriesModel.js";
import { SharedResultsModel } from "./helperModels/resultsModels/sharedResultsModel.js";
export declare class NewResultWebhookModel extends WebhookModel {
    score?: NewResultScoreModel;
    internet?: NewResultInternetModel[];
    database?: SharedResultsModel[];
    batch?: SharedResultsModel[];
    repositories?: NewResultsRepositoriesModel[];
    constructor(init?: Partial<NewResultWebhookModel>);
}
