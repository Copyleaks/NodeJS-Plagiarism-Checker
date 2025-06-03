import { MetadataModel } from "../baseModels/metadataModel";
export declare class NewResultInternetModel {
    id?: string;
    title?: string;
    introduction?: string;
    matchedWords?: number;
    scanId?: string;
    metadata?: MetadataModel;
    url?: string;
    constructor(init?: Partial<NewResultInternetModel>);
}
