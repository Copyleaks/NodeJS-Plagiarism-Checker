import { RepositoriesMetadataModel } from "../resultsModels/repositoriesMetadataModel.js";
import { SharedResultsModel } from "../resultsModels/sharedResultsModel.js";

export class NewResultsRepositoriesModel extends SharedResultsModel {
  
  /** ID of the repository that has the result. */
  repositoryId?: string;
  
  metadata?: RepositoriesMetadataModel;

  constructor(init?: Partial<NewResultsRepositoriesModel>) {
    super(init);
    if (init?.metadata) {
      this.metadata = new RepositoriesMetadataModel(init.metadata);
    }
  }
}
