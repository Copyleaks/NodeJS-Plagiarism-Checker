"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletedWebhookModel = void 0;
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
const notificationsModel_1 = require("./helperModels/completedModels/notificationsModel");
const statusWebhookModel_1 = require("./helperModels/baseModels/statusWebhookModel");
const resultsModel_1 = require("./helperModels/completedModels/resultsModel");
const scannedDocumentModel_1 = require("./helperModels/completedModels/scannedDocumentModel");
class CompletedWebhookModel extends statusWebhookModel_1.StatusWebhookModel {
    constructor(init) {
        super(init);
        if (init) {
            if (init.results) {
                this.results = new resultsModel_1.ResultsModel(init.results);
            }
            if (init.notifications) {
                this.notifications = new notificationsModel_1.NotificationsModel(init.notifications);
            }
            if (init.scannedDocument) {
                this.scannedDocument = new scannedDocumentModel_1.ScannedDocumentModel(init.scannedDocument);
            }
        }
    }
}
exports.CompletedWebhookModel = CompletedWebhookModel;
