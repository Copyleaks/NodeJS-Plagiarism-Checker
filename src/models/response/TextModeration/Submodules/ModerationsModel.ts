import { Text } from "./Text.js";

export class ModerationsModel {

  /** Labelled segments of the text, as parallel arrays with one entry per segment. */
  public text: Text;

  constructor(init: { text: Text }) {
    this.text = init.text;
  }
}
