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

export * from './CopyleaksFileSubmissionModel';
export * from './CopyleaksFileOcrSubmissionModel';
export * from './CopyleaksURLSubmissionModel';
export * from './CopyleaksSubmissionModel';
export * from './ai-detector/CopyleaksSourceCodeSubmissionModel';
export * from './ai-detector/CopyleaksNaturalLanguageSubmissionModel';
export * from './writing-feedback/CopyleaksWritingAssistantSubmissionModel';
export * from './webhooks/completedWebhookModel';
export * from './webhooks/creditsCheckedWebhookModel';
export * from './webhooks/errorWebhookModel';
export * from './webhooks/exportCompletedWebhookModel';
export * from './webhooks/indexedWebhookModel';
export * from './webhooks/newResultsWebhookModel';

export * from './webhooks/helperModels/baseModels/metadataModel';
export * from './webhooks/helperModels/baseModels/statusWebhookModel';
export * from './webhooks/helperModels/baseModels/webhookModel';
export * from './webhooks/helperModels/completedModels/notificationsModel';
export * from './webhooks/helperModels/completedModels/resultsModel';
export * from './webhooks/helperModels/completedModels/scannedDocumentModel';
export * from './webhooks/helperModels/errorModels/errorModel';
export * from './webhooks/helperModels/exportModels/taskModel';
export * from './webhooks/helperModels/newResultsModels/newResultInternetModel';
export * from './webhooks/helperModels/newResultsModels/newResultScoreModel';
export * from './webhooks/helperModels/newResultsModels/NewResultsRepositoriesModel';
export * from './webhooks/helperModels/notificationsModels/alertsModel';
export * from './webhooks/helperModels/resultsModels/batchModel';
export * from './webhooks/helperModels/resultsModels/databaseModel';
export * from './webhooks/helperModels/resultsModels/internetModel';
export * from './webhooks/helperModels/resultsModels/repositoriesMetadataModel';
export * from './webhooks/helperModels/resultsModels/repositoriesModel';
export * from './webhooks/helperModels/resultsModels/scoreModel';
export * from './webhooks/helperModels/resultsModels/sharedResultsModel';
export * from './webhooks/helperModels/resultsModels/tagsModel';