/*
 The MIT License(MIT)

 Copyright(c) 2016 Copyleaks LTD (https://copyleaks.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/

/**
 * Response of `WritingAssistantClient.submitTextAsync` (Grammar Checker).
 * For more info: https://docs.copyleaks.com/reference/data-types/writing/writing-assistant
 */
export interface CopyleaksWritingAssistantResponseModel {
  /** Writing quality scores, readability and text statistics. */
  score: CopyleaksWritingAssistantScoreModel;
  /** Suggested corrections to the text. */
  corrections: CopyleaksWritingAssistantCorrectionsModel;
  /** General information about the scanned document. */
  scannedDocument: CopyleaksWritingAssistantScannedDocumentModel;
  /** `"sandbox"` for sandbox scans. Not sent for regular scans. */
  scanType?: string;
}

/**
 * Writing quality scores, readability and text statistics.
 */
export interface CopyleaksWritingAssistantScoreModel {
  /** Correction counts and scores per category, and the overall score. */
  corrections: CopyleaksWritingAssistantScoreCorrectionsModel;
  /** Readability of the text. */
  readability: CopyleaksWritingAssistantReadabilityModel;
  /** Statistics of the text. */
  statistics: CopyleaksWritingAssistantStatisticsModel;
}

/**
 * Correction counts, scores (0-100) and score weights per correction category, and the overall score.
 */
export interface CopyleaksWritingAssistantScoreCorrectionsModel {
  grammarCorrectionsCount: number;
  grammarCorrectionsScore: number;
  grammarScoreWeight: number;
  mechanicsCorrectionsCount: number;
  mechanicsCorrectionsScore: number;
  mechanicsScoreWeight: number;
  sentenceStructureCorrectionsCount: number;
  sentenceStructureCorrectionsScore: number;
  sentenceStructureScoreWeight: number;
  wordChoiceCorrectionsCount: number;
  wordChoiceCorrectionsScore: number;
  wordChoiceScoreWeight: number;
  /** Overall writing score. */
  overallScore: number;
}

/**
 * Readability of the text.
 */
export interface CopyleaksWritingAssistantReadabilityModel {
  /** Readability score. */
  score: number;
  /** Readability level. */
  readabilityLevel: number;
  /** Readability level as text, for example "10th to 12th Grader". */
  readabilityLevelText: string;
  /** Description of the readability level, for example "Fairly difficult to read". */
  readabilityLevelDescription: string;
}

/**
 * Statistics of the text.
 */
export interface CopyleaksWritingAssistantStatisticsModel {
  /** Number of sentences. */
  sentenceCount: number;
  /** Average sentence length, in words. */
  averageSentenceLength: number;
  /** Average word length, in characters. */
  averageWordLength: number;
  /** Estimated reading time, in seconds. */
  readingTimeSeconds: number;
  /** Estimated speaking time, in seconds. */
  speakingTimeSeconds: number;
}

/**
 * Suggested corrections to the text.
 */
export interface CopyleaksWritingAssistantCorrectionsModel {
  /** Corrections in the plain text. */
  text: CopyleaksWritingAssistantCorrectionsTextModel;
}

/**
 * Corrections in the plain text.
 */
export interface CopyleaksWritingAssistantCorrectionsTextModel {
  /** Character positions of the corrections. */
  chars: CopyleaksWritingAssistantCorrectionRangesModel;
}

/**
 * Corrections as parallel arrays, one entry per correction.
 */
export interface CopyleaksWritingAssistantCorrectionRangesModel {
  /** Correction type ids. See `WritingAssistantClient.getCorrectionTypesAsync`. */
  types: number[];
  /** Start positions of the corrected segments. */
  starts: number[];
  /** Lengths of the corrected segments. */
  lengths: number[];
  /** Suggested replacement text for each corrected segment. */
  operationTexts: string[];
}

/**
 * General information about the scanned document.
 */
export interface CopyleaksWritingAssistantScannedDocumentModel {
  /** The scan id given by the user. */
  scanId: string;
  /** Total number of words found in the scanned text. */
  totalWords: number;
  /** Number of excluded words in the scanned text. */
  totalExcluded: number;
  /** The number of credits spent on the scan. */
  actualCredits: number;
  /** The number of credits that was expected to be spent on the scan. */
  expectedCredits: number;
  /** ISO 8601 creation time of the scan (UTC). */
  creationTime: string;
}
