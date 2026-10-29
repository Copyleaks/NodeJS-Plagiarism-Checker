'use strict';
// Plagiarism Checker (authenticity) endpoints: exact method, path, headers and body.
const { test, describe, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const { startMockServer, validToken, guardNetwork, assertSdkHeaders } = require('./helpers/mock-server');
const {
  Copyleaks, CopyleaksConfig, CopyleaksFileSubmissionModel, CopyleaksURLSubmissionModel, CopyleaksFileOcrSubmissionModel,
  CopyleaksStartRequestModel, CopyleaksStartErrorHandlings, CopyleaksDeleteRequestModel, CopyleaksExportModel,
} = require('../dist');
const { SubmissionActions, PdfReportVersion, MaskingPolicy } = require('../dist/models/submissions/properties');

guardNetwork(CopyleaksConfig);
const TOKEN = validToken();
const JSON_TYPE = 'application/json';
const WEBHOOK = 'https://example.com/webhook/{STATUS}';

// Every documented scan property, with the API's JSON names.
const ALL_PROPERTIES = {
  action: SubmissionActions.CheckCredits,
  includeHtml: true,
  developerPayload: 'payload',
  sandbox: true,
  expiration: 480,
  scanMethodAlgorithm: 1,
  customMetadata: [{ key: 'k', value: 'v' }],
  displayLanguage: 'es',
  scanTimeZone: 'America/New_York',
  sensitivityLevel: 3,
  cheatDetection: true,
  author: { id: 'author-1' },
  course: { id: 'course-1' },
  assignment: { id: 'assignment-1' },
  institution: { id: 'institution-1' },
  webhooks: {
    status: WEBHOOK,
    newResult: 'https://example.com/webhook/new-result',
    newResultHeaders: [['x-new', '1']],
    statusHeaders: [['x-status', '2']],
  },
  filters: {
    identicalEnabled: true, minorChangesEnabled: false, relatedMeaningEnabled: true, minCopiedWords: 5,
    safeSearch: true, domains: ['example.com'], domainsMode: 1, allowSameDomain: true,
  },
  scanning: {
    internet: true,
    exclude: { idPattern: 'abc*', backlinksDomains: ['spam.example'], text: ['lorem ipsum'] },
    include: { idPattern: 'keep*' },
    repositories: [{ id: 'repo-1', includeMySubmissions: true, includeOthersSubmissions: false }],
    copyleaksDb: { includeMySubmissions: true, includeOthersSubmissions: true },
    crossLanguages: { languages: [{ code: 'fr' }, { code: 'es' }] },
  },
  indexing: { repositories: [{ id: 'repo-1', maskingPolicy: MaskingPolicy.MaskAll }], copyleaksDb: true },
  exclude: { quotes: true, citations: true, references: true, tableOfContents: true, titles: true, htmlTemplate: true, documentTemplateIds: ['scan0'] },
  pdf: {
    create: true, title: 'Report', largeLogo: 'aGk=', rtl: false, reportVersion: 'v3',
    colors: { titles: '#040F21', identical: '#FE5758', minorChanges: '#FE8888', relatedMeaning: '#FDD0A3', aiDetection: '#FE5758', writingFeedback: '#FF9A02' },
  },
  aiGeneratedText: { detect: true, sensitivity: 3, explain: { enable: true } },
  aiSourceMatch: { enable: true },
  internalAiSourceMatch: { enable: true },
  references: { validate: true },
  sensitiveDataProtection: {
    driversLicense: true, credentials: true, passport: true, network: true, url: true, emailAddress: true, creditCard: true, phoneNumber: true,
  },
  writingFeedback: { enable: true, score: { grammarScoreWeight: 0, mechanicsScoreWeight: 0.5 } },
  overview: { enable: true, ignoreAIDetection: true, ignorePlagiarismDetection: false, ignoreWritingFeedback: true, ignoreAuthorData: true },
};

describe('authenticity', () => {
  let server;
  let copyleaks;

  before(async () => { server = await startMockServer(); });
  after(async () => { await server.close(); });
  beforeEach(() => {
    server.reset();
    copyleaks = new Copyleaks({ apiServerUri: server.url, identityServerUri: server.url });
  });

  test('submitFileAsync: PUT /v3/scans/submit/file/{scanId} with every documented property', async () => {
    server.reply(() => ({ status: 201, body: {} }));
    const result = await copyleaks.submitFileAsync(TOKEN, 'scan1', new CopyleaksFileSubmissionModel('aGVsbG8=', 'a.txt', ALL_PROPERTIES));
    assert.equal(result, undefined);
    const req = server.last;
    assert.equal(req.method, 'PUT');
    assert.equal(req.url, '/v3/scans/submit/file/scan1');
    assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: JSON_TYPE });
    assert.deepEqual(req.json, { properties: ALL_PROPERTIES, base64: 'aGVsbG8=', filename: 'a.txt' });
  });

  test('submitFileOcrAsync: PUT /v3/scans/submit/ocr/{scanId} with langCode', async () => {
    const props = { sandbox: true, webhooks: { status: WEBHOOK } };
    await copyleaks.submitFileOcrAsync(TOKEN, 'scan2', new CopyleaksFileOcrSubmissionModel('en', 'aW1n', 'a.png', props));
    const req = server.last;
    assert.equal(req.method, 'PUT');
    assert.equal(req.url, '/v3/scans/submit/ocr/scan2');
    assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: JSON_TYPE });
    assert.deepEqual(req.json, { properties: props, base64: 'aW1n', filename: 'a.png', langCode: 'en' });
  });

  test('submitUrlAsync: PUT /v3/scans/submit/url/{scanId} with verb and headers', async () => {
    const props = { sandbox: true, webhooks: { status: WEBHOOK } };
    await copyleaks.submitUrlAsync(TOKEN, 'scan3', new CopyleaksURLSubmissionModel('https://example.com/page', props, 'POST', [['Cookie', 'a=b']]));
    const req = server.last;
    assert.equal(req.method, 'PUT');
    assert.equal(req.url, '/v3/scans/submit/url/scan3');
    assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: JSON_TYPE });
    assert.deepEqual(req.json, { properties: props, url: 'https://example.com/page', verb: 'POST', headers: [['Cookie', 'a=b']] });
  });

  test('submitUrlAsync leaves verb and headers out when they are not set', async () => {
    const props = { webhooks: { status: WEBHOOK } };
    await copyleaks.submitUrlAsync(TOKEN, 'scan3', new CopyleaksURLSubmissionModel('https://example.com', props));
    assert.deepEqual(server.last.json, { properties: props, url: 'https://example.com' });
  });

  test('the PDF title color is sent as "titles"; the deprecated "title" is mapped to it', async () => {
    const props = { webhooks: { status: WEBHOOK }, pdf: { create: true, colors: { title: '#111111', identical: '#222222' } } };
    const submission = new CopyleaksFileSubmissionModel('aGk=', 'a.txt', props);
    await copyleaks.submitFileAsync(TOKEN, 'scan4', submission);
    assert.deepEqual(server.last.json.properties.pdf, { create: true, colors: { identical: '#222222', titles: '#111111' } });
    // The caller's object is not changed.
    assert.deepEqual(submission.properties.pdf.colors, { title: '#111111', identical: '#222222' });

    await copyleaks.submitUrlAsync(TOKEN, 'scan5', new CopyleaksURLSubmissionModel('https://example.com', {
      webhooks: { status: WEBHOOK }, pdf: { colors: { title: '#111111', titles: '#333333' } },
    }));
    assert.deepEqual(server.last.json.properties.pdf.colors, { titles: '#333333' });
  });

  test('a PDF request does not need the deprecated version, title, logo or rtl', async () => {
    await copyleaks.submitFileAsync(TOKEN, 'scan6', new CopyleaksFileSubmissionModel('aGk=', 'a.txt', {
      webhooks: { status: WEBHOOK }, pdf: { create: true, reportVersion: 'latest' },
    }));
    assert.deepEqual(server.last.json.properties.pdf, { create: true, reportVersion: 'latest' });
    assert.equal(PdfReportVersion.V3, 3);
  });

  test('startAsync: PATCH /v3/scans/start and returns the typed result', async () => {
    server.reply(() => ({ body: { success: [{ id: 'scan1' }], failed: [] } }));
    const result = await copyleaks.startAsync(TOKEN, new CopyleaksStartRequestModel(['scan1'], CopyleaksStartErrorHandlings.Ignore));
    assert.deepEqual(result, { success: [{ id: 'scan1' }], failed: [] });
    const req = server.last;
    assert.equal(req.method, 'PATCH');
    assert.equal(req.url, '/v3/scans/start');
    assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: JSON_TYPE });
    assert.deepEqual(req.json, { trigger: ['scan1'], errorHandling: 1 });
  });

  test('deleteAsync: PATCH /v3.1/scans/delete with completion webhook headers', async () => {
    server.reply(() => ({ status: 202, body: '' }));
    await copyleaks.deleteAsync(TOKEN, new CopyleaksDeleteRequestModel([{ id: 'scan1' }], true, 'https://example.com/deleted', [['x-key', 'v']]));
    const req = server.last;
    assert.equal(req.method, 'PATCH');
    assert.equal(req.url, '/v3.1/scans/delete');
    assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: JSON_TYPE });
    assert.deepEqual(req.json, { scans: [{ id: 'scan1' }], purge: true, completionWebhook: 'https://example.com/deleted', headers: [['x-key', 'v']] });
  });

  test('resendWebhookAsync: POST /v3/scans/{scanId}/webhooks/resend with no body', async () => {
    await copyleaks.resendWebhookAsync(TOKEN, 'scan1');
    const req = server.last;
    assert.equal(req.method, 'POST');
    assert.equal(req.url, '/v3/scans/scan1/webhooks/resend');
    assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: JSON_TYPE });
    assert.equal(req.body.length, 0);
  });

  test('exportAsync: POST /v3/downloads/{scanId}/export/{exportId} with every export target', async () => {
    const target = (name) => ({ endpoint: `https://example.com/export/${name}`, verb: 'POST', headers: [['x-key', name]] });
    const model = new CopyleaksExportModel(
      'https://example.com/export/done',
      [{ id: 'result1', ...target('result1') }],
      target('crawled'),
      3,
      'payload',
      target('pdf'),
      [['x-webhook', 'v']],
      target('ai'),
      target('writing'),
      target('overview'),
    );
    await copyleaks.exportAsync(TOKEN, 'scan1', 'export1', model);
    const req = server.last;
    assert.equal(req.method, 'POST');
    assert.equal(req.url, '/v3/downloads/scan1/export/export1');
    assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: JSON_TYPE });
    assert.deepEqual(req.json, {
      completionWebhook: 'https://example.com/export/done',
      results: [{ id: 'result1', ...target('result1') }],
      crawledVersion: target('crawled'),
      maxRetries: 3,
      developerPayload: 'payload',
      pdfReport: target('pdf'),
      completionWebhookHeaders: [['x-webhook', 'v']],
      aiDetection: target('ai'),
      writingFeedback: target('writing'),
      overview: target('overview'),
    });
  });

  test('exportAsync does not need results or crawledVersion', async () => {
    const model = new CopyleaksExportModel('https://example.com/export/done');
    model.aiDetection = { endpoint: 'https://example.com/export/ai', verb: 'POST' };
    await copyleaks.exportAsync(TOKEN, 'scan1', 'export2', model);
    assert.deepEqual(server.last.json, { completionWebhook: 'https://example.com/export/done', aiDetection: { endpoint: 'https://example.com/export/ai', verb: 'POST' } });
  });

  test('getCreditsBalanceAsync: GET /v3/scans/credits', async () => {
    server.reply(() => ({ body: { Amount: 12 } }));
    assert.deepEqual(await copyleaks.getCreditsBalanceAsync(TOKEN), { Amount: 12 });
    const req = server.last;
    assert.equal(req.method, 'GET');
    assert.equal(req.url, '/v3/scans/credits');
    assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: undefined });
    assert.equal(req.body.length, 0);
  });

  test('getUsagesHistoryCsvAsync: GET /v3/scans/usages/history returns the CSV text as is', async () => {
    const csv = 'Date,Credits\n01-01-2026,1\n';
    server.reply(() => ({ body: csv, headers: { 'content-type': 'text/csv' } }));
    assert.equal(await copyleaks.getUsagesHistoryCsvAsync(TOKEN, '01-01-2026', '31-01-2026'), csv);
    const req = server.last;
    assert.equal(req.method, 'GET');
    assert.equal(req.url, '/v3/scans/usages/history?start=01-01-2026&end=31-01-2026');
    assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: undefined });
  });

  test('getUsagesHistoryCsvAsync does not parse a JSON-looking body', async () => {
    server.reply(() => ({ body: '[1,2]', headers: { 'content-type': 'application/json' } }));
    assert.equal(await copyleaks.getUsagesHistoryCsvAsync(TOKEN, '01-01-2026', '31-01-2026'), '[1,2]');
  });

  test('public lookups send no Authorization header', async () => {
    const cases = [
      [() => copyleaks.getReleaseNotesAsync(), '/v3/release-logs.json', { updates: [] }],
      [() => copyleaks.getSupportedFileTypesAsync(), '/v3/miscellaneous/supported-plagiarism-file-types', { textual: ['txt'], ocr: ['png'] }],
      [() => copyleaks.getOCRSupportedLanguagesAsync(), '/v3/miscellaneous/ocr-languages-list', ['en']],
    ];
    for (const [call, path, body] of cases) {
      server.reply(() => ({ body }));
      assert.deepEqual(await call(), body);
      const req = server.last;
      assert.equal(req.method, 'GET');
      assert.equal(req.url, path);
      assertSdkHeaders(assert, req, { token: undefined, contentType: undefined });
    }
  });
});
