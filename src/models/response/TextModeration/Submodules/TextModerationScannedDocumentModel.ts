export class TextModerationScannedDocumentModel {

  /** The scan id given by the user. */
  public scanId: string;

  /** Total number of words found in the scanned text. */
  public totalWords: number;

  /** Total excluded words from the text. */
  public totalExcluded: number;

  /** The cost of credits for this scan. */
  public actualCredits: number;

  /** The amount of credits that was expected to be spent on the scan. */
  public expectedCredits: number;

  /** Creation time of the scan. */
  public creationTime: Date;
  
  constructor(init: {
    scanId: string;
    totalWords: number;
    totalExcluded: number;
    actualCredits: number;
    expectedCredits: number;
    creationTime: Date;
  }) {
    this.scanId = init.scanId;
    this.totalWords = init.totalWords;
    this.totalExcluded = init.totalExcluded;
    this.actualCredits = init.actualCredits;
    this.expectedCredits = init.expectedCredits;
    this.creationTime = init.creationTime;
  }
}
