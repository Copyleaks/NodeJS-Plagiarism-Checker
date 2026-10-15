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
  /** The response: status, status text, headers and body (`data`), see `CopyleaksErrorResponse`. */
  public readonly response?: CopyleaksErrorResponse;

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
