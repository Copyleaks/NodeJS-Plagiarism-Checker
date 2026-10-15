import { CopyleaksErrorResponse, retryAfterSeconds, toCopyleaksErrorResponse } from './CopyleaksErrorResponse.js';

/**
 * Copyleaks is under maintenance: the API answered with HTTP 503.
 * Retry later, ideally with exponential backoff.
 */
export class UnderMaintenanceException extends Error {
  /** HTTP status code of the response (503). */
  public readonly status?: number;
  /** Response body: the parsed JSON when the server sent JSON, otherwise the text. */
  public readonly body?: unknown;
  /** Seconds to wait before the next call, from the `Retry-After` header. Undefined when the server did not send it. */
  public readonly retryAfter?: number;
  /** The response: status, status text, headers and body (`data`), see `CopyleaksErrorResponse`. */
  public readonly response?: CopyleaksErrorResponse;

  constructor(response?: unknown) {
    super('Copyleaks is Under Maintenance, please visit https://status.copyleaks.com');
    this.name = 'UnderMaintenanceException';
    const details = toCopyleaksErrorResponse(response);
    if (details) {
      this.status = details.status;
      this.body = details.data;
      this.response = details;
      this.retryAfter = retryAfterSeconds(details);
    }
  }
}
