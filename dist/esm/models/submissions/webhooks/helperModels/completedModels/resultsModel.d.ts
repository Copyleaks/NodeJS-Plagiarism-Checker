import { BatchModel } from "../resultsModels/batchModel.js";
import { DatabaseModel } from "../resultsModels/databaseModel.js";
import { RepositoriesModel } from "../resultsModels/repositoriesModel.js";
import { ScoreModel } from "../resultsModels/scoreModel.js";
import { InternetModel } from "../resultsModels/internetModel.js";
export declare class ResultsModel {
    database?: DatabaseModel[];
    batch?: BatchModel[];
    repositories?: RepositoriesModel[];
    score?: ScoreModel;
    internet?: InternetModel[];
    constructor(init?: Partial<ResultsModel>);
}
