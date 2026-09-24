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
import { NotificationsModel } from "./helperModels/completedModels/notificationsModel";
import { StatusWebhookModel } from "./helperModels/baseModels/statusWebhookModel";
import { ResultsModel } from "./helperModels/completedModels/resultsModel";
import { ScannedDocumentModel } from "./helperModels/completedModels/scannedDocumentModel";
import { AlertsModel } from "./helperModels/notificationsModels/alertsModel";
import { CopyleaksAlertCodes } from "../../constants/CopyleaksAlertCodes";
import { CopyleaksAiTextDetectionResponseModel } from "../../response/AiTextDetection/CopyleaksAiTextDetectionResponseModel";

export class CompletedWebhookModel extends StatusWebhookModel {
  results?: ResultsModel;
  notifications?: NotificationsModel;
  scannedDocument?: ScannedDocumentModel;

  /**
   * @param init Wire data. notifications.alerts items can be plain objects; they are mapped to AlertsModel instances.
   */
  constructor(init?: Omit<Partial<CompletedWebhookModel>, 'notifications'> & { notifications?: ConstructorParameters<typeof NotificationsModel>[0] }) {
    super(init);
    if (init) {
      if (init.results) {
        this.results = new ResultsModel(init.results);
      }
      if (init.notifications) {
        this.notifications = new NotificationsModel(init.notifications);
      }
      if (init.scannedDocument) {
        this.scannedDocument = new ScannedDocumentModel(init.scannedDocument);
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
  public getAIDetectionAlert(): AlertsModel | null {
    const alerts = this.notifications?.alerts;
    if (!alerts) {
      return null;
    }
    return alerts.find((alert) => alert.code === CopyleaksAlertCodes.SUSPECTED_AI_TEXT) ?? null;
  }

  /**
   * Returns the decoded AI text detection result of the "suspected-ai-text" alert, or null.
   * Same as getAIDetectionAlert()?.getAIDetectionResult().
   *
   * Null is returned when there is no AI alert (see getAIDetectionAlert),
   * and also when the AI alert is present but its additionalData is missing, empty,
   * or valid JSON that is not a JSON object.
   * In that case AI text was detected, but the details are not available.
   *
   * @returns The decoded AI text detection result, or null.
   * @throws {SyntaxError} When the alert's additionalData is not valid JSON.
   */
  public getAIDetectionResult(): CopyleaksAiTextDetectionResponseModel | null {
    return this.getAIDetectionAlert()?.getAIDetectionResult() ?? null;
  }
}
