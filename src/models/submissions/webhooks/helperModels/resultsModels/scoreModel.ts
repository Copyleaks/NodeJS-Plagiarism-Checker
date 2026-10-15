export class ScoreModel {
  
  /** Words that matched exactly. */
  identicalWords?: number;

  /** Nearly identical words with small differences, like "slow" and "slowly". */
  minorChangedWords?: number;

  /** Paraphrased words: similar ideas in different words. */
  relatedMeaningWords?: number;

  /** Percentage of similar words from all results, without excluded references, quotations and so on. */
  aggregatedScore?: number;

  constructor(init?: Partial<ScoreModel>) {
    Object.assign(this, init);
  }
}
