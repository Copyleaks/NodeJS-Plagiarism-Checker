import { RepositoriesMetadataModel } from "./repositoriesMetadataModel";
import { SharedResultsModel } from "./sharedResultsModel";
import { TagsModel } from "./tagsModel";
export declare class RepositoriesModel extends SharedResultsModel {
    repositoryId?: string;
    tags?: TagsModel[];
    metadata?: RepositoriesMetadataModel;
    constructor(init?: Partial<RepositoriesModel>);
}
