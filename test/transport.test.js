'use strict';
// HTTP layer: shared keep-alive connections, timeouts, retries, error mapping and token safety.
const { test, describe, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const util = require('node:util');
const axios = require('axios');
const { startMockServer, validToken, guardNetwork } = require('./helpers/mock-server');
const {
  Copyleaks, CopyleaksConfig, AIDetectionClient, CommandException, RateLimitException,
  UnderMaintenanceException, NetworkException, AuthExipredException, CopyleaksNaturalLanguageSubmissionModel,
  CopyleaksApiException,
} = require('../dist');

guardNetwork(CopyleaksConfig);
const TOKEN = validToken('secret-token-value-xyz');
const TEXT = 'Lions are social animals. '.repeat(12);

describe('transport', () => {
  let server;
  let copyleaks;

  before(async () => { server = await startMockServer(); });
  after(async () => { await server.close(); });
  beforeEach(() => {
    server.reset();
    copyleaks = new Copyleaks({ apiServerUri: server.url, identityServerUri: server.url });
  });

  test('loginAsync posts the credentials as JSON with the SDK User-Agent and no Authorization header', async () => {
    server.reply(() => ({ body: { access_token: 'abc', '.issued': 'x', '.expires': 'y' } }));
    const token = await copyleaks.loginAsync('user@example.com', 'api-key');
    assert.deepEqual(token, { access_token: 'abc', '.issued': 'x', '.expires': 'y' });
    const req = server.last;
    assert.equal(req.method, 'POST');
    assert.equal(req.url, '/v3/account/login/api');
    assert.equal(req.headers['user-agent'], 'node-sdk/7.0.0');
    assert.equal(req.headers['content-type'], 'application/json');
    assert.equal(req.headers.authorization, undefined);
    assert.deepEqual(req.json, { email: 'user@example.com', key: 'api-key' });
  });

  test('the User-Agent carries the package version', () => {
    const pkg = require('../package.json');
    assert.equal(CopyleaksConfig.USER_AGENT, `node-sdk/${pkg.version}`);
  });

  test('an API error throws CommandException with status and body, and the token is not in it', async () => {
    server.reply(() => ({ status: 400, body: { error: 'scanId is invalid' } }));
    const err = await copyleaks.submitUrlAsync(TOKEN, 'scan1', { url: 'https://example.com', properties: { webhooks: { status: 'https://example.com/{STATUS}' } } })
      .then(() => assert.fail('expected an error'), (e) => e);
    assert.ok(err instanceof CommandException, `got ${err && err.name}`);
    assert.ok(err instanceof CopyleaksApiException);
    assert.equal(err.name, 'CommandException');
    assert.equal(err.status, 400);
    assert.deepEqual(err.body, { error: 'scanId is invalid' });
    assert.equal(err.response.status, 400);
    assert.deepEqual(err.response.data, { error: 'scanId is invalid' });
    assert.match(err.message, /HTTP 400 Bad Request: \{"error":"scanId is invalid"\}/);
    for (const dump of [util.inspect(err, { depth: 20, showHidden: true }), JSON.stringify(err), String(err.stack)]) {
      assert.ok(!dump.includes(TOKEN.access_token), 'the bearer token leaked into the error');
    }
    assert.equal(err.config, undefined);
    assert.equal(err.request, undefined);
  });

  test('HTTP 401, 402, 404 and 409 throw CommandException', async () => {
    for (const status of [401, 402, 404, 409]) {
      server.reply(() => ({ status, body: 'nope' }));
      const err = await copyleaks.getCreditsBalanceAsync(TOKEN).catch((e) => e);
      assert.ok(err instanceof CommandException, `HTTP ${status} gave ${err && err.name}`);
      assert.equal(err.status, status);
      assert.equal(err.body, 'nope');
    }
  });

  test('HTTP 429 throws RateLimitException with retryAfter on every endpoint', async () => {
    server.reply(() => ({ status: 429, headers: { 'retry-after': '42' }, body: { error: 'Rate limit exceeded.' } }));
    const calls = [
      () => copyleaks.loginAsync('a@b.c', 'k'),
      () => copyleaks.submitFileAsync(TOKEN, 'scan1', { base64: 'aGk=', filename: 'a.txt', properties: { webhooks: { status: 'x' } } }),
      () => copyleaks.aiDetectionClient.submitNaturalTextAsync(TOKEN, 'scan1', new CopyleaksNaturalLanguageSubmissionModel(TEXT)),
      () => copyleaks.writingAssistantClient.getCorrectionTypesAsync(TOKEN, 'en'),
      () => copyleaks.getReleaseNotesAsync(),
    ];
    for (const call of calls) {
      const err = await call().catch((e) => e);
      assert.ok(err instanceof RateLimitException, `got ${err && err.name}`);
      assert.ok(err instanceof CopyleaksApiException);
      assert.equal(err.status, 429);
      assert.equal(err.retryAfter, 42);
      assert.deepEqual(err.body, { error: 'Rate limit exceeded.' });
      assert.ok(!util.inspect(err, { depth: 20 }).includes(TOKEN.access_token));
    }
  });

  test('HTTP 503 throws UnderMaintenanceException', async () => {
    server.reply(() => ({ status: 503, body: { message: 'maintenance' } }));
    const err = await copyleaks.getOCRSupportedLanguagesAsync().catch((e) => e);
    assert.ok(err instanceof UnderMaintenanceException, `got ${err && err.name}`);
    assert.ok(err instanceof CopyleaksApiException);
    assert.equal(err.status, 503);
    assert.deepEqual(err.body, { message: 'maintenance' });
  });

  test('an expired token throws AuthExipredException without sending a request', async () => {
    const expired = { access_token: 'x', '.issued': '', '.expires': new Date(Date.now() - 1000).toISOString() };
    await assert.rejects(copyleaks.getCreditsBalanceAsync(expired), AuthExipredException);
    await assert.rejects(copyleaks.aiDetectionClient.getCreditsBalanceAsync(expired), AuthExipredException);
    assert.equal(server.requests.length, 0);
  });

  test('a request that hits the timeout throws NetworkException without the token', async () => {
    const fast = new Copyleaks({ apiServerUri: server.url, timeout: 50 });
    server.reply(() => ({ delayMs: 400, body: {} }));
    const err = await fast.getCreditsBalanceAsync(TOKEN).catch((e) => e);
    assert.ok(err instanceof NetworkException, `got ${err && err.name}: ${err && err.message}`);
    assert.ok(!(err instanceof CopyleaksApiException));
    assert.equal(err.isTimeout, true);
    assert.equal(err.method, 'GET');
    assert.equal(err.url, `${server.url}/v3/scans/credits`);
    assert.ok(!util.inspect(err, { depth: 20, showHidden: true }).includes(TOKEN.access_token));
  });

  test('a connection error throws NetworkException with the error code', async () => {
    const closed = await startMockServer();
    const deadUrl = closed.url;
    await closed.close();
    const offline = new Copyleaks({ apiServerUri: deadUrl });
    const err = await offline.getCreditsBalanceAsync(TOKEN).catch((e) => e);
    assert.ok(err instanceof NetworkException, `got ${err && err.name}`);
    assert.equal(err.code, 'ECONNREFUSED');
    assert.equal(err.isTimeout, false);
  });

  test('requests reuse keep-alive connections, also across the product clients', async () => {
    await copyleaks.getReleaseNotesAsync();
    await copyleaks.getSupportedFileTypesAsync();
    await copyleaks.aiDetectionClient.getCreditsBalanceAsync(TOKEN);
    await copyleaks.writingAssistantClient.getCorrectionTypesAsync(TOKEN, 'en');
    const ports = new Set(server.requests.map((r) => r.remotePort));
    assert.equal(ports.size, 1, `expected one reused socket, got ports ${[...ports].join(',')}`);
    assert.ok(server.requests.every((r) => r.headers.connection === 'keep-alive'));
  });

  test('the default keep-alive agents close sockets that are idle for 5 seconds', () => {
    const { createAxiosInstance } = require('../dist/http/CopyleaksHttp');
    const { httpAgent, httpsAgent } = createAxiosInstance().defaults;
    for (const agent of [httpAgent, httpsAgent]) {
      assert.equal(agent.keepAlive, true);
      assert.equal(agent.options.timeout, 5000);
    }
  });

  test('clients created on their own share the default connection pool', async () => {
    const first = new AIDetectionClient({ apiServerUri: server.url });
    const second = new AIDetectionClient({ apiServerUri: server.url });
    await first.getCreditsBalanceAsync(TOKEN);
    await second.getCreditsBalanceAsync(TOKEN);
    assert.equal(new Set(server.requests.map((r) => r.remotePort)).size, 1);
  });

  test('apiServerUri and identityServerUri are per instance', async () => {
    const other = await startMockServer();
    try {
      const a = new Copyleaks({ apiServerUri: server.url, identityServerUri: other.url });
      await a.getReleaseNotesAsync();
      await a.loginAsync('a@b.c', 'k');
      assert.equal(server.requests.length, 1);
      assert.equal(server.last.url, '/v3/release-logs.json');
      assert.equal(other.requests.length, 1);
      assert.equal(other.last.url, '/v3/account/login/api');
    } finally {
      await other.close();
    }
  });

  test('CopyleaksConfig.API_SERVER_URI still applies when no apiServerUri option is set', async () => {
    const previous = CopyleaksConfig.API_SERVER_URI;
    CopyleaksConfig.API_SERVER_URI = server.url;
    try {
      await new Copyleaks().getOCRSupportedLanguagesAsync();
      assert.equal(server.last.url, '/v3/miscellaneous/ocr-languages-list');
    } finally {
      CopyleaksConfig.API_SERVER_URI = previous;
    }
  });

  test('a custom axios instance is used, and errors are still mapped', async () => {
    const instance = axios.create();
    instance.interceptors.request.use((config) => { config.headers['x-from-interceptor'] = 'yes'; return config; });
    const custom = new Copyleaks({ apiServerUri: server.url, axiosInstance: instance });
    await custom.getReleaseNotesAsync();
    assert.equal(server.last.headers['x-from-interceptor'], 'yes');
    server.reply(() => ({ status: 409, body: { error: 'conflict' } }));
    await assert.rejects(custom.getReleaseNotesAsync(), (e) => e instanceof CommandException && e.status === 409);
  });

  test('an HTTP error raised by a custom axios instance is still mapped, without the token', async () => {
    const instance = axios.create();
    instance.interceptors.response.use((response) => {
      if (response.status >= 400) {
        const error = new axios.AxiosError('rejected by interceptor', 'ERR_BAD_REQUEST', response.config, response.request, response);
        return Promise.reject(error);
      }
      return response;
    });
    const custom = new Copyleaks({ apiServerUri: server.url, axiosInstance: instance });
    server.reply(() => ({ status: 429, headers: { 'retry-after': '5' }, body: { error: 'slow down' } }));
    const err = await custom.getCreditsBalanceAsync(TOKEN).catch((e) => e);
    assert.ok(err instanceof RateLimitException, `got ${err && err.name}`);
    assert.equal(err.retryAfter, 5);
    assert.ok(!util.inspect(err, { depth: 20, showHidden: true }).includes(TOKEN.access_token));
  });

  test('custom agents are used', async () => {
    const http = require('node:http');
    const agent = new http.Agent({ keepAlive: false });
    let used = 0;
    const original = agent.createConnection.bind(agent);
    agent.createConnection = (...args) => { used++; return original(...args); };
    const custom = new Copyleaks({ apiServerUri: server.url, httpAgent: agent });
    await custom.getReleaseNotesAsync();
    assert.equal(used, 1);
  });

  describe('retries', () => {
    test('are off by default', async () => {
      server.reply(() => ({ status: 429, body: {} }));
      await assert.rejects(copyleaks.getReleaseNotesAsync(), RateLimitException);
      assert.equal(server.requests.length, 1);
    });

    test('retry HTTP 429 and 503 up to maxRetries, honoring Retry-After', async () => {
      const retrying = new Copyleaks({ apiServerUri: server.url, maxRetries: 2, retryDelay: 1 });
      server.reply((req, i) => (i === 0 ? { status: 429, headers: { 'retry-after': '0' } } : i === 1 ? { status: 503 } : { body: ['en'] }));
      const languages = await retrying.getOCRSupportedLanguagesAsync();
      assert.deepEqual(languages, ['en']);
      assert.equal(server.requests.length, 3);
    });

    test('retry a credit-charging POST after HTTP 429', async () => {
      const retrying = new Copyleaks({ apiServerUri: server.url, maxRetries: 1, retryDelay: 1 });
      server.reply((req, i) => (i === 0 ? { status: 429 } : { body: { summary: { human: 1, ai: 0 } } }));
      const result = await retrying.aiDetectionClient.submitNaturalTextAsync(TOKEN, 'scan1', new CopyleaksNaturalLanguageSubmissionModel(TEXT, true));
      assert.equal(result.summary.human, 1);
      assert.equal(server.requests.length, 2);
      assert.deepEqual(server.requests[0].json, server.requests[1].json);
    });

    test('do not retry a POST or PUT after HTTP 503 without Retry-After, because it may have been processed', async () => {
      const retrying = new Copyleaks({ apiServerUri: server.url, maxRetries: 2, retryDelay: 1 });
      server.reply(() => ({ status: 503 }));
      await assert.rejects(retrying.aiDetectionClient.submitNaturalTextAsync(TOKEN, 'scan1', new CopyleaksNaturalLanguageSubmissionModel(TEXT, true)), UnderMaintenanceException);
      await assert.rejects(retrying.submitFileAsync(TOKEN, 'scan1', { base64: 'aGk=', filename: 'a.txt', properties: { webhooks: { status: 'x' } } }), UnderMaintenanceException);
      assert.deepEqual(server.requests.map((r) => r.method), ['POST', 'PUT']);
    });

    test('retry a POST or PUT after HTTP 503 with Retry-After', async () => {
      const retrying = new Copyleaks({ apiServerUri: server.url, maxRetries: 1, retryDelay: 1 });
      server.reply((req, i) => (i % 2 === 0 ? { status: 503, headers: { 'retry-after': '0' } } : { body: { summary: { human: 1, ai: 0 } } }));
      const result = await retrying.aiDetectionClient.submitNaturalTextAsync(TOKEN, 'scan1', new CopyleaksNaturalLanguageSubmissionModel(TEXT, true));
      assert.equal(result.summary.human, 1);
      await retrying.submitFileAsync(TOKEN, 'scan1', { base64: 'aGk=', filename: 'a.txt', properties: { webhooks: { status: 'x' } } });
      assert.deepEqual(server.requests.map((r) => r.method), ['POST', 'POST', 'PUT', 'PUT']);
    });

    test('give up after maxRetries and throw the last error', async () => {
      const retrying = new Copyleaks({ apiServerUri: server.url, maxRetries: 2, retryDelay: 1 });
      server.reply(() => ({ status: 503 }));
      await assert.rejects(retrying.getReleaseNotesAsync(), UnderMaintenanceException);
      assert.equal(server.requests.length, 3);
    });

    test('do not retry when Retry-After is longer than maxRetryDelay', async () => {
      const retrying = new Copyleaks({ apiServerUri: server.url, identityServerUri: server.url, maxRetries: 3, retryDelay: 1, maxRetryDelay: 1000 });
      server.reply(() => ({ status: 429, headers: { 'retry-after': '300' } }));
      const err = await retrying.loginAsync('a@b.c', 'k').catch((e) => e);
      assert.ok(err instanceof RateLimitException);
      assert.equal(err.retryAfter, 300);
      assert.equal(server.requests.length, 1);
    });

    test('never retry a POST after a timeout, because it may have been processed', async () => {
      const retrying = new Copyleaks({ apiServerUri: server.url, maxRetries: 3, retryDelay: 1, timeout: 50 });
      server.reply(() => ({ delayMs: 300 }));
      const err = await retrying.aiDetectionClient.submitNaturalTextAsync(TOKEN, 'scan1', new CopyleaksNaturalLanguageSubmissionModel(TEXT, true)).catch((e) => e);
      assert.ok(err instanceof NetworkException && err.isTimeout);
      await new Promise((resolve) => setTimeout(resolve, 100));
      assert.equal(server.requests.length, 1);
    });

    test('retry a GET after a timeout', async () => {
      const retrying = new Copyleaks({ apiServerUri: server.url, maxRetries: 1, retryDelay: 1, timeout: 100 });
      server.reply((req, i) => (i === 0 ? { delayMs: 400, body: ['late'] } : { body: ['en'] }));
      assert.deepEqual(await retrying.getOCRSupportedLanguagesAsync(), ['en']);
      assert.equal(server.requests.length, 2);
    });

    test('retry any request when the connection was refused', async () => {
      const closed = await startMockServer();
      const deadUrl = closed.url;
      await closed.close();
      const instance = axios.create();
      let attempts = 0;
      instance.interceptors.request.use((config) => { attempts++; return config; });
      const retrying = new Copyleaks({ apiServerUri: deadUrl, axiosInstance: instance, maxRetries: 2, retryDelay: 1 });
      const err = await retrying.aiDetectionClient.submitNaturalTextAsync(TOKEN, 'scan1', new CopyleaksNaturalLanguageSubmissionModel(TEXT, true)).catch((e) => e);
      assert.ok(err instanceof NetworkException);
      assert.equal(err.code, 'ECONNREFUSED');
      assert.equal(attempts, 3);
    });
  });
});
