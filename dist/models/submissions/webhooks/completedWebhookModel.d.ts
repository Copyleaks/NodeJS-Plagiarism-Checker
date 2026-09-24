import { NotificationsModel } from "./helperModels/completedModels/notificationsModel";
import { StatusWebhookModel } from "./helperModels/baseModels/statusWebhookModel";
import { ResultsModel } from "./helperModels/completedModels/resultsModel";
import { ScannedDocumentModel } from "./helperModels/completedModels/scannedDocumentModel";
import { AlertsModel } from "./helperModels/notificationsModels/alertsModel";
import { CopyleaksAiTextDetectionResponseModel } from "../../response/AiTextDetection/CopyleaksAiTextDetectionResponseModel";
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
     * A null alert means the scan produced no AI alert.
     * It does not by itself prove that AI detection ran: check the scan's aiGeneratedText.detect setting
     * and the category-2 failure codes in CopyleaksAlertCodes (for example AI_DETECTION_FAILED).
     *
     * @returns The AI alert, or null.
     */
    getAIDetectionAlert(): AlertsModel | null;
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
    getAIDetectionResult(): CopyleaksAiTextDetectionResponseModel | null;
}
