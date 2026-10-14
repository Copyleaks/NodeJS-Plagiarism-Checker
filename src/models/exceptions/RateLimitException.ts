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


import { CopyleaksErrorResponse, retryAfterSeconds, toCopyleaksErrorResponse } from './CopyleaksErrorResponse.js';

/**
 * Too many requests: the Copyleaks API answered with HTTP 429.
 * Wait before you call again. `retryAfter` tells you how long, when the server sends it.
 */
export class RateLimitException extends Error {
  /** HTTP status code of the response (429). */
  public readonly status?: number;
  /** Response body: the parsed JSON when the server sent JSON, otherwise the text. */
  public readonly body?: unknown;
  /** Seconds to wait before the next call, from the `Retry-After` header. Undefined when the server did not send it. */
  public readonly retryAfter?: number;
  /**
   * The response: status, status text, headers and body (`data`).
   * Request details, such as the `Authorization` header, are never included.
   */
  public readonly response?: CopyleaksErrorResponse;

  /**
   * @param response The HTTP response of the failed call.
   */
  constructor(response?: unknown) {
    super('Too many requests. Please wait before calling again.');
    this.name = 'RateLimitException';
    const details = toCopyleaksErrorResponse(response);
    if (details) {
      this.status = details.status;
      this.body = details.data;
      this.response = details;
      this.retryAfter = retryAfterSeconds(details);
    }
  }
}
