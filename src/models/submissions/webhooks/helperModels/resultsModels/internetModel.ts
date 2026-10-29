import { SharedResultsModel } from "./sharedResultsModel.js";
import { TagsModel } from "./tagsModel.js";

export class InternetModel extends SharedResultsModel {
  /** Public URL of the result. */
  url?: string;

  tags?: TagsModel[];

  constructor(init?: Partial<InternetModel>) {
    super(init);
    if (init?.tags) {
      this.tags = init.tags.map((tag) => new TagsModel(tag));
    }
  }
}
