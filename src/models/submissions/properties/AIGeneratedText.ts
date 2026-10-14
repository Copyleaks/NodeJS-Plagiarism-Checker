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


export interface AIGeneratedText {
  /**
   * Enable detection of AI generated text. Default: false.
   */
  detect?: boolean;
  /**
   * How sensitive the AI detection is, from 1 to 3. Default: 2.
   * 1 finds text copied from an AI tool without edits, 2 also finds AI text with minor changes,
   * and 3 also finds AI text that was heavily modified.
   */
  sensitivity?: number;
  /**
   * AI Logic: explain why the text was detected as AI.
   */
  explain?: AIGeneratedTextExplain;
}

/**
 * AI Logic settings of `aiGeneratedText`.
 */
export interface AIGeneratedTextExplain {
  /**
   * Enable AI Logic for the AI detection. Default: false.
   * Explanations are returned for the AI Logic supported languages only.
   */
  enable?: boolean;
}
