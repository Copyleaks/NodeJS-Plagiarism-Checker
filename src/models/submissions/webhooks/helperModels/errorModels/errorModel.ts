export class ErrorModel {
  /** For example "invalid_request_error", "payment_error" or "api_error". */
  type?: string;
  /** Machine-readable error id, for example "insufficient_credits". */
  id?: string;
  /** Numeric code of the failure reason. */
  code?: number;
  message?: string;
  /** Documentation page of this error. */
  url?: string;
  /** The request parameters that caused the error. */
  details?: ErrorDetailsModel[];

  constructor(init?: Partial<ErrorModel>) {
    Object.assign(this, init);
  }
}

/** A request parameter that caused an error, in `ErrorModel.details`. */
export interface ErrorDetailsModel {
  param?: string;
  /** What is wrong with the parameter. */
  message?: string;
}
