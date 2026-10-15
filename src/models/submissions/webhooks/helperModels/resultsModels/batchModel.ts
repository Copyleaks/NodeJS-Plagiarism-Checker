import { SharedResultsModel } from "./sharedResultsModel.js";
import { TagsModel } from "./tagsModel.js";

export class BatchModel extends SharedResultsModel {
  
  tags?: TagsModel[];

  constructor(init?: Partial<BatchModel>) {
    super(init);
    if (init?.tags) {
      this.tags = init.tags.map((tag) => new TagsModel(tag));
    }
  }
}
