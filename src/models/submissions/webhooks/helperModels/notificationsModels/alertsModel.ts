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
import { CopyleaksAlertCodes } from '../../../../constants/CopyleaksAlertCodes';
import { CopyleaksAiTextDetectionResponseModel } from '../../../../response/AiTextDetection/CopyleaksAiTextDetectionResponseModel';

export class AlertsModel {
  
  /*Scan alert category. */
  category!: number;
  
  /*Scan alert code. The code is unique for each scan alert. */
  code!: string;
  
  /*Scan alert human-readable title. */
  title!: string;
  
  /*Provides human-readable information about the scan alert. */
  message!: string;

  /*Url to a resource describing the specific scan alert. Not sent for every alert (for example, not for suspected-ai-text). */
  helpLink?: string;

  /*Specifies the importance of the scan alert. */
  severity!: number;

  /*Additional data about the scan alert. Supplied as a json string. Can be missing or empty. */
  additionalData?: string;

  constructor(init?: Partial<AlertsModel>) {
    Object.assign(this, init);
  }

  /**
   * Decodes the additionalData of a "suspected-ai-text" alert into a typed AI text detection result.
   *
   * Returns null when the alert code is not CopyleaksAlertCodes.SUSPECTED_AI_TEXT,
   * when additionalData is missing or empty,
   * or when additionalData is valid JSON but not a JSON object (an array, number, string, true/false or null).
   * Trailing NUL characters (U+0000) and ASCII whitespace (tab, line feed, vertical tab, form feed,
   * carriage return and space) are removed before parsing. Other characters are not trimmed.
   * The raw additionalData string is not changed.
   *
   * @returns The decoded AI text detection result, or null.
   * @throws {SyntaxError} When additionalData is not valid JSON. The JSON.parse error is not caught.
   */
  public getAIDetectionResult(): CopyleaksAiTextDetectionResponseModel | null {
    if (this.code !== CopyleaksAlertCodes.SUSPECTED_AI_TEXT || !this.additionalData) {
      return null;
    }
    const json = trimTrailingNulAndWhitespace(this.additionalData);
    if (json.length === 0) {
      return null;
    }
    const parsed = JSON.parse(json);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return null;
    }
    return new CopyleaksAiTextDetectionResponseModel(parsed);
  }
}

/**
 * Removes trailing NUL characters and ASCII whitespace with a single backward scan.
 * The server can send additionalData padded with NUL characters.
 */
function trimTrailingNulAndWhitespace(value: string): string {
  let end = value.length;
  while (end > 0 && isNulOrAsciiWhitespace(value.charCodeAt(end - 1))) {
    end--;
  }
  return value.substring(0, end);
}

/**
 * True for NUL (U+0000) and the ASCII whitespace characters tab, line feed, vertical tab,
 * form feed, carriage return and space. Unicode whitespace such as U+00A0 is not included.
 */
function isNulOrAsciiWhitespace(code: number): boolean {
  return code === 0x00 // NUL
    || code === 0x09 // \t
    || code === 0x0a // \n
    || code === 0x0b // \v
    || code === 0x0c // \f
    || code === 0x0d // \r
    || code === 0x20; // space
}
