/** Response of `Copyleaks.getReleaseNotesAsync`. */
export interface CopyleaksReleaseNotesResponseModel {
  /** Release notes, newest first. */
  updates: CopyleaksReleaseNoteModel[];
}

/** A single Copyleaks API release note. */
export interface CopyleaksReleaseNoteModel {
  /** Type of the update, for example `NEW`, `FEATURE`, `CHANGE` or `DEPRECATED`. */
  msgType: string;
  /** ISO 8601 date of the update (UTC). */
  date: string;
  /** Description of the update, as HTML. */
  htmlDescription: string;
}
