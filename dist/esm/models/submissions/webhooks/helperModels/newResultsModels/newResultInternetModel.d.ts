import { MetadataModel } from "../baseModels/metadataModel.js";
export declare class NewResultInternetModel {
    id?: string;
    title?: string;
    introduction?: string;
    matchedWords?: number;
    metadata?: MetadataModel;
    url?: string;
    constructor(init?: Partial<NewResultInternetModel>);
}
