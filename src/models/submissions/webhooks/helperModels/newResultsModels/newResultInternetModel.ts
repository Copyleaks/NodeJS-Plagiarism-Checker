import { MetadataModel } from "../baseModels/metadataModel.js";

export class NewResultInternetModel {
  
  /** Unique result ID. */
  id?: string;

  /** Document title, mostly extracted from its content. */
  title?: string;
  
  /** Brief introduction of the document, mostly extracted from its content. */
  introduction?: string;
  
  /** Words matched between this result and the scanned document. */
  matchedWords?: number;

  metadata?: MetadataModel;
  
  /** Public URL of the resource. */
  url?: string;

  constructor(init?: Partial<NewResultInternetModel>) {
    if (init) {
      Object.assign(this, init);
      if (init.metadata) {
        this.metadata = new MetadataModel(init.metadata);
      }
    }
  }
}
