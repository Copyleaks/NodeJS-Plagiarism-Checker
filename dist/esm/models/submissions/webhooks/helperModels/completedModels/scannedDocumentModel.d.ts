import { MetadataModel } from "../baseModels/metadataModel.js";
export declare class ScannedDocumentModel {
    scanId?: string;
    totalWords?: number;
    totalExecluded?: number;
    credits?: number;
    creationTime?: string;
    metadata?: MetadataModel;
    constructor(init?: Partial<ScannedDocumentModel>);
}
