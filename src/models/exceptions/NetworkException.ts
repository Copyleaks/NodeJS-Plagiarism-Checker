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
