'use strict';
// Package shape: engines, dependencies, exports map, and the public names of both builds.
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const pkg = require('../package.json');

const NEW_PUBLIC_NAMES = [
  'ImagePlagiarismClient', 'AiVideoDetectionClient', 'AIDetectionClient', 'AiImageDetectionClient', 'TextModerationClient', 'WritingAssistantClient',
  'NetworkException', 'CommandException', 'RateLimitException', 'UnderMaintenanceException', 'AuthExipredException',
  'CopyleaksImagePlagiarismRequestModel', 'CopyleaksAiVideoDetectionRequestModel', 'CopyleaksAiImageDetectionAsyncRequestModel',
  'CopyleaksAiImageDetectionFileRequestModel', 'CopyleaksAiVideoDetectionResponseModel', 'CopyleaksAiVideoDetectionModels',
  'CopyleaksAiImageDetectionMaskTypes', 'CopyleaksImagePlagiarismMatchTypes', 'InternalAIDataModel', 'ReferencesValidationModel',
  'MAX_TEXT_MODERATION_LABELS',
];

describe('package', () => {
  test('declares the supported Node.js versions', () => {
    assert.equal(pkg.engines.node, '>=18');
  });

  test('ships axios as its only runtime dependency, with no peer dependency', () => {
    assert.deepEqual(Object.keys(pkg.dependencies), ['axios']);
    assert.equal(pkg.peerDependencies, undefined);
    assert.ok(pkg.devDependencies.rimraf, 'rimraf is a build tool');
  });

  test('the CommonJS root exports the new public names', () => {
    const sdk = require('copyleaks');
    for (const name of NEW_PUBLIC_NAMES) {
      assert.ok(sdk[name] !== undefined, `${name} is not exported`);
    }
  });

  test('the ES module root exports the same names as the CommonJS root', async () => {
    const esm = await import('copyleaks');
    const cjs = require('copyleaks');
    assert.deepEqual(Object.keys(esm).filter((k) => k !== 'default').sort(), Object.keys(cjs).sort());
  });

  test('the documented deep imports still resolve', async () => {
    for (const sub of ['dist', 'dist/models/constants', 'dist/models/exceptions', 'dist/models/exports', 'dist/models/request',
      'dist/models/response', 'dist/models/submissions', 'dist/models/submissions/properties', 'dist/utils',
      'dist/models/submissions/properties/PdfReportVersion', 'dist/models/submissions/properties/PdfReportVersion.js']) {
      assert.ok(require(`copyleaks/${sub}`), `require copyleaks/${sub}`);
      assert.ok(await import(`copyleaks/${sub}`), `import copyleaks/${sub}`);
    }
    const properties = require('copyleaks/dist/models/submissions/properties');
    for (const name of ['SubmissionActions', 'SubmissionFilterDomainsMode', 'PdfReportVersion', 'MaskingPolicy', 'ScanMethodAlgorithm']) {
      assert.ok(properties[name], `${name} from the properties folder`);
    }
  });

  test('the package root resolves to the build in dist', () => {
    assert.equal(require.resolve('copyleaks'), path.join(__dirname, '..', 'dist', 'index.js'));
  });
});
