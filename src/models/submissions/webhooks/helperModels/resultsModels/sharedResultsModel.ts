import { MetadataModel } from "../baseModels/metadataModel.js";

export class SharedResultsModel {
  
  /** Unique result ID. */
  id?: string;

  /** Document title, mostly extracted from its content. */
  title?: string;

  /** Brief introduction of the document, mostly extracted from its content. */
  introduction?: string;

  /** Words matched between this result and the scanned document. */
  matchedWords?: number;

  /** Scan id of the result when it is one of your submissions in the Copyleaks internal database, else empty. */
  scanId?: string;
  
  metadata?: MetadataModel;

  constructor(init?: Partial<SharedResultsModel>) {
    if (init) {
      Object.assign(this, init);
      if (init.metadata) {
        this.metadata = new MetadataModel(init.metadata);
      }
    }
  }
}
