import { CopyleaksErrorResponse, parseErrorEnvelope } from './CopyleaksErrorResponse.js';
import type { ErrorDetailsModel } from '../submissions/webhooks/helperModels/errorModels/errorModel.js';

/**
 * Base class of the errors thrown for an HTTP error response of the Copyleaks API:
 * `CommandException`, `RateLimitException` and `UnderMaintenanceException`.
 * When the body is the Copyleaks error object, `{ "error": { "type", "id", "code", "message", "url", "details" } }`,
 * its fields are also available as `errorType`, `errorId`, `errorCode`, `errorMessage`, `errorUrl` and `errorDetails`.
 */
export abstract class CopyleaksApiException extends Error {
  /** HTTP status code of the response, for example 400. */
  public readonly status?: number;
  /** Response body: the parsed JSON when the server sent JSON, otherwise the text. */
  public readonly body?: unknown;
  /** The response: status, status text, headers and body (`data`), see `CopyleaksErrorResponse`. */
  public readonly response?: CopyleaksErrorResponse;
  /** `error.type` of the response, for example "invalid_request_error" (see `CopyleaksErrorTypes`). Undefined when not sent. */
  public readonly errorType?: string;
  /** `error.id`, a machine-readable identifier such as "missing_parameter". Undefined when not sent. */
  public readonly errorId?: string;
  /** Numeric `error.code`. Undefined when not sent or not an integer. */
  public readonly errorCode?: number;
  /** `error.message`, a readable description of the error. Undefined when not sent. */
  public readonly errorMessage?: string;
  /** `error.url`, the documentation page of the error. Undefined when not sent. */
  public readonly errorUrl?: string;
  /** `error.details`: the request parameters that caused the error. Empty when not sent. */
  public readonly errorDetails: ErrorDetailsModel[] = [];

  protected constructor(name: string, message: string, response: CopyleaksErrorResponse | undefined) {
    super(message);
    this.name = name;
    if (response) {
      this.status = response.status;
      this.body = response.data;
      this.response = response;
      const error = parseErrorEnvelope(response.data);
      if (error) {
        this.errorType = error.type;
        this.errorId = error.id;
        this.errorCode = error.code;
        this.errorMessage = error.message;
        this.errorUrl = error.url;
        this.errorDetails = error.details;
      }
    }
  }
}
