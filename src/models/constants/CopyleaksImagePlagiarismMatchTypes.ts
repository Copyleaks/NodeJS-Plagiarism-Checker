/** The values of `matchType` in an image plagiarism result. */
export const CopyleaksImagePlagiarismMatchTypes = {
  /** Exact or near-exact copy of the image. */
  FULL: 0,
  /** Cropped, resized, recolored or otherwise modified version of the image. */
  PARTIAL: 1,
} as const;
