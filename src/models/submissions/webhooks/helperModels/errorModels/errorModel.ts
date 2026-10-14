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
export class ErrorModel {
  /*The error type, for example "invalid_request_error", "payment_error" or "api_error". */
  type?: string;
  /*The machine-readable error identifier, for example "insufficient_credits". */
  id?: string;
  /*Error code that represents the reason for failure. See below the full error table. */
  code?: number;
  /*Error message that represents the reason for failure. */
  message?: string;
  /*A URL to the documentation page of this error. */
  url?: string;
  /*The request parameters that caused the error. */
  details?: ErrorDetailsModel[];

  constructor(init?: Partial<ErrorModel>) {
    Object.assign(this, init);
  }
}

/**
 * A request parameter that caused an error, in `ErrorModel.details`.
 */
export interface ErrorDetailsModel {
  /*The parameter name. */
  param?: string;
  /*What is wrong with the parameter. */
  message?: string;
}
