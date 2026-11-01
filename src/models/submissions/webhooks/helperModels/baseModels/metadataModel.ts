export class MetadataModel {
  /** The url after all HTTP redirects. */
  finalUrl?: string;

  /** Canonical url found in the document. */
  canonicalUrl?: string;
  
  publishDate?: string;

  creationDate?: string;
  
  lastModificationDate?: string;

  author?: string;

  organization?: string;

  filename?: string;

  constructor(init?: Partial<MetadataModel>) {
    Object.assign(this, init);
  }
}
