export declare enum MaskingPolicy {
    /**
     * don't mask results from this document.
     */
    NoMasking = 0,
    /**
     * Mask all results coming from this document, unless the requesting user owns this file.
     */
    MaskUnlessOwner = 1,
    /**
     * Mask all results from this document.
     */
    MaskAll = 2
}
