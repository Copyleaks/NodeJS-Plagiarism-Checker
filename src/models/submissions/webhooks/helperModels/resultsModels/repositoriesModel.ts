import { RepositoriesMetadataModel } from "./repositoriesMetadataModel.js";
import { SharedResultsModel } from "./sharedResultsModel.js";
import { TagsModel } from "./tagsModel.js";

export class RepositoriesModel extends SharedResultsModel {
  
  /** ID of the repository that has the result. */
  repositoryId?: string;
  
  tags?: TagsModel[];

  metadata?: RepositoriesMetadataModel;

  constructor(init?: Partial<RepositoriesModel>) {
    super(init);
    if (init?.metadata) {
      this.metadata = new RepositoriesMetadataModel(init.metadata);
    }
     if (init?.tags) {
          this.tags = init.tags.map((tag) => new TagsModel(tag));
        }
  }
}
