"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./CopyleaksFileSubmissionModel.js"), exports);
__exportStar(require("./CopyleaksFileOcrSubmissionModel.js"), exports);
__exportStar(require("./CopyleaksURLSubmissionModel.js"), exports);
__exportStar(require("./CopyleaksSubmissionModel.js"), exports);
__exportStar(require("./ai-detector/CopyleaksNaturalLanguageSubmissionModel.js"), exports);
__exportStar(require("./writing-feedback/CopyleaksWritingAssistantSubmissionModel.js"), exports);
__exportStar(require("./webhooks/completedWebhookModel.js"), exports);
__exportStar(require("./webhooks/creditsCheckedWebhookModel.js"), exports);
__exportStar(require("./webhooks/errorWebhookModel.js"), exports);
__exportStar(require("./webhooks/exportCompletedWebhookModel.js"), exports);
__exportStar(require("./webhooks/indexedWebhookModel.js"), exports);
__exportStar(require("./webhooks/newResultsWebhookModel.js"), exports);
__exportStar(require("./webhooks/helperModels/baseModels/metadataModel.js"), exports);
__exportStar(require("./webhooks/helperModels/baseModels/statusWebhookModel.js"), exports);
__exportStar(require("./webhooks/helperModels/baseModels/webhookModel.js"), exports);
__exportStar(require("./webhooks/helperModels/completedModels/notificationsModel.js"), exports);
__exportStar(require("./webhooks/helperModels/completedModels/resultsModel.js"), exports);
__exportStar(require("./webhooks/helperModels/completedModels/scannedDocumentModel.js"), exports);
__exportStar(require("./webhooks/helperModels/errorModels/errorModel.js"), exports);
__exportStar(require("./webhooks/helperModels/exportModels/taskModel.js"), exports);
__exportStar(require("./webhooks/helperModels/newResultsModels/newResultInternetModel.js"), exports);
__exportStar(require("./webhooks/helperModels/newResultsModels/newResultScoreModel.js"), exports);
__exportStar(require("./webhooks/helperModels/newResultsModels/NewResultsRepositoriesModel.js"), exports);
__exportStar(require("./webhooks/helperModels/notificationsModels/alertsModel.js"), exports);
__exportStar(require("./webhooks/helperModels/resultsModels/batchModel.js"), exports);
__exportStar(require("./webhooks/helperModels/resultsModels/databaseModel.js"), exports);
__exportStar(require("./webhooks/helperModels/resultsModels/internetModel.js"), exports);
__exportStar(require("./webhooks/helperModels/resultsModels/repositoriesMetadataModel.js"), exports);
__exportStar(require("./webhooks/helperModels/resultsModels/repositoriesModel.js"), exports);
__exportStar(require("./webhooks/helperModels/resultsModels/scoreModel.js"), exports);
__exportStar(require("./webhooks/helperModels/resultsModels/sharedResultsModel.js"), exports);
__exportStar(require("./webhooks/helperModels/resultsModels/tagsModel.js"), exports);
