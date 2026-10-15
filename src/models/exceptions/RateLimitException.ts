import { CopyleaksApiException } from './CopyleaksApiException.js';
import { retryAfterSeconds, toCopyleaksErrorResponse } from './CopyleaksErrorResponse.js';

/**
 * Too many requests: the Copyleaks API answered with HTTP 429.
 * Wait before you call again. `retryAfter` tells you how long, when the server sends it.
 */
export class RateLimitException extends CopyleaksApiException {
  /** Seconds to wait before the next call, from the `Retry-After` header. Undefined when the server did not send it. */
  public readonly retryAfter?: number;

  constructor(response?: unknown) {
    const details = toCopyleaksErrorResponse(response);
    super('RateLimitException', 'Too many requests. Please wait before calling again.', details);
    if (details) {
      this.retryAfter = retryAfterSeconds(details);
    }
  }
}
