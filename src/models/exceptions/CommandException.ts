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
  /** The response: status, status text, headers and body (`data`), see `CopyleaksErrorResponse`. */
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
