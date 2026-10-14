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
 * The request did not get an HTTP response: it timed out, the connection failed or was dropped.
 * Unlike the underlying axios error, it does not carry the request configuration,
 * so your token is never part of it.
 */
export class NetworkException extends Error {
  /** The low-level error code, for example `ECONNABORTED`, `ETIMEDOUT`, `ECONNRESET` or `ENOTFOUND`. */
  public readonly code?: string;
  /** True when the request hit the `timeout` option. */
  public readonly isTimeout: boolean;
  /** HTTP method of the request, for example `POST`. */
  public readonly method?: string;
  /** URL of the request. */
  public readonly url?: string;

  constructor(message: string, init?: { code?: string; isTimeout?: boolean; method?: string; url?: string }) {
    super(message);
    this.name = 'NetworkException';
    this.code = init?.code;
    this.isTimeout = init?.isTimeout ?? false;
    this.method = init?.method;
    this.url = init?.url;
  }
}
