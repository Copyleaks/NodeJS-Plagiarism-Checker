import { RepositoriesMetadataModel } from "./repositoriesMetadataModel.js";
import { SharedResultsModel } from "./sharedResultsModel.js";
import { TagsModel } from "./tagsModel.js";
export declare class RepositoriesModel extends SharedResultsModel {
    repositoryId?: string;
    tags?: TagsModel[];
    metadata?: RepositoriesMetadataModel;
    constructor(init?: Partial<RepositoriesModel>);
}
