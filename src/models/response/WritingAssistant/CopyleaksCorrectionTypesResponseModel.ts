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
 * Response of `WritingAssistantClient.getCorrectionTypesAsync`.
 * For more info: https://docs.copyleaks.com/reference/actions/writing-assistant/correction-types
 */
export interface CopyleaksCorrectionTypesResponseModel {
  /** The correction types supported by the Grammar Checker. */
  correctionTypes: CopyleaksCorrectionTypeModel[];
}

/**
 * A Grammar Checker correction type.
 */
export interface CopyleaksCorrectionTypeModel {
  /** Correction type id, as used in `CopyleaksWritingAssistantCorrectionRangesModel.types`. */
  id: number;
  /** Correction category: `1` = Sentence Structure, `2` = Grammar, `3` = Word Choice, `4` = Mechanics. */
  category: number;
  /** Short name of the correction type, in the requested language. */
  title: string;
  /** Message to show for a correction of this type, in the requested language. */
  message: string;
  /** Description of the correction type, in the requested language. */
  description: string;
}
