import { BatchModel } from "../resultsModels/batchModel.js";
import { DatabaseModel } from "../resultsModels/databaseModel.js";
import { RepositoriesModel } from "../resultsModels/repositoriesModel.js";
import { ScoreModel } from "../resultsModels/scoreModel.js";
import { InternetModel } from "../resultsModels/internetModel.js";
import { InternalAIDataModel } from "../resultsModels/internalAIDataModel.js";

export class ResultsModel {
  database?: DatabaseModel[];
  batch?: BatchModel[];
  repositories?: RepositoriesModel[];
  score?: ScoreModel;
  internet?: InternetModel[];
  internalAIData?: InternalAIDataModel[];

  constructor(init?: Partial<ResultsModel>) {
    Object.assign(this, init);
    if (init?.internalAIData) {
      this.internalAIData = init.internalAIData.map((item) => new InternalAIDataModel(item));
    }
  }
}
