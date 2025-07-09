import { MetadataModel } from "../baseModels/metadataModel";
export declare class SharedResultsModel {
    id?: string;
    title?: string;
    introduction?: string;
    matchedWords?: string;
    scanId?: string;
    metadata?: MetadataModel;
    constructor(init?: Partial<SharedResultsModel>);
}
