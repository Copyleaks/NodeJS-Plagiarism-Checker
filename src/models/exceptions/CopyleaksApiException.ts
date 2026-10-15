import { CopyleaksErrorResponse } from './CopyleaksErrorResponse.js';

/**
 * Base class of the errors thrown for an HTTP error response of the Copyleaks API:
 * `CommandException`, `RateLimitException` and `UnderMaintenanceException`.
 */
export abstract class CopyleaksApiException extends Error {
  /** HTTP status code of the response, for example 400. */
  public readonly status?: number;
  /** Response body: the parsed JSON when the server sent JSON, otherwise the text. */
  public readonly body?: unknown;
  /** The response: status, status text, headers and body (`data`), see `CopyleaksErrorResponse`. */
  public readonly response?: CopyleaksErrorResponse;

  protected constructor(name: string, message: string, response: CopyleaksErrorResponse | undefined) {
    super(message);
    this.name = name;
    if (response) {
      this.status = response.status;
      this.body = response.data;
      this.response = response;
    }
  }
}
