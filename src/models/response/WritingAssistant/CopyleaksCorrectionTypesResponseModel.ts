/** Response of `WritingAssistantClient.getCorrectionTypesAsync`. */
export interface CopyleaksCorrectionTypesResponseModel {
  /** The correction types supported by the Grammar Checker. */
  correctionTypes: CopyleaksCorrectionTypeModel[];
}

/** A Grammar Checker correction type. */
export interface CopyleaksCorrectionTypeModel {
  /** Correction type id, as used in `CopyleaksWritingAssistantCorrectionRangesModel.types`. */
  id: number;
  /** Correction category: `1` = Sentence Structure, `2` = Grammar, `3` = Word Choice, `4` = Mechanics. */
  category: number;
  /** Short name of the correction type, in the requested language. */
  title: string;
  /** Message to show for a correction of this type, in the requested language. */
  message: string;
  /** Description of the correction type, in the requested language. */
  description: string;
}
