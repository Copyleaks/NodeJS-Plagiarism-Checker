/**
 * Response of `Copyleaks.getAllowedCrossLanguagesAsync`. Each list maps the lowercase English language name
 * to its ISO-639-1 code, for example `{ "english": "en", "french": "fr" }`. `Object.values(...)` gives the codes.
 */
export interface CopyleaksCrossLanguagesResponseModel {
  /** Languages the submitted document can be written in. */
  documentLanguages: Record<string, string>;
  /** Languages the document can be compared against. */
  resultLanguages: Record<string, string>;
}
