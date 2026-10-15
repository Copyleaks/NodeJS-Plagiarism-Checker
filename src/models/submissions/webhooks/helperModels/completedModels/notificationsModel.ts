import { AlertsModel } from "../notificationsModels/alertsModel.js";

export class NotificationsModel {
  
  alerts?: AlertsModel[];

  /**
   * @param init Wire data. Each alert can be a plain object; it is mapped to an AlertsModel instance.
   */
  constructor(init?: Omit<Partial<NotificationsModel>, 'alerts'> & { alerts?: Partial<AlertsModel>[] }) {
    Object.assign(this, init);

    if (init?.alerts) {
      this.alerts = init.alerts.map((a) => new AlertsModel(a));
    }
  }
}
