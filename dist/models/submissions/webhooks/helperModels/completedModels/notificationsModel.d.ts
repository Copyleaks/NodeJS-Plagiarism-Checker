import { AlertsModel } from "../notificationsModels/alertsModel";
export declare class NotificationsModel {
    alerts?: AlertsModel[];
    /**
     * @param init Wire data. Each alert can be a plain object; it is mapped to an AlertsModel instance.
     */
    constructor(init?: Omit<Partial<NotificationsModel>, 'alerts'> & {
        alerts?: Partial<AlertsModel>[];
    });
}
