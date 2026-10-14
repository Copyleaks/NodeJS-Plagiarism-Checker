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


import { CopyleaksErrorResponse, describeErrorResponse, toCopyleaksErrorResponse } from './CopyleaksErrorResponse.js';

/**
 * The Copyleaks API rejected the request, for example with HTTP 400, 401, 402, 403, 404 or 409.
 * HTTP 429 throws `RateLimitException` and HTTP 503 throws `UnderMaintenanceException` instead.
 * The message contains the HTTP status and the response body.
 */
export class CommandException extends Error {
  /** HTTP status code of the response, for example 400. */
  public readonly status?: number;
  /** Response body: the parsed JSON when the server sent JSON, otherwise the text. */
  public readonly body?: unknown;
  /**
   * The response: status, status text, headers and body (`data`).
   * Request details, such as the `Authorization` header, are never included.
   */
  public readonly response?: CopyleaksErrorResponse;

  /**
   * @param response The HTTP response of the failed call, or an error message.
   */
  constructor(response?: unknown) {
    const details = toCopyleaksErrorResponse(response);
    super(details
      ? describeErrorResponse('Copyleaks API error', details)
      : (typeof response === 'string' ? response : 'Copyleaks API error'));
    this.name = 'CommandException';
    if (details) {
      this.status = details.status;
      this.body = details.data;
      this.response = details;
    }
  }
}
