import { ModerationsModel } from "./Submodules/ModerationsModel.js";
import { TextModerationsLegendModel } from "./Submodules/TextModerationsLegendModel.js";
import { TextModerationScannedDocumentModel } from "./Submodules/TextModerationScannedDocumentModel.js";

/** Response of `TextModerationClient.submitTextAsync`. */
export class CopyleaksTextModerationResponseModel {

  /** Version of the moderation model that was used, for example "v1". */
  public modelVersion?: string;

  /** The labelled segments of the text. */
  public moderations!: ModerationsModel;

  /** Resolves the label indexes in `moderations.text.chars.labels` to label ids. */
  public legend!: TextModerationsLegendModel[];

  public scannedDocument!: TextModerationScannedDocumentModel;

  /**
   * @param init The parsed JSON response. Every field is copied, including fields this SDK version does not declare.
   */
  constructor(init?: Partial<CopyleaksTextModerationResponseModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
