'use strict';
// AI Text, Grammar Checker, Text Moderation, AI Image, Image Plagiarism and AI Video endpoints.
const { test, describe, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const { startMockServer, validToken, parseMultipart, guardNetwork, assertSdkHeaders } = require('./helpers/mock-server');
const sdk = require('../dist');

const {
  Copyleaks, CopyleaksConfig, CopyleaksNaturalLanguageSubmissionModel, CopyleaksWritingAssistantSubmissionModel,
  CopyleaksTextModerationRequestModel, CopyleaksTextModerationLabel, CopyleaksTextModerationConstants,
  CopyleaksAiImageDetectionRequestModel, CopyleaksAiImageDetectionFileRequestModel, CopyleaksAiImageDetectionAsyncRequestModel,
  CopyleaksAiImageDetectionResponseModel, CopyleaksAiImageDetectionModels, CopyleaksAiImageDetectionMaskTypes,
  CopyleaksImagePlagiarismRequestModel, CopyleaksAiVideoDetectionRequestModel, CopyleaksAiVideoDetectionModels,
  CopyleaksTextModerationResponseModel, MAX_TEXT_MODERATION_LABELS,
} = sdk;

guardNetwork(CopyleaksConfig);
const TOKEN = validToken();
const JSON_TYPE = 'application/json';
const TEXT = 'Lions are social animals, living in groups called prides. '.repeat(6);
const IMAGE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0xff, 0x10, 0x20]);
const WEBHOOKS = { url: 'https://example.com/webhook/result', headers: [['Authorization', 'Bearer hook']] };

const AI_IMAGE_RESPONSE = {
  model: 'ai-image-1-ultra',
  result: { starts: [0, 512], lengths: [256, 512], labels: [1, 4] },
  summary: { human: 0.3, ai: 0.7 },
  isAiDetected: true,
  imageInfo: {
    shape: { height: 1024, width: 768 },
    metadata: { issuedTime: '2025-07-23T12:44:05', issuedBy: 'OpenAI', appOrDeviceUsed: 'OpenAI-API', contentSummary: 'Created using generative AI' },
  },
  detectedObjects: [{ object: 'face', mask: { starts: [1024], lengths: [512] } }],
  scannedDocument: { scanId: 'scan1', actualCredits: 1, expectedCredits: 1, creationTime: '2023-01-10T10:07:58Z' },
  futureField: { kept: true },
};

