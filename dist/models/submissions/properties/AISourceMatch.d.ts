export interface AISourceMatch {
    /**
     * Activate identification of online sources suspected of containing AI generated text.
     * Currently only applies to documents detected as English.
     * Leave it undefined to get the server default (false). Do not send null.
     */
    enable?: boolean;
}
