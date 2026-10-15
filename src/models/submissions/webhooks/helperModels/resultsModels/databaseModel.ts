import { SharedResultsModel } from "./sharedResultsModel.js";
import { TagsModel } from "./tagsModel.js";

export class DatabaseModel extends SharedResultsModel {
  tags?: TagsModel[];

  constructor(init?: Partial<DatabaseModel>) {
    super(init);
    if (init?.tags) {
      this.tags = init.tags.map((tag) => new TagsModel(tag));
    }
  }
}
