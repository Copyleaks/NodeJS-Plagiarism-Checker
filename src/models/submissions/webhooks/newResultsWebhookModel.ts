/*
 The MIT License(MIT)

 Copyright(c) 2016 Copyleaks LTD (https://copyleaks.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/
import { WebhookModel } from "./helperModels/baseModels/webhookModel";
import { NewResultInternetModel } from "./helperModels/newResultsModels/newResultInternetModel";
import { NewResultScoreModel } from "./helperModels/newResultsModels/newResultScoreModel";
import { NewResultsRepositoriesModel } from "./helperModels/newResultsModels/NewResultsRepositoriesModel";
import { SharedResultsModel } from "./helperModels/resultsModels/sharedResultsModel";

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
