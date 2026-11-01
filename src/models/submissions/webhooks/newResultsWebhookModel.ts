import { WebhookModel } from "./helperModels/baseModels/webhookModel.js";
import { NewResultInternetModel } from "./helperModels/newResultsModels/newResultInternetModel.js";
import { NewResultScoreModel } from "./helperModels/newResultsModels/newResultScoreModel.js";
import { NewResultsRepositoriesModel } from "./helperModels/newResultsModels/NewResultsRepositoriesModel.js";
import { SharedResultsModel } from "./helperModels/resultsModels/sharedResultsModel.js";

export class NewResultWebhookModel extends WebhookModel {
  score?: NewResultScoreModel;
  internet?: NewResultInternetModel[];
  database?: SharedResultsModel[];
  batch?: SharedResultsModel[];
  repositories?: NewResultsRepositoriesModel[];

  constructor(init?: Partial<NewResultWebhookModel>) {
    super(init);

    if (init?.score) {
      this.score = new NewResultScoreModel(init.score);
    }

    if (init?.internet) {
      this.internet = init.internet.map((i) => new NewResultInternetModel(i));
    }

    if (init?.database) {
      this.database = init.database.map((d) => new SharedResultsModel(d));
    }

    if (init?.batch) {
      this.batch = init.batch.map((b) => new SharedResultsModel(b));
    }

    if (init?.repositories) {
      this.repositories = init.repositories.map(
        (r) => new NewResultsRepositoriesModel(r)
      );
    }
  }
}
