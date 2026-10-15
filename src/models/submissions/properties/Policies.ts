export enum MaskingPolicy {
    /** Don't mask results from this document. */
    NoMasking,
    /** Mask results from this document, unless the requesting user owns it. */
    MaskUnlessOwner,
    /** Mask all results from this document. */
    MaskAll
  }
  