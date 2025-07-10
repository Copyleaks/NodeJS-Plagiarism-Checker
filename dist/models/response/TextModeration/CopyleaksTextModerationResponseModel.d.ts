import { ModerationsModel } from "./Submodules/ModerationsModel";
import { TextModerationsLegendModel } from "./Submodules/TextModerationsLegendModel";
import { TextModerationScannedDocumentModel } from "./Submodules/TextModerationScannedDocumentModel";
export declare class CopyleaksTextModerationResponseModel {
    moderations: ModerationsModel;
    legend: TextModerationsLegendModel[];
    scannedDocument: TextModerationScannedDocumentModel;
    constructor(init: {
        moderations: ModerationsModel;
        legend: TextModerationsLegendModel[];
        scannedDocument: TextModerationScannedDocumentModel;
    });
}
