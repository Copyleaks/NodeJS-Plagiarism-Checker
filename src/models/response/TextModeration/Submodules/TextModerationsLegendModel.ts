export class TextModerationsLegendModel {
  /** Label index, as used in `chars.labels`. */
  public index: number;

  /** Label id, for example "toxic-v1". */
  public id: string;

  constructor(init: { index: number; id: string }) {
    this.index = init.index;
    this.id = init.id;
  }
}
