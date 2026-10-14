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
 * Why an asynchronous scan failed. Copyleaks POSTs it to your webhook in the `error` field of
 * `CopyleaksAiVideoDetectionResponseModel` and `CopyleaksAiImageDetectionResponseModel`, instead of the result.
 */
export interface CopyleaksAsyncWebhookErrorModel {
  /** The error type, for example "invalid_request_error", "payment_error" or "api_error". */
  type: string;
  /** The machine-readable error identifier, for example "insufficient_credits". */
  id: string;
  /** The error code that represents the reason for the failure. */
  code: number;
  /** A message that describes the error. */
  message: string;
  /** A URL to the documentation page of this error. */
  url?: string;
  /** The request parameters that caused the error. */
  details?: CopyleaksAsyncWebhookErrorDetailModel[];
}

/**
 * A request parameter that caused an error, in `CopyleaksAsyncWebhookErrorModel.details`.
 */
export interface CopyleaksAsyncWebhookErrorDetailModel {
  /** The parameter name. */
  param: string;
  /** What is wrong with the parameter. */
  message: string;
}
