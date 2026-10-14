/*
 The MIT License(MIT)

 Copyright(c) 2016 Copyleaks LTD (https://copyleaks.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/


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
