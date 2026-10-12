import { RepositoriesMetadataModel } from "../resultsModels/repositoriesMetadataModel.js";
import { SharedResultsModel } from "../resultsModels/sharedResultsModel.js";
export declare class NewResultsRepositoriesModel extends SharedResultsModel {
    repositoryId?: string;
    metadata?: RepositoriesMetadataModel;
    constructor(init?: Partial<NewResultsRepositoriesModel>);
}
