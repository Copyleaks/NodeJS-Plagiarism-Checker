import { ScoreWeights } from '../writing-feedback/ScoreWeights.js';

export interface SubmissionWritingFeedback {
  /**
   * Run the Grammar Checker as part of the scan. Default: false.
   * Download the report with the `writingFeedback` target of `exportAsync`.
   */
  enable?: boolean;
  score?: ScoreWeights;
}
