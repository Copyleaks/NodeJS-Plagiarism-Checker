import { RepositoriesMetadataModel } from "./repositoriesMetadataModel";
import { SharedResultsModel } from "./sharedResultsModel";
export declare class RepositoriesModel extends SharedResultsModel {
    repositoryId?: string;
    metadata?: RepositoriesMetadataModel;
    constructor(init?: Partial<RepositoriesModel>);
}
