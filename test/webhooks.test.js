'use strict';
// Webhook and result models: documented fields are kept and typed.
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const {
  CompletedWebhookModel, ErrorWebhookModel, ExportCompletedWebhookModel, TaskModel, InternalAIDataModel,
  ReferencesValidationModel, CopyleaksAiVideoDetectionResponseModel, ScannedDocumentModel, InternetModel,
  CopyleaksAiImageDetectionResponseModel,
} = require('../dist');

describe('webhooks', () => {
  test('completed: scannedDocument.totalExcluded, results.internalAIData, results.internet url and referencesValidation', () => {
    const body = {
      status: 0,
      developerPayload: 'p',
      scannedDocument: { scanId: 'scan1', totalWords: 100, totalExcluded: 7, credits: 1, creationTime: '2026-01-01T00:00:00Z' },
      results: {
        internet: [{ id: 'r1', title: 't', introduction: 'i', matchedWords: 12, url: 'https://example.com/source' }],
        database: [], batch: [], repositories: [],
        internalAIData: [{
          id: 'ai1', title: 'AI entry', introduction: 'x', matchedWords: 10, identicalWords: 5, similarWords: 3, paraphrasedWords: 2, totalWords: 50,
          tags: [{ code: 'internal-ai-source-match', title: 'AI-Generated', description: 'AI text' }],
        }],
        score: { identicalWords: 1, minorChangedWords: 0, relatedMeaningWords: 0, aggregatedScore: 2.4 },
      },
      referencesValidation: { summary: { total: 4, academic: 2, academicValidated: 1, nonAcademicValidated: 1 } },
    };
    const completed = new CompletedWebhookModel(JSON.parse(JSON.stringify(body)));
    assert.ok(completed.scannedDocument instanceof ScannedDocumentModel);
    assert.equal(completed.scannedDocument.totalExcluded, 7);
    assert.equal(completed.scannedDocument.totalExecluded, 7, 'the deprecated misspelled field is still filled');
    assert.equal(completed.results.internet[0].url, 'https://example.com/source');
    assert.equal(completed.results.internet[0].matchedWords, 12);
    assert.ok(completed.results.internalAIData[0] instanceof InternalAIDataModel);
    assert.equal(completed.results.internalAIData[0].paraphrasedWords, 2);
    assert.equal(completed.results.internalAIData[0].tags[0].code, 'internal-ai-source-match');
    assert.ok(completed.referencesValidation instanceof ReferencesValidationModel);
    assert.deepEqual(completed.referencesValidation.summary, body.referencesValidation.summary);
  });

  test('InternetModel keeps the result url', () => {
    assert.equal(new InternetModel({ url: 'https://example.com' }).url, 'https://example.com');
  });

  test('error: type, id, url and details', () => {
    const body = {
      status: 1,
      developerPayload: 'p',
      error: {
        type: 'invalid_request_error', id: 'invalid_parameter', code: 400, message: 'Bad scan', url: 'https://docs.copyleaks.com/errors',
        details: [{ param: 'filename', message: 'File type not supported' }],
      },
    };
    const error = new ErrorWebhookModel(body);
    assert.deepEqual({ ...error.error }, body.error);
    assert.equal(error.error.details[0].param, 'filename');
  });

  test('export completed: tasks is a list of TaskModel', () => {
    const body = {
      completed: true,
      developerPayload: 'p',
      tasks: [
        { endpoint: 'https://example.com/export/results/r1', httpStatusCode: 200, isHealthy: true },
        { endpoint: 'https://example.com/export/pdf', httpStatusCode: 204, isHealthy: true },
      ],
    };
    const exported = new ExportCompletedWebhookModel(JSON.parse(JSON.stringify(body)));
    assert.ok(Array.isArray(exported.tasks));
    assert.equal(exported.tasks.length, 2);
    assert.ok(exported.tasks.every((task) => task instanceof TaskModel));
    assert.equal(exported.tasks[1].httpStatusCode, 204);
  });

  test('AI video webhook body parses into CopyleaksAiVideoDetectionResponseModel', () => {
    const body = {
      model: 'ai-video-1-pro',
      audioResult: { starts: [13000], lengths: [14000], exclude: { starts: [0], lengths: [2950] } },
      visualResult: { starts: [11566], lengths: [6134], exclude: { starts: [], lengths: [] } },
      summary: { audioAIRatio: 0.49, visualAIRatio: 0.58, overallAIRatio: 0.74 },
      isAiDetected: true,
      videoInfo: { metadata: { issuedBy: 'OpenAI', contentSummary: 'Created using generative AI' }, duration: 55.7 },
      scannedVideo: { scanId: 'video1', actualCredits: 1, expectedCredits: 1, creationTime: '2026-05-05T12:37:50Z' },
    };
    const parsed = new CopyleaksAiVideoDetectionResponseModel(JSON.parse(JSON.stringify(body)));
    assert.deepEqual({ ...parsed }, body);
    assert.equal(parsed.summary.overallAIRatio, 0.74);
    assert.equal(parsed.scannedVideo.scanId, 'video1');
  });

  test('AI video and async AI image webhooks of a failed scan keep error and developerPayload', () => {
    const body = {
      error: {
        type: 'invalid_request_error',
        id: 'invalid_url',
        code: 400,
        message: 'The file could not be downloaded.',
        url: 'https://docs.copyleaks.com/errors',
        details: [{ param: 'url', message: 'The server answered with HTTP 404.' }],
      },
      developerPayload: 'order-17',
    };
    for (const Model of [CopyleaksAiVideoDetectionResponseModel, CopyleaksAiImageDetectionResponseModel]) {
      const parsed = new Model(JSON.parse(JSON.stringify(body)));
      assert.deepEqual({ ...parsed }, body);
      assert.equal(parsed.error.code, 400);
      assert.equal(parsed.error.details[0].param, 'url');
      assert.equal(parsed.developerPayload, 'order-17');
      assert.equal(parsed.summary, undefined);
    }
    const minimal = new CopyleaksAiVideoDetectionResponseModel({ error: { type: 'api_error', id: 'internal', code: 500, message: 'failed' } });
    assert.equal(minimal.error.url, undefined);
    assert.equal(minimal.developerPayload, undefined);
  });

  test('a successful AI video webhook keeps developerPayload and has no error', () => {
    const parsed = new CopyleaksAiVideoDetectionResponseModel({ model: 'ai-video-1-pro', isAiDetected: false, developerPayload: 'order-18' });
    assert.equal(parsed.error, undefined);
    assert.equal(parsed.developerPayload, 'order-18');
  });
});
