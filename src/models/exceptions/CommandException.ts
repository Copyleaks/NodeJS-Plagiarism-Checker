import { CopyleaksApiException } from './CopyleaksApiException.js';
import { describeErrorResponse, toCopyleaksErrorResponse } from './CopyleaksErrorResponse.js';

/**
 * The Copyleaks API rejected the request, for example with HTTP 400, 401, 402, 403, 404 or 409.
 * HTTP 429 throws `RateLimitException` and HTTP 503 throws `UnderMaintenanceException` instead.
 * The message contains the HTTP status and the response body.
 */
export class CommandException extends CopyleaksApiException {
  /**
   * @param response The HTTP response of the failed call, or an error message.
   */
  constructor(response?: unknown) {
    const details = toCopyleaksErrorResponse(response);
    super('CommandException', details
      ? describeErrorResponse('Copyleaks API error', details)
      : (typeof response === 'string' ? response : 'Copyleaks API error'), details);
  }
}
