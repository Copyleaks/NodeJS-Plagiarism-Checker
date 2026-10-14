'use strict';
// Lookup endpoints: allowed cross-languages, AI text detection file types and Private Cloud Hub repository info.
const { test, describe, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const { startMockServer, validToken, guardNetwork, assertSdkHeaders } = require('./helpers/mock-server');
const { Copyleaks, CopyleaksConfig, CommandException, AuthExipredException } = require('../dist');

guardNetwork(CopyleaksConfig);
const TOKEN = validToken();

describe('lookups', () => {
  let server;
  let copyleaks;

  before(async () => { server = await startMockServer(); });
  after(async () => { await server.close(); });
  beforeEach(() => {
    server.reset();
    copyleaks = new Copyleaks({ apiServerUri: server.url, identityServerUri: server.url });
  });

  test('getAllowedCrossLanguagesAsync: GET /v3/miscellaneous/allowed-cross-languages, public', async () => {
    const body = { documentLanguages: ['da', 'en'], resultLanguages: ['sq', 'vi'] };
    server.reply(() => ({ body }));
    assert.deepEqual(await copyleaks.getAllowedCrossLanguagesAsync(), body);
    const req = server.last;
    assert.equal(req.method, 'GET');
    assert.equal(req.url, '/v3/miscellaneous/allowed-cross-languages');
    assertSdkHeaders(assert, req, { token: undefined, contentType: undefined });
    assert.equal(req.body.length, 0);
  });

  test('getSupportedAiTextDetectionFileTypesAsync: GET /v3/miscellaneous/supported-ai-text-detection-file-types, public', async () => {
    const body = { supportedAiFileTypes: ['pdf', 'docx', 'LaTeX'] };
    server.reply(() => ({ body }));
    assert.deepEqual(await copyleaks.getSupportedAiTextDetectionFileTypesAsync(), body);
    const req = server.last;
    assert.equal(req.method, 'GET');
    assert.equal(req.url, '/v3/miscellaneous/supported-ai-text-detection-file-types');
    assertSdkHeaders(assert, req, { token: undefined, contentType: undefined });
  });

  test('getRepositoryInfoAsync: GET /v3/repositories/repository/{repositoryId}/info', async () => {
    const body = {
      id: 'my-repo-123', name: 'Hub', description: 'Desc', permission: 4, status: 0,
      maxCredits: 1000, currentCredits: 10, maskingPolicy: 0, creationTime: '2024-09-09T10:43:52',
    };
    server.reply(() => ({ body }));
    assert.deepEqual(await copyleaks.getRepositoryInfoAsync(TOKEN, 'my-repo-123'), body);
    const req = server.last;
    assert.equal(req.method, 'GET');
    assert.equal(req.url, '/v3/repositories/repository/my-repo-123/info');
    assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: undefined });
  });

  test('getRepositoryInfoAsync encodes the repository id in the path', async () => {
    await copyleaks.getRepositoryInfoAsync(TOKEN, 'a/b c');
    assert.equal(server.last.url, '/v3/repositories/repository/a%2Fb%20c/info');
  });

  test('getRepositoryInfoAsync maps a 403 to CommandException and checks the token first', async () => {
    server.reply(() => ({ status: 403, body: { error: 'Admin role required' } }));
    await assert.rejects(copyleaks.getRepositoryInfoAsync(TOKEN, 'repo'), (e) => e instanceof CommandException && e.status === 403);
    const expired = { access_token: 'x', '.issued': '', '.expires': new Date(0).toISOString() };
    await assert.rejects(copyleaks.getRepositoryInfoAsync(expired, 'repo'), AuthExipredException);
  });
});
