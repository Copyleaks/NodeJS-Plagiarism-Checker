export class NewResultScoreModel {
  
  /** Percentage of similar words from all results, without excluded references, quotations and so on. */
  aggregatedScore?: number;

  constructor(init?: Partial<NewResultScoreModel>) {
    Object.assign(this, init);
  }
}
