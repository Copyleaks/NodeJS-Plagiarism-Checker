import { CopyleaksApiException } from './CopyleaksApiException.js';
import { retryAfterSeconds, toCopyleaksErrorResponse } from './CopyleaksErrorResponse.js';

/**
 * Copyleaks is under maintenance: the API answered with HTTP 503.
 * Retry later, ideally with exponential backoff.
 */
export class UnderMaintenanceException extends CopyleaksApiException {
  /** Seconds to wait before the next call, from the `Retry-After` header. Undefined when the server did not send it. */
  public readonly retryAfter?: number;

  constructor(response?: unknown) {
    const details = toCopyleaksErrorResponse(response);
    super('UnderMaintenanceException', 'Copyleaks is Under Maintenance, please visit https://status.copyleaks.com', details);
    if (details) {
      this.retryAfter = retryAfterSeconds(details);
    }
  }
}
