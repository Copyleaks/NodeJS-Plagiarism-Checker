import { ModerationsModel } from "./Submodules/ModerationsModel.js";
import { TextModerationsLegendModel } from "./Submodules/TextModerationsLegendModel.js";
import { TextModerationScannedDocumentModel } from "./Submodules/TextModerationScannedDocumentModel.js";
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
