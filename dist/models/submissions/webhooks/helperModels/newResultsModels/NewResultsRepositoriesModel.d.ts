import { RepositoriesMetadataModel } from "../resultsModels/repositoriesMetadataModel";
import { SharedResultsModel } from "../resultsModels/sharedResultsModel";
export declare class NewResultsRepositoriesModel extends SharedResultsModel {
    repositoryId?: string;
    metadata?: RepositoriesMetadataModel;
    constructor(init?: Partial<NewResultsRepositoriesModel>);
}
