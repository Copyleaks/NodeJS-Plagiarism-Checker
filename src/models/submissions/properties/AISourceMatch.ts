export interface AISourceMatch {
  /**
   * Find online sources suspected of containing AI-generated text. English documents only.
   * Leave it undefined to get the server default (false). Do not send null.
   */
  enable?: boolean;
}
