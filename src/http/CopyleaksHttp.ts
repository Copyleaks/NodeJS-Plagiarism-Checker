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

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as http from 'http';
import * as https from 'https';

import { CopyleaksConfig } from '../app.config.js';
import { CommandException, NetworkException, RateLimitException, UnderMaintenanceException } from '../models/exceptions/index.js';
import { retryAfterSeconds, toCopyleaksErrorResponse } from '../models/exceptions/CopyleaksErrorResponse.js';
import { CopyleaksAuthToken } from '../models/response/CopyleaksAuthToken.js';
import { isRateLimitResponse, isSuccessStatusCode, isUnderMaintenanceResponse } from '../utils/status-code.utils.js';
import { CopyleaksOptions } from './CopyleaksOptions.js';

/** Default time limit for each request, in milliseconds (2 minutes). */
export const DEFAULT_TIMEOUT_MS = 120000;
/** Default largest number of open sockets per host. */
export const DEFAULT_MAX_SOCKETS = 50;
const DEFAULT_RETRY_DELAY_MS = 1000;
const DEFAULT_MAX_RETRY_DELAY_MS = 30000;
/** Idle keep-alive sockets are closed after this time, so a socket that the server may have closed is not reused. */
const IDLE_SOCKET_TIMEOUT_MS = 5000;

/** Connection errors where the request never reached the server, so any request can be retried. */
const NOT_SENT_ERROR_CODES = new Set(['ECONNREFUSED', 'ENOTFOUND', 'EAI_AGAIN', 'EHOSTUNREACH', 'ENETUNREACH']);
/** Errors after which an idempotent (GET) request can be retried. */
const IDEMPOTENT_RETRY_ERROR_CODES = new Set([
  ...NOT_SENT_ERROR_CODES, 'ECONNRESET', 'ECONNABORTED', 'ETIMEDOUT', 'EPIPE', 'ERR_SOCKET_CONNECTION_TIMEOUT',
]);

let sharedAxiosInstance: AxiosInstance | undefined;

/**
 * Creates an axios instance with keep-alive agents and the default timeout.
 * @internal
 */
export function createAxiosInstance(options: CopyleaksOptions = {}): AxiosInstance {
  const maxSockets = options.maxSockets ?? DEFAULT_MAX_SOCKETS;
  return axios.create({
    timeout: options.timeout ?? DEFAULT_TIMEOUT_MS,
    httpAgent: options.httpAgent ?? new http.Agent({ keepAlive: true, maxSockets, timeout: IDLE_SOCKET_TIMEOUT_MS }),
    httpsAgent: options.httpsAgent ?? new https.Agent({ keepAlive: true, maxSockets, timeout: IDLE_SOCKET_TIMEOUT_MS }),
    validateStatus: () => true,
  });
}

/**
 * The axios instance for a set of options. Without connection options, every client in the
 * process shares one instance, and so one keep-alive connection pool.
 * @internal
 */
export function resolveAxiosInstance(options?: CopyleaksOptions): AxiosInstance {
  if (options?.axiosInstance) {
    return options.axiosInstance;
  }
  if (options && (options.maxSockets !== undefined || options.httpAgent || options.httpsAgent)) {
    return createAxiosInstance(options);
  }
  if (!sharedAxiosInstance) {
    sharedAxiosInstance = createAxiosInstance();
  }
  return sharedAxiosInstance;
}

/**
 * Options that share one resolved axios instance, so that `Copyleaks` and its product clients
 * use the same connection pool.
 * @internal
 */
export function withResolvedAxiosInstance(options?: CopyleaksOptions): CopyleaksOptions {
  return { ...options, axiosInstance: resolveAxiosInstance(options) };
}

/** @internal */
export interface CopyleaksHttpRequest {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH';
  /** Full URL. */
  url: string;
  /** Sends `Authorization: Bearer <token>` when set. */
  authToken?: CopyleaksAuthToken;
  /** JSON body, or a FormData for multipart requests. */
  body?: unknown;
  /** Sends `Content-Type: application/json`. Default: true when `body` is set and is not a FormData. */
  json?: boolean;
  /** Query string parameters. */
  params?: Record<string, string>;
  /** `text` returns the body as a string without trying to parse it as JSON. */
  responseType?: 'json' | 'text';
}

/**
 * Sends the SDK's HTTP requests: shared keep-alive connections, a time limit, optional retries,
 * and errors mapped to the SDK exceptions.
 * @internal
 */
export class CopyleaksHttp {
  private readonly axiosInstance: AxiosInstance;
  private readonly options: CopyleaksOptions;

  constructor(options?: CopyleaksOptions) {
    this.options = options ?? {};
    this.axiosInstance = resolveAxiosInstance(this.options);
  }

  /** Full URL on the API server. */
  public apiUrl(path: string): string {
    return `${this.options.apiServerUri ?? CopyleaksConfig.API_SERVER_URI}${path}`;
  }

  /** Full URL on the identity server. */
  public identityUrl(path: string): string {
    return `${this.options.identityServerUri ?? CopyleaksConfig.IDENTITY_SERVER_URI}${path}`;
  }

