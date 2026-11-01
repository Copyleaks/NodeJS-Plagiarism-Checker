import { MetadataModel } from "../baseModels/metadataModel.js";

export class RepositoriesMetadataModel extends MetadataModel {
  
  /** Email of the user who added this document to the repository. */
  submittedBy?: string;

  constructor(init?: Partial<RepositoriesMetadataModel>) {
    super(init);
    Object.assign(this, init);
  }
}