describe('products', () => {
  let server;
  let copyleaks;

  before(async () => { server = await startMockServer(); });
  after(async () => { await server.close(); });
  beforeEach(() => {
    server.reset();
    copyleaks = new Copyleaks({ apiServerUri: server.url, identityServerUri: server.url });
  });

  describe('AI text detection', () => {
    test('submitNaturalTextAsync: POST /v2/writer-detector/{scanId}/check with explain and sensitivity', async () => {
      server.reply(() => ({ body: { modelVersion: 'v11', results: [], summary: { human: 0, ai: 1 } } }));
      const result = await copyleaks.aiDetectionClient.submitNaturalTextAsync(TOKEN, 'scan1', new CopyleaksNaturalLanguageSubmissionModel(TEXT, true, 'en', true, 3));
      assert.equal(result.summary.ai, 1);
      const req = server.last;
      assert.equal(req.method, 'POST');
      assert.equal(req.url, '/v2/writer-detector/scan1/check');
      assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: JSON_TYPE });
      assert.deepEqual(req.json, { text: TEXT, sandbox: true, language: 'en', explain: true, sensitivity: 3 });
    });

    test('submitNaturalTextAsync leaves explain and sensitivity out when they are not set', async () => {
      await copyleaks.aiDetectionClient.submitNaturalTextAsync(TOKEN, 'scan1', new CopyleaksNaturalLanguageSubmissionModel(TEXT, true));
      assert.deepEqual(server.last.json, { text: TEXT, sandbox: true });
    });

    test('getCreditsBalanceAsync: GET /v2/writer-detector/credits', async () => {
      server.reply(() => ({ body: { credits: 382 } }));
      assert.deepEqual(await copyleaks.aiDetectionClient.getCreditsBalanceAsync(TOKEN), { credits: 382 });
      const req = server.last;
      assert.equal(req.method, 'GET');
      assert.equal(req.url, '/v2/writer-detector/credits');
      assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: undefined });
      assert.equal(req.body.length, 0);
    });
  });

  describe('Grammar Checker', () => {
    test('submitTextAsync: POST /v1/writing-feedback/{scanId}/check, a score weight of 0 is sent', async () => {
      server.reply(() => ({ body: { score: { corrections: { overallScore: 90 } } } }));
      const submission = new CopyleaksWritingAssistantSubmissionModel('Lions is social.', true, 'en', { grammarScoreWeight: 0, wordChoiceScoreWeight: 0.5 });
      const result = await copyleaks.writingAssistantClient.submitTextAsync(TOKEN, 'scan1', submission);
      assert.equal(result.score.corrections.overallScore, 90);
      const req = server.last;
      assert.equal(req.method, 'POST');
      assert.equal(req.url, '/v1/writing-feedback/scan1/check');
      assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: JSON_TYPE });
      assert.deepEqual(req.json, { text: 'Lions is social.', sandbox: true, language: 'en', score: { grammarScoreWeight: 0, wordChoiceScoreWeight: 0.5 } });
    });

    test('getCorrectionTypesAsync: GET /v1/writing-feedback/correction-types/{language}', async () => {
      server.reply(() => ({ body: { correctionTypes: [{ id: 1, category: 2, title: 't', message: 'm', description: 'd' }] } }));
      const result = await copyleaks.writingAssistantClient.getCorrectionTypesAsync(TOKEN, 'en');
      assert.equal(result.correctionTypes.length, 1);
      const req = server.last;
      assert.equal(req.method, 'GET');
      assert.equal(req.url, '/v1/writing-feedback/correction-types/en');
      assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: undefined });
    });
  });

  describe('Text Moderation', () => {
    test('submitTextAsync: POST /v1/text-moderation/{scanId}/check and keeps every response field', async () => {
      const body = {
        modelVersion: 'v1',
        moderations: { text: { chars: { labels: [0], starts: [15], lengths: [4] } } },
        legend: [{ index: 0, id: 'toxic-v1' }],
        scannedDocument: { scanId: 'scan1', totalWords: 86, creationTime: '2025-08-06T08:05:20Z' },
        newField: 1,
      };
      server.reply(() => ({ body }));
      const model = new CopyleaksTextModerationRequestModel({
        text: 'Some text.', sandbox: true, language: 'en',
        labels: [new CopyleaksTextModerationLabel(CopyleaksTextModerationConstants.TOXIC_V1)],
      });
      const result = await copyleaks.textModerationClient.submitTextAsync(TOKEN, 'scan1', model);
      assert.ok(result instanceof CopyleaksTextModerationResponseModel);
      assert.equal(result.modelVersion, 'v1');
      assert.deepEqual({ ...result }, body);
      const req = server.last;
      assert.equal(req.method, 'POST');
      assert.equal(req.url, '/v1/text-moderation/scan1/check');
      assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: JSON_TYPE });
      assert.deepEqual(req.json, { text: 'Some text.', sandbox: true, language: 'en', labels: [{ id: 'toxic-v1' }] });
    });

    test('labels: 1 to 16, as the API accepts', () => {
      const labels = (n) => Array.from({ length: n }, () => new CopyleaksTextModerationLabel('toxic-v1'));
      assert.equal(MAX_TEXT_MODERATION_LABELS, 16);
      assert.doesNotThrow(() => new CopyleaksTextModerationRequestModel({ text: 't', labels: labels(16) }));
      assert.throws(() => new CopyleaksTextModerationRequestModel({ text: 't', labels: labels(17) }), /no more than 16/);
      assert.throws(() => new CopyleaksTextModerationRequestModel({ text: 't', labels: [] }), /at least 1/);
    });
  });

  describe('AI image detection', () => {
    test('submitAsync: POST /v1/ai-image-detector/{scanId}/check as JSON with maskType and objectDetection', async () => {
      server.reply(() => ({ body: AI_IMAGE_RESPONSE }));
      const model = new CopyleaksAiImageDetectionRequestModel('aGk=', 'a.png', CopyleaksAiImageDetectionModels.AI_IMAGE_1_ULTRA, true,
        CopyleaksAiImageDetectionMaskTypes.HEATMAP, [{ object: 'face' }]);
      const result = await copyleaks.aiImageDetectionClient.submitAsync(TOKEN, 'scan1', model);
      const req = server.last;
      assert.equal(req.method, 'POST');
      assert.equal(req.url, '/v1/ai-image-detector/scan1/check');
      assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: JSON_TYPE });
      assert.deepEqual(req.json, {
        base64: 'aGk=', fileName: 'a.png', model: 'ai-image-1-ultra', sandbox: true, maskType: 'heatmap', objectDetection: [{ object: 'face' }],
      });
      // The response keeps every field: isAiDetected, detectedObjects, result.labels, metadata.contentSummary and unknown ones.
      assert.ok(result instanceof CopyleaksAiImageDetectionResponseModel);
      assert.deepEqual({ ...result }, AI_IMAGE_RESPONSE);
      assert.equal(result.isAiDetected, true);
      assert.equal(result.detectedObjects[0].object, 'face');
      assert.deepEqual(result.result.labels, [1, 4]);
      assert.equal(result.imageInfo.metadata.contentSummary, 'Created using generative AI');
    });

    test('submitAsync leaves maskType and objectDetection out when they are not set, and accepts a response without result', async () => {
      const { result: _omitted, ...withoutResult } = AI_IMAGE_RESPONSE;
      server.reply(() => ({ body: withoutResult }));
      const result = await copyleaks.aiImageDetectionClient.submitAsync(TOKEN, 'scan1', new CopyleaksAiImageDetectionRequestModel('aGk=', 'a.png', 'ai-image-1-ultra'));
      assert.deepEqual(server.last.json, { base64: 'aGk=', fileName: 'a.png', model: 'ai-image-1-ultra', sandbox: false });
      assert.equal(result.result, undefined);
      assert.equal(result.summary.ai, 0.7);
    });

    test('submitFileAsync: POST /v1/ai-image-detector/{scanId}/check as multipart/form-data', async () => {
      server.reply(() => ({ body: AI_IMAGE_RESPONSE }));
      const model = new CopyleaksAiImageDetectionFileRequestModel(IMAGE, 'photo.png', 'ai-image-1-ultra', true, 'binary', [{ object: 'face' }, { object: 'hand' }]);
      const result = await copyleaks.aiImageDetectionClient.submitFileAsync(TOKEN, 'scan2', model);
      assert.equal(result.isAiDetected, true);
      const req = server.last;
      assert.equal(req.method, 'POST');
      assert.equal(req.url, '/v1/ai-image-detector/scan2/check');
      assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: 'multipart' });
      const parts = parseMultipart(req);
      assert.deepEqual(parts.map((p) => p.name), ['image', 'filename', 'model', 'sandbox', 'maskType', 'objectDetection']);
      assert.equal(parts[0].filename, 'photo.png');
      assert.equal(parts[0].contentType, 'image/png');
      assert.ok(parts[0].data.equals(IMAGE));
      assert.deepEqual(parts.slice(1).map((p) => p.text), ['photo.png', 'ai-image-1-ultra', 'true', 'binary', '[{"object":"face"},{"object":"hand"}]']);
    });

    test('submitFileAsync leaves the optional fields out', async () => {
      await copyleaks.aiImageDetectionClient.submitFileAsync(TOKEN, 'scan2', new CopyleaksAiImageDetectionFileRequestModel(IMAGE, 'photo.jpg', 'ai-image-1-ultra'));
      const parts = parseMultipart(server.last);
      assert.deepEqual(parts.map((p) => [p.name, p.filename ? p.contentType : p.text]), [
        ['image', 'image/jpeg'], ['filename', 'photo.jpg'], ['model', 'ai-image-1-ultra'], ['sandbox', 'false'],
      ]);
    });

    test('submitFileAsync rejects an image that is not bytes', async () => {
      await assert.rejects(
        copyleaks.aiImageDetectionClient.submitFileAsync(TOKEN, 'scan2', new CopyleaksAiImageDetectionFileRequestModel('aGk=', 'a.png', 'ai-image-1-ultra')),
        TypeError);
      assert.equal(server.requests.length, 0);
    });

    test('submitUrlAsync: PUT /v1/ai-image-detector-async/{scanId}/submit', async () => {
      server.reply(() => ({ status: 201, body: {} }));
      const model = new CopyleaksAiImageDetectionAsyncRequestModel({
        url: 'https://example.com/image1.png', fileName: 'image1.png', model: 'ai-image-1-ultra', webhooks: WEBHOOKS,
        maskType: 'heatmap', objectDetection: [{ object: 'face' }], headers: [['X-Custom-Auth', 'token']], sandbox: true, developerPayload: 'order-1',
      });
      assert.equal(await copyleaks.aiImageDetectionClient.submitUrlAsync(TOKEN, 'scan3', model), undefined);
      const req = server.last;
      assert.equal(req.method, 'PUT');
      assert.equal(req.url, '/v1/ai-image-detector-async/scan3/submit');
      assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: JSON_TYPE });
      assert.deepEqual(req.json, {
        url: 'https://example.com/image1.png', fileName: 'image1.png', model: 'ai-image-1-ultra', webhooks: WEBHOOKS,
        maskType: 'heatmap', objectDetection: [{ object: 'face' }], headers: [['X-Custom-Auth', 'token']], sandbox: true, developerPayload: 'order-1',
      });
    });

    test('submitUrlAsync sends only the required fields when nothing else is set', async () => {
      await copyleaks.aiImageDetectionClient.submitUrlAsync(TOKEN, 'scan3', new CopyleaksAiImageDetectionAsyncRequestModel({
        url: 'https://example.com/i.png', fileName: 'i.png', model: 'ai-image-1-ultra', webhooks: { url: 'https://example.com/hook' },
      }));
      assert.deepEqual(server.last.json, { url: 'https://example.com/i.png', fileName: 'i.png', model: 'ai-image-1-ultra', webhooks: { url: 'https://example.com/hook' } });
    });

    test('the async webhook body parses into CopyleaksAiImageDetectionResponseModel', () => {
      const parsed = new CopyleaksAiImageDetectionResponseModel(JSON.parse(JSON.stringify(AI_IMAGE_RESPONSE)));
      assert.equal(parsed.isAiDetected, true);
      assert.deepEqual(parsed.detectedObjects, AI_IMAGE_RESPONSE.detectedObjects);
    });
  });

  describe('Image Plagiarism Detector', () => {
    const RESPONSE = {
      developerPayload: 'my-data',
      scannedImage: { scanId: 'scan1', expectedCredits: 1, actualCredits: 1, creationTime: '2026-05-24T10:00:00Z', width: 1920, height: 1080, filename: 'photo.jpg' },
      matches: {
        internet: [
          { url: 'https://example.com/a.jpg', matchType: 0, webPages: [{ url: 'https://example.com/post' }] },
          { url: 'https://example.org/b.jpg', matchType: 1 },
        ],
        score: { totalMatches: 2, fullMatches: 1, partialMatches: 1 },
      },
    };

    test('submitAsync: POST /v1/image-plagiarism-detector/{scanId}/check as multipart/form-data', async () => {
      server.reply(() => ({ body: RESPONSE }));
      const result = await copyleaks.imagePlagiarismClient.submitAsync(TOKEN, 'scan1', new CopyleaksImagePlagiarismRequestModel(IMAGE, 'photo.jpg', true, 'my-data'));
      assert.deepEqual(result, RESPONSE);
      assert.equal(result.matches.internet[0].matchType, sdk.CopyleaksImagePlagiarismMatchTypes.FULL);
      const req = server.last;
      assert.equal(req.method, 'POST');
      assert.equal(req.url, '/v1/image-plagiarism-detector/scan1/check');
      assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: 'multipart' });
      const parts = parseMultipart(req);
      assert.deepEqual(parts.map((p) => p.name), ['image', 'filename', 'sandbox', 'developerPayload']);
      assert.equal(parts[0].filename, 'photo.jpg');
      assert.equal(parts[0].contentType, 'image/jpeg');
      assert.ok(parts[0].data.equals(IMAGE));
      assert.deepEqual(parts.slice(1).map((p) => p.text), ['photo.jpg', 'true', 'my-data']);
    });

    test('submitAsync defaults sandbox to false and leaves developerPayload out', async () => {
      await copyleaks.imagePlagiarismClient.submitAsync(TOKEN, 'scan1', new CopyleaksImagePlagiarismRequestModel(IMAGE, 'photo.webp'));
      const parts = parseMultipart(server.last);
      assert.deepEqual(parts.map((p) => [p.name, p.filename ? p.contentType : p.text]), [
        ['image', 'image/webp'], ['filename', 'photo.webp'], ['sandbox', 'false'],
      ]);
    });

    test('maps API errors like every other call', async () => {
      server.reply(() => ({ status: 402, body: { error: 'Insufficient credits.' } }));
      await assert.rejects(
        copyleaks.imagePlagiarismClient.submitAsync(TOKEN, 'scan1', new CopyleaksImagePlagiarismRequestModel(IMAGE, 'photo.png')),
        (e) => e instanceof sdk.CommandException && e.status === 402);
    });
  });

  describe('AI Video Detector', () => {
    test('submitAsync: POST /v1/ai-video-detector/{scanId}/submit', async () => {
      server.reply(() => ({ status: 201, body: {} }));
      const model = new CopyleaksAiVideoDetectionRequestModel({
        url: 'https://example.com/my-video.mp4', filename: 'my-video.mp4', model: CopyleaksAiVideoDetectionModels.AI_VIDEO_1_PRO,
        webhooks: WEBHOOKS, headers: [['X-Custom-Auth', 'token']], verb: 'GET', sandbox: true, developerPayload: 'order-1',
      });
      assert.equal(await copyleaks.aiVideoDetectionClient.submitAsync(TOKEN, 'video1', model), undefined);
      const req = server.last;
      assert.equal(req.method, 'POST');
      assert.equal(req.url, '/v1/ai-video-detector/video1/submit');
      assertSdkHeaders(assert, req, { token: TOKEN.access_token, contentType: JSON_TYPE });
      assert.deepEqual(req.json, {
        url: 'https://example.com/my-video.mp4', filename: 'my-video.mp4', model: 'ai-video-1-pro', webhooks: WEBHOOKS,
        headers: [['X-Custom-Auth', 'token']], verb: 'GET', sandbox: true, developerPayload: 'order-1',
      });
    });

    test('submitAsync sends only the required fields when nothing else is set', async () => {
      await copyleaks.aiVideoDetectionClient.submitAsync(TOKEN, 'video1', new CopyleaksAiVideoDetectionRequestModel({
        url: 'https://example.com/v.mp4', filename: 'v.mp4', model: 'ai-video-1-pro', webhooks: { url: 'https://example.com/hook' },
      }));
      assert.deepEqual(server.last.json, { url: 'https://example.com/v.mp4', filename: 'v.mp4', model: 'ai-video-1-pro', webhooks: { url: 'https://example.com/hook' } });
    });
  });
});
