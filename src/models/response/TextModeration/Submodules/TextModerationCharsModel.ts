export class TextModerationCharsModel {

  /** Label index of each segment. Resolve it to a label id with `legend`. */
  public labels: number[];

  /** Start character position of each segment. */
  public starts: number[];

  /** Length of each segment, in characters. */
  public lengths: number[];

  constructor(init: { labels: number[]; starts: number[]; lengths: number[] }) {
    this.labels = init.labels;
    this.starts = init.starts;
    this.lengths = init.lengths;
  }
}
