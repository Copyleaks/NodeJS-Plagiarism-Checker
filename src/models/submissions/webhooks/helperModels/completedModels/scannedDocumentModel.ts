import { MetadataModel } from "../baseModels/metadataModel.js";

export class ScannedDocumentModel {
  scanId?: string;
  
  /** Words found in the scanned text. */
  totalWords?: number;
  
  /** Excluded words in the submitted content. */
  totalExcluded?: number;
  /** @deprecated Misspelled. Use `totalExcluded`; the constructor copies it here. */
  totalExecluded?: number;
  
  /** Credits used for the scan. */
  credits?: number;
  
  creationTime?: string;
  
  metadata?: MetadataModel;

  constructor(init?: Partial<ScannedDocumentModel>) {
    if (init) {
      Object.assign(this, init);
      if (init.totalExcluded !== undefined && init.totalExecluded === undefined) {
        this.totalExecluded = init.totalExcluded;
      }
      if (init.metadata) {
        this.metadata = new MetadataModel(init.metadata);
      }
    }
  }
}
