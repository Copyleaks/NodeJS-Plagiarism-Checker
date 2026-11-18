/**
 * The documented values of `error.type` in a Copyleaks API error response,
 * as read by `CopyleaksApiException.errorType` and found in `ErrorModel.type`.
 * The field stays a plain string, so a type added later by the API is kept as sent.
 */
export const CopyleaksErrorTypes = {
  /** Invalid request format, missing parameters or malformed data. */
  INVALID_REQUEST_ERROR: 'invalid_request_error',
  /** Authentication failed, for example invalid credentials or a disabled account. */
  AUTHENTICATION_ERROR: 'authentication_error',
  /** A payment problem, for example insufficient credits or an expired subscription. */
  PAYMENT_ERROR: 'payment_error',
  /** A server-side error, for example an internal error, overload or a timeout. */
  API_ERROR: 'api_error',
} as const;
