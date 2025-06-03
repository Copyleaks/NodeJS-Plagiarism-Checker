import { BatchModel } from "../resultsModels/batchModel";
import { DatabaseModel } from "../resultsModels/databaseModel";
import { RepositoriesModel } from "../resultsModels/repositoriesModel";
import { ScoreModel } from "../resultsModels/scoreModel";
import { InternetModel } from "../resultsModels/internetModel";
export declare class ResultsModel {
    database?: DatabaseModel[];
    batch?: BatchModel[];
    repositories?: RepositoriesModel[];
    score?: ScoreModel;
    internet?: InternetModel[];
    constructor(init?: Partial<ResultsModel>);
}
