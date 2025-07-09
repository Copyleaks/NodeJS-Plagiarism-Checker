export declare class AlertsModel {
    category: number;
    code: string;
    title: string;
    message: string;
    helpLink: string;
    severity: number;
    additionalData: string;
    constructor(init?: Partial<AlertsModel>);
}
