/**
 * Citation Checker summary of the completed webhook, returned when `properties.references.validate` was true.
 * The results of each reference are in the crawled version of the scan.
 */
export class ReferencesValidationModel {
  summary?: ReferencesValidationSummaryModel;

  constructor(init?: Partial<ReferencesValidationModel>) {
    Object.assign(this, init);
  }
}

/** Counts of the references that were found and validated. */
export interface ReferencesValidationSummaryModel {
  /** References found in the scanned content. */
  total?: number;
  /** References identified as academic. */
  academic?: number;
  /** Academic references fully confirmed against the Copyleaks academic citation index. */
  academicValidated?: number;
  /** Non-academic references fully confirmed against their cited source. */
  nonAcademicValidated?: number;
}
