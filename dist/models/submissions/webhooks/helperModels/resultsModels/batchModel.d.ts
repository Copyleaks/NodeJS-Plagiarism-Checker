import { SharedResultsModel } from "./sharedResultsModel";
import { TagsModel } from "./tagsModel";
export declare class BatchModel extends SharedResultsModel {
    tags?: TagsModel[];
    constructor(init?: Partial<BatchModel>);
}
