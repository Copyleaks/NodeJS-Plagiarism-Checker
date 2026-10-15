/** The detection mask types of AI image detection (`maskType`). */
export const CopyleaksAiImageDetectionMaskTypes = {
  /** RLE mask of the AI regions in `result.starts` and `result.lengths`. The default. */
  BINARY: "binary",
  /** The RLE mask plus `result.labels`, a confidence band from 0 to 4 for each run. */
  HEATMAP: "heatmap",
  /** No mask: the response has no `result`. Synchronous detection only. */
  NONE: "none",
} as const;
