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
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Options for `new Copyleaks(options)` and for the product clients
 * (for example `new AIDetectionClient(options)`).
 * Every option is optional. Create one `Copyleaks` instance and reuse it, so that
 * all calls share the same connection pool.
 */
export interface CopyleaksOptions {
  /**
   * Base URL of the Copyleaks API, for this instance only.
   * Default: `CopyleaksConfig.API_SERVER_URI` (`https://api.copyleaks.com`), read on every call.
   */
  apiServerUri?: string;
  /**
   * Base URL of the Copyleaks identity server that `loginAsync` calls, for this instance only.
   * Default: `CopyleaksConfig.IDENTITY_SERVER_URI` (`https://id.copyleaks.com`), read on every call.
   */
  identityServerUri?: string;
  /**
   * Time limit for each request, in milliseconds. `0` means no time limit.
   * Default: 120000 (2 minutes). When the time limit is reached, the call throws a `NetworkException`
   * whose `isTimeout` is true.
   * When you pass `axiosInstance` and leave this out, the timeout of your instance applies.
   */
  timeout?: number;
  /**
   * Largest number of open sockets per host. Default: 50.
   * Used only for the keep-alive agents that the SDK creates. It is ignored when you pass
   * `httpAgent`, `httpsAgent` or `axiosInstance`.
   */
  maxSockets?: number;
  /**
   * Your own agent for `http://` URLs, for example an `http.Agent` with other keep-alive settings.
   * Default: an `http.Agent` with `keepAlive: true`.
   */
  httpAgent?: AxiosRequestConfig['httpAgent'];
  /**
   * Your own agent for `https://` URLs, for example an `https.Agent` with a proxy or custom certificates.
   * Default: an `https.Agent` with `keepAlive: true`.
   */
  httpsAgent?: AxiosRequestConfig['httpsAgent'];
  /**
   * Your own axios instance, for example one with interceptors.
   * The SDK sends every request through it. It always passes its own `validateStatus` so that
   * API errors are thrown as SDK exceptions.
   */
  axiosInstance?: AxiosInstance;
  /**
   * How many times to retry a failed request. Default: 0 (no retries).
   * Retried: HTTP 429 and 503 responses, and connection errors where the request did not reach the server.
   * GET requests are also retried after timeouts and dropped connections.
   * Other requests are never retried after a timeout, because the server may already have
   * processed them and charged credits.
   */
  maxRetries?: number;
  /**
   * Delay before the first retry, in milliseconds. Each further retry doubles it. Default: 1000.
   * A `Retry-After` header sent by the server takes precedence.
   */
  retryDelay?: number;
  /**
   * Longest wait before a retry, in milliseconds. Default: 30000.
   * When the server asks for a longer wait in `Retry-After`, the SDK does not retry and throws the error instead.
   */
  maxRetryDelay?: number;
}
