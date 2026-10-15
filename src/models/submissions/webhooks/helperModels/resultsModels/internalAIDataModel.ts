import { TagsModel } from "./tagsModel.js";

/**
 * A match from the Copyleaks internal AI database, in `results.internalAIData` of the completed webhook.
 * Returned when `properties.internalAiSourceMatch.enable` was true.
 */
export class InternalAIDataModel {
  /** Short identifier of the match. */
  id?: string;
  /** Title of the matched database entry. */
  title?: string;
  /** Sample excerpt of the matched content. */
  introduction?: string;
  /** Words matched from the Copyleaks internal AI database. */
  matchedWords?: number;
  identicalWords?: number;
  /** Similar but not identical words. */
  similarWords?: number;
  paraphrasedWords?: number;
  /** Words in the matched database entry. */
  totalWords?: number;
  tags?: TagsModel[];

  constructor(init?: Partial<InternalAIDataModel>) {
    Object.assign(this, init);
    if (init?.tags) {
      this.tags = init.tags.map((tag) => new TagsModel(tag));
    }
  }
}
