"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewResultWebhookModel = void 0;
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
const webhookModel_1 = require("./helperModels/baseModels/webhookModel");
const newResultInternetModel_1 = require("./helperModels/newResultsModels/newResultInternetModel");
const newResultScoreModel_1 = require("./helperModels/newResultsModels/newResultScoreModel");
const NewResultsRepositoriesModel_1 = require("./helperModels/newResultsModels/NewResultsRepositoriesModel");
const sharedResultsModel_1 = require("./helperModels/resultsModels/sharedResultsModel");
class NewResultWebhookModel extends webhookModel_1.WebhookModel {
    constructor(init) {
        super(init);
        if (init === null || init === void 0 ? void 0 : init.score) {
            this.score = new newResultScoreModel_1.NewResultScoreModel(init.score);
        }
        if (init === null || init === void 0 ? void 0 : init.internet) {
            this.internet = init.internet.map((i) => new newResultInternetModel_1.NewResultInternetModel(i));
        }
        if (init === null || init === void 0 ? void 0 : init.database) {
            this.database = init.database.map((d) => new sharedResultsModel_1.SharedResultsModel(d));
        }
        if (init === null || init === void 0 ? void 0 : init.batch) {
            this.batch = init.batch.map((b) => new sharedResultsModel_1.SharedResultsModel(b));
        }
        if (init === null || init === void 0 ? void 0 : init.repositories) {
            this.repositories = init.repositories.map((r) => new NewResultsRepositoriesModel_1.NewResultsRepositoriesModel(r));
        }
    }
}
exports.NewResultWebhookModel = NewResultWebhookModel;
