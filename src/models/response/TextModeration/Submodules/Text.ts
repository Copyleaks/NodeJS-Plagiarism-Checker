import { TextModerationCharsModel } from "./TextModerationCharsModel.js";

export class Text {

  /** Labelled segments, with positions in characters. */
  public chars: TextModerationCharsModel;

  constructor(init: {
    chars: TextModerationCharsModel;
  }) {
    this.chars = init.chars;
  }
}
