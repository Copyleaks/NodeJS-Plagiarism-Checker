import { SharedResultsModel } from "./sharedResultsModel.js";
import { TagsModel } from "./tagsModel.js";
export declare class DatabaseModel extends SharedResultsModel {
    tags?: TagsModel[];
    constructor(init?: Partial<DatabaseModel>);
}
