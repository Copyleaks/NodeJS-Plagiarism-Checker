/**
 * The file that Copyleaks uploads to the `overview` export target: the Gen-AI Overview of a scan.
 * The `aiDetection` target receives a `CopyleaksAiTextDetectionResponseModel`, and the
 * `writingFeedback` target receives a `CopyleaksWritingAssistantResponseModel`.
 */
export interface CopyleaksExportedOverviewModel {
  /** The overview, as Markdown. */
  overview: string;
  /** The version of the model that generated the overview. */
  modelVersion: string;
}
