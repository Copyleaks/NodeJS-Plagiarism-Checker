// The ES module build (dist/esm) talks to the API the same way as the CommonJS build.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import {
  Copyleaks, CopyleaksConfig, CopyleaksImagePlagiarismRequestModel, CommandException, NetworkException,
} from 'copyleaks';

const require = createRequire(import.meta.url);
const { startMockServer, validToken, parseMultipart, guardNetwork } = require('./helpers/mock-server.js');

guardNetwork(CopyleaksConfig);

test('ESM: multipart upload, error mapping and timeouts work', async () => {
  const server = await startMockServer();
  try {
    const copyleaks = new Copyleaks({ apiServerUri: server.url, timeout: 100 });
    server.reply(() => ({ body: { matches: { internet: [], score: { totalMatches: 0, fullMatches: 0, partialMatches: 0 } } } }));
    const result = await copyleaks.imagePlagiarismClient.submitAsync(validToken(), 'scan1', new CopyleaksImagePlagiarismRequestModel(Buffer.from('img'), 'a.png', true));
    assert.equal(result.matches.score.totalMatches, 0);
    assert.deepEqual(parseMultipart(server.last).map((p) => p.name), ['image', 'filename', 'sandbox']);

    server.reply(() => ({ status: 400, body: { error: 'bad' } }));
    await assert.rejects(copyleaks.getReleaseNotesAsync(), (e) => e instanceof CommandException && e.status === 400);

    server.reply(() => ({ delayMs: 400 }));
    await assert.rejects(copyleaks.getReleaseNotesAsync(), (e) => e instanceof NetworkException && e.isTimeout);
  } finally {
    await server.close();
  }
});
