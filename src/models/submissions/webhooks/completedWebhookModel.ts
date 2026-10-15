import { NotificationsModel } from "./helperModels/completedModels/notificationsModel.js";
import { StatusWebhookModel } from "./helperModels/baseModels/statusWebhookModel.js";
import { ResultsModel } from "./helperModels/completedModels/resultsModel.js";
import { ScannedDocumentModel } from "./helperModels/completedModels/scannedDocumentModel.js";
import { ReferencesValidationModel } from "./helperModels/completedModels/referencesValidationModel.js";
import { AlertsModel } from "./helperModels/notificationsModels/alertsModel.js";
import { CopyleaksAlertCodes } from "../../constants/CopyleaksAlertCodes.js";
import { CopyleaksAiTextDetectionResponseModel } from "../../response/AiTextDetection/CopyleaksAiTextDetectionResponseModel.js";

export class CompletedWebhookModel extends StatusWebhookModel {
  results?: ResultsModel;
  notifications?: NotificationsModel;
  scannedDocument?: ScannedDocumentModel;
  referencesValidation?: ReferencesValidationModel;

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
      if (init.referencesValidation) {
        this.referencesValidation = new ReferencesValidationModel(init.referencesValidation);
      }
    }
  }

  /** The first "suspected-ai-text" alert (`CopyleaksAlertCodes.SUSPECTED_AI_TEXT`) of the scan, or null. */
  public getAIDetectionAlert(): AlertsModel | null {
    const alerts = this.notifications?.alerts;
    if (!alerts) {
      return null;
    }
    return alerts.find((alert) => alert.code === CopyleaksAlertCodes.SUSPECTED_AI_TEXT) ?? null;
  }

  /**
   * Same as `getAIDetectionAlert()?.getAIDetectionResult()`. Null when there is no AI alert, and also when
   * its `additionalData` is empty or not a JSON object: AI text was detected, but without the details.
   * @throws {SyntaxError} When the alert's `additionalData` is not valid JSON.
   */
  public getAIDetectionResult(): CopyleaksAiTextDetectionResponseModel | null {
    return this.getAIDetectionAlert()?.getAIDetectionResult() ?? null;
  }
}
