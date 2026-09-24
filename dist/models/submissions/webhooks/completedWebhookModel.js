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
const CopyleaksAlertCodes_1 = require("../../constants/CopyleaksAlertCodes");
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
    /**
     * Returns the first "suspected-ai-text" alert (CopyleaksAlertCodes.SUSPECTED_AI_TEXT) of the scan, or null.
     *
     * A null alert means the scan produced no AI alert.
     * It does not by itself prove that AI detection ran: check the scan's aiGeneratedText.detect setting
     * and the category-2 failure codes in CopyleaksAlertCodes (for example AI_DETECTION_FAILED).
     *
     * @returns The AI alert, or null.
     */
    getAIDetectionAlert() {
        var _a, _b;
        const alerts = (_a = this.notifications) === null || _a === void 0 ? void 0 : _a.alerts;
        if (!alerts) {
            return null;
        }
        return (_b = alerts.find((alert) => alert.code === CopyleaksAlertCodes_1.CopyleaksAlertCodes.SUSPECTED_AI_TEXT)) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Returns the decoded AI text detection result of the "suspected-ai-text" alert, or null.
     * Same as getAIDetectionAlert()?.getAIDetectionResult().
     *
     * Null is returned when there is no AI alert (see getAIDetectionAlert),
     * and also when the AI alert is present but its additionalData is missing or empty.
     * In that case AI text was detected, but the details are not available.
     *
     * @returns The decoded AI text detection result, or null.
     * @throws {SyntaxError} When the alert's additionalData is not valid JSON.
     */
    getAIDetectionResult() {
        var _a, _b;
        return (_b = (_a = this.getAIDetectionAlert()) === null || _a === void 0 ? void 0 : _a.getAIDetectionResult()) !== null && _b !== void 0 ? _b : null;
    }
}
exports.CompletedWebhookModel = CompletedWebhookModel;
