import type { ErrorDetailsModel } from '../submissions/webhooks/helperModels/errorModels/errorModel.js';

/**
 * The HTTP response of a failed Copyleaks API call, as carried by `CommandException`,
 * `RateLimitException` and `UnderMaintenanceException`.
 * It never contains request details, so the `Authorization` header and your token are not included.
 */
export interface CopyleaksErrorResponse {
  /** HTTP status code, for example 400. */
  status: number;
  /** HTTP status text, for example "Bad Request". */
  statusText: string;
  /** Response headers, with lowercase names. */
  headers: Record<string, string>;
  /** Response body: the parsed JSON when the server sent JSON, otherwise the text. */
  data: unknown;
}

const MAX_BODY_IN_MESSAGE = 500;

/**
 * Copies the safe parts of an HTTP response (status, status text, headers and body).
 * Returns undefined when the value does not look like a response.
 * @internal
 */
export function toCopyleaksErrorResponse(response: unknown): CopyleaksErrorResponse | undefined {
  if (!response || typeof response !== 'object') {
    return undefined;
  }
  const raw = response as { status?: unknown; statusText?: unknown; headers?: unknown; data?: unknown };
  if (typeof raw.status !== 'number') {
    return undefined;
  }
  return {
    status: raw.status,
    statusText: typeof raw.statusText === 'string' ? raw.statusText : '',
    headers: plainHeaders(raw.headers),
    data: raw.data,
  };
}

function plainHeaders(headers: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!headers || typeof headers !== 'object') {
    return out;
  }
  const source = typeof (headers as { toJSON?: unknown }).toJSON === 'function'
    ? (headers as { toJSON: () => Record<string, unknown> }).toJSON()
    : headers as Record<string, unknown>;
  for (const [name, value] of Object.entries(source)) {
    if (value === undefined || value === null) {
      continue;
    }
    out[name.toLowerCase()] = Array.isArray(value) ? value.join(', ') : String(value);
  }
  return out;
}

/**
 * Builds an error message such as `Copyleaks API error: HTTP 400 Bad Request: {"error":"..."}`.
 * @internal
 */
export function describeErrorResponse(prefix: string, response: CopyleaksErrorResponse): string {
  let message = `${prefix}: HTTP ${response.status}${response.statusText ? ` ${response.statusText}` : ''}`;
  const body = bodyAsText(response.data);
  if (body) {
    message += `: ${body.length > MAX_BODY_IN_MESSAGE ? `${body.slice(0, MAX_BODY_IN_MESSAGE)}...` : body}`;
  }
  return message;
}

function bodyAsText(data: unknown): string {
  if (data === undefined || data === null || data === '') {
    return '';
  }
  if (typeof data === 'string') {
    return data;
  }
  try {
    return JSON.stringify(data);
  } catch {
    return String(data);
  }
}

/**
 * The `error` object of a Copyleaks API error response, as parsed by `parseErrorEnvelope`.
 * @internal
 */
export interface ParsedErrorEnvelope {
  type?: string;
  id?: string;
  code?: number;
  message?: string;
  url?: string;
  details: ErrorDetailsModel[];
}

/**
 * Reads the `{ "error": { type, id, code, message, url, details } }` envelope of an error response body.
 * Returns undefined when the body is not a JSON object with an `error` object. Never throws.
 * @internal
 */
export function parseErrorEnvelope(data: unknown): ParsedErrorEnvelope | undefined {
  let body = data;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return undefined;
    }
  }
  if (!isJsonObject(body) || !isJsonObject(body.error)) {
    return undefined;
  }
  const error = body.error;
  return {
    type: stringOrUndefined(error.type),
    id: stringOrUndefined(error.id),
    code: integerOrUndefined(error.code),
    message: stringOrUndefined(error.message),
    url: stringOrUndefined(error.url),
    details: Array.isArray(error.details)
      ? error.details.filter(isJsonObject).map((entry) => {
        const detail: ErrorDetailsModel = {};
        if (typeof entry.param === 'string') {
          detail.param = entry.param;
        }
        if (typeof entry.message === 'string') {
          detail.message = entry.message;
        }
        return detail;
      })
      : [],
  };
}

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringOrUndefined(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function integerOrUndefined(value: unknown): number | undefined {
  if (typeof value === 'number') {
    return Number.isSafeInteger(value) ? value : undefined;
  }
  if (typeof value === 'string' && /^\s*[+-]?\d+\s*$/.test(value)) {
    const parsed = Number(value);
    return Number.isSafeInteger(parsed) ? parsed : undefined;
  }
  return undefined;
}

/**
 * Reads the `Retry-After` header (seconds or an HTTP date) as a number of seconds.
 * @internal
 */
export function retryAfterSeconds(response: CopyleaksErrorResponse | undefined): number | undefined {
  const value = response?.headers['retry-after'];
  if (!value) {
    return undefined;
  }
  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return seconds;
  }
  const date = Date.parse(value);
  if (Number.isNaN(date)) {
    return undefined;
  }
  return Math.max(0, Math.ceil((date - Date.now()) / 1000));
}
