/*
 The MIT License(MIT)

 Copyright(c) 2016 Copyleaks LTD (https://copyleaks.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/

/**
 * Response of `Copyleaks.getAllowedCrossLanguagesAsync`: the languages supported by cross-language
 * plagiarism detection (`properties.scanning.crossLanguages`).
 * Each list maps the lowercase English language name to its ISO-639-1 code, for example
 * `{ "english": "en", "french": "fr" }`. Use `Object.values(...)` to get the codes.
 * For more info: https://docs.copyleaks.com/reference/actions/miscellaneous/supported-cross-languages
 */
export interface CopyleaksCrossLanguagesResponseModel {
  /** Languages the submitted document can be written in: language name to ISO-639-1 code. */
  documentLanguages: Record<string, string>;
  /** Languages the document can be compared against: language name to ISO-639-1 code. */
  resultLanguages: Record<string, string>;
}
