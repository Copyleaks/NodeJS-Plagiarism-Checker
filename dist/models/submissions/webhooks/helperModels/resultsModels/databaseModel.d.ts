import { SharedResultsModel } from "./sharedResultsModel";
import { TagsModel } from "./tagsModel";
export declare class DatabaseModel extends SharedResultsModel {
    tags?: TagsModel[];
    constructor(init?: Partial<DatabaseModel>);
}
