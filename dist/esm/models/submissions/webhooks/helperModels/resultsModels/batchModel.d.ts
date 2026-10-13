import { SharedResultsModel } from "./sharedResultsModel.js";
import { TagsModel } from "./tagsModel.js";
export declare class BatchModel extends SharedResultsModel {
    tags?: TagsModel[];
    constructor(init?: Partial<BatchModel>);
}
