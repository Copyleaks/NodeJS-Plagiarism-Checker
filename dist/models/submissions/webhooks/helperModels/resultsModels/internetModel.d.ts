import { SharedResultsModel } from "./sharedResultsModel";
import { TagsModel } from "./tagsModel";
export declare class InternetModel extends SharedResultsModel {
    tags?: TagsModel[];
    constructor(init?: Partial<InternetModel>);
}
