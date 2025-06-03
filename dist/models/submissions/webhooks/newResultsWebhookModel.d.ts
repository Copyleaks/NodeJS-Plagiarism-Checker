import { WebhookModel } from "./helperModels/baseModels/webhookModel";
import { NewResultInternetModel } from "./helperModels/newResultsModels/newResultInternetModel";
import { NewResultScoreModel } from "./helperModels/newResultsModels/newResultScoreModel";
import { NewResultsRepositoriesModel } from "./helperModels/newResultsModels/NewResultsRepositoriesModel";
import { SharedResultsModel } from "./helperModels/resultsModels/sharedResultsModel";
export declare class NewResultWebhookModel extends WebhookModel {
    score?: NewResultScoreModel;
    internet?: NewResultInternetModel[];
    database?: SharedResultsModel[];
    batch?: SharedResultsModel[];
    repositories?: NewResultsRepositoriesModel[];
    constructor(init?: Partial<NewResultWebhookModel>);
}