  /**
   * Sends the request and returns the successful (2xx) response.
   * @throws {UnderMaintenanceException} HTTP 503.
   * @throws {RateLimitException} HTTP 429.
   * @throws {CommandException} Any other non-2xx status.
   * @throws {NetworkException} No HTTP response (timeout, connection error).
   */
  public async request<T>(request: CopyleaksHttpRequest): Promise<AxiosResponse<T>> {
    const maxRetries = Math.max(0, this.options.maxRetries ?? 0);
    for (let attempt = 0; ; attempt++) {
      let response: AxiosResponse<T>;
      try {
        response = await this.axiosInstance.request<T>(this.buildConfig(request));
      } catch (error) {
        // A custom axios instance (for example an interceptor) can still reject with an HTTP response.
        const rejected = (error as { response?: AxiosResponse } | undefined)?.response;
        if (rejected && typeof rejected.status === 'number') {
          throw toApiException(rejected);
        }
        const exception = toNetworkException(error, request);
        if (attempt < maxRetries && isRetryableNetworkError(exception, request.method)) {
          await sleep(this.backoffDelay(attempt));
          continue;
        }
        throw exception;
      }

      if (isSuccessStatusCode(response.status)) {
        return response;
      }
      if (attempt < maxRetries && (isRateLimitResponse(response.status) || isUnderMaintenanceResponse(response.status))) {
        const retryAfter = retryAfterSeconds(toCopyleaksErrorResponse(response));
        const delay = retryAfter !== undefined ? retryAfter * 1000 : this.backoffDelay(attempt);
        if (isRetryableResponse(response.status, request.method, retryAfter) && delay <= this.maxRetryDelay()) {
          await sleep(delay);
          continue;
        }
      }
      throw toApiException(response);
    }
  }

  private buildConfig(request: CopyleaksHttpRequest): AxiosRequestConfig {
    const headers: Record<string, string> = { 'User-Agent': CopyleaksConfig.USER_AGENT };
    const isForm = isFormData(request.body);
    if (request.json ?? (request.body !== undefined && !isForm)) {
      headers['Content-Type'] = 'application/json';
    }
    if (request.authToken) {
      headers.Authorization = `Bearer ${request.authToken.access_token}`;
    }
    const config: AxiosRequestConfig = {
      method: request.method,
      url: request.url,
      headers,
      data: request.body,
      params: request.params,
      validateStatus: () => true,
    };
    if (request.responseType === 'text') {
      config.responseType = 'text';
    }
    if (this.options.timeout !== undefined) {
      config.timeout = this.options.timeout;
    }
    return config;
  }

  private maxRetryDelay(): number {
    return this.options.maxRetryDelay ?? DEFAULT_MAX_RETRY_DELAY_MS;
  }

  private backoffDelay(attempt: number): number {
    const base = this.options.retryDelay ?? DEFAULT_RETRY_DELAY_MS;
    return Math.min(this.maxRetryDelay(), base * Math.pow(2, attempt));
  }
}

function isFormData(value: unknown): boolean {
  return typeof FormData !== 'undefined' && value instanceof FormData;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toApiException(response: AxiosResponse): Error {
  if (isUnderMaintenanceResponse(response.status)) {
    return new UnderMaintenanceException(response);
  }
  if (isRateLimitResponse(response.status)) {
    return new RateLimitException(response);
  }
  return new CommandException(response);
}

/**
 * Turns an axios error into a NetworkException that keeps only the code, the method and the URL.
 * The axios error itself holds the request headers, including the bearer token, so it is dropped.
 */
function toNetworkException(error: unknown, request: CopyleaksHttpRequest): NetworkException {
  const raw = (error && typeof error === 'object' ? error : {}) as { code?: unknown; message?: unknown };
  const code = typeof raw.code === 'string' ? raw.code : undefined;
  const reason = typeof raw.message === 'string' && raw.message ? raw.message : String(error);
  const isTimeout = code === 'ECONNABORTED' || code === 'ETIMEDOUT' || /timeout/i.test(reason);
  return new NetworkException(`${request.method} ${request.url} failed: ${reason}`, {
    code,
    isTimeout,
    method: request.method,
    url: request.url,
  });
}

/**
 * HTTP 429 is retried for every request. HTTP 503 is retried for GET requests, and for other requests
 * only with `Retry-After` (maintenance): a 503 without it can come from a proxy after the server
 * already accepted the request and charged credits.
 */
function isRetryableResponse(status: number, method: CopyleaksHttpRequest['method'], retryAfter: number | undefined): boolean {
  if (isRateLimitResponse(status)) {
    return true;
  }
  return isUnderMaintenanceResponse(status) && (method === 'GET' || retryAfter !== undefined);
}

function isRetryableNetworkError(exception: NetworkException, method: CopyleaksHttpRequest['method']): boolean {
  if (!exception.code) {
    return false;
  }
  if (method === 'GET') {
    return IDEMPOTENT_RETRY_ERROR_CODES.has(exception.code);
  }
  return NOT_SENT_ERROR_CODES.has(exception.code);
}
