import { NotificationsModel } from "./helperModels/completedModels/notificationsModel.js";
import { StatusWebhookModel } from "./helperModels/baseModels/statusWebhookModel.js";
import { ResultsModel } from "./helperModels/completedModels/resultsModel.js";
import { ScannedDocumentModel } from "./helperModels/completedModels/scannedDocumentModel.js";
import { AlertsModel } from "./helperModels/notificationsModels/alertsModel.js";
import { CopyleaksAiTextDetectionResponseModel } from "../../response/AiTextDetection/CopyleaksAiTextDetectionResponseModel.js";
export declare class CompletedWebhookModel extends StatusWebhookModel {
    results?: ResultsModel;
    notifications?: NotificationsModel;
    scannedDocument?: ScannedDocumentModel;
    /**
     * @param init Wire data. notifications.alerts items can be plain objects; they are mapped to AlertsModel instances.
     */
    constructor(init?: Omit<Partial<CompletedWebhookModel>, 'notifications'> & {
        notifications?: ConstructorParameters<typeof NotificationsModel>[0];
    });
    /**
     * Returns the first "suspected-ai-text" alert (CopyleaksAlertCodes.SUSPECTED_AI_TEXT) of the scan, or null.
     *
     * Returns null when the completed webhook contains no suspected-ai-text alert.
     *
     * @returns The AI alert, or null.
     */
    getAIDetectionAlert(): AlertsModel | null;
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
    getAIDetectionResult(): CopyleaksAiTextDetectionResponseModel | null;
}
