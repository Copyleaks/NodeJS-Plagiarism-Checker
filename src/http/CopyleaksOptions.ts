import type { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Options for `new Copyleaks(options)` and the product clients, all optional.
 * Create one `Copyleaks` instance and reuse it, so that all calls share one connection pool.
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
   * Time limit for each request, in milliseconds; `0` means none. Default: 120000 (2 minutes).
   * A timeout throws a `NetworkException` with `isTimeout` true.
   * With your own `axiosInstance` and no `timeout`, the instance's timeout applies.
   */
  timeout?: number;
  /**
   * Largest number of open sockets per host. Default: 50.
   * Ignored when you pass `httpAgent`, `httpsAgent` or `axiosInstance`.
   */
  maxSockets?: number;
  /**
   * Your own agent for `http://` URLs, for example an `http.Agent` with other keep-alive settings.
   * Default: an `http.Agent` with `keepAlive: true` that closes connections idle for 5 seconds.
   */
  httpAgent?: AxiosRequestConfig['httpAgent'];
  /**
   * Your own agent for `https://` URLs, for example an `https.Agent` with a proxy or custom certificates.
   * Default: an `https.Agent` with `keepAlive: true` that closes connections idle for 5 seconds.
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
   * Retried: HTTP 429 responses, and connection errors where the request did not reach the server.
   * GET requests are also retried after HTTP 503, timeouts and dropped connections.
   * Other requests are retried after HTTP 503 only when the server sends `Retry-After`, and never
   * after a timeout, because the server may already have processed them and charged credits.
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
