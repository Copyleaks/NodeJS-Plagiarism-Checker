'use strict';
// A local HTTP server that records every request and answers with canned responses.
// Used by the unit tests instead of the real Copyleaks API, so no test touches the network.
const http = require('node:http');

/**
 * Starts a server on 127.0.0.1 with a random port.
 * `respond(req)` returns { status, headers, body, delayMs } for each recorded request; body may be
 * an object (sent as JSON), a string or a Buffer. The default answer is 200 with an empty JSON object.
 */
async function startMockServer(respond) {
  const requests = [];
  let handler = respond || (() => ({ status: 200, body: {} }));
  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', async () => {
      const body = Buffer.concat(chunks);
      const recorded = {
        method: req.method,
        url: req.url,
        path: req.url.split('?')[0],
        query: new URL(req.url, 'http://localhost').searchParams,
        headers: req.headers,
        body,
        remotePort: req.socket.remotePort,
      };
      const type = req.headers['content-type'] || '';
      if (type.startsWith('application/json') && body.length > 0) {
        recorded.json = JSON.parse(body.toString('utf8'));
      }
      requests.push(recorded);
      const answer = (await handler(recorded, requests.length - 1)) || {};
      const send = () => {
        const status = answer.status ?? 200;
        const headers = { ...(answer.headers || {}) };
        let payload = answer.body === undefined ? {} : answer.body;
        if (Buffer.isBuffer(payload) || typeof payload === 'string') {
          headers['content-type'] = headers['content-type'] || 'text/plain';
        } else {
          payload = JSON.stringify(payload);
          headers['content-type'] = headers['content-type'] || 'application/json; charset=utf-8';
        }
        if (status === 204) {
          res.writeHead(status, headers);
          res.end();
          return;
        }
        res.writeHead(status, headers);
        res.end(payload);
      };
      if (answer.delayMs) {
        setTimeout(send, answer.delayMs);
      } else {
        send();
      }
    });
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  return {
    url: `http://127.0.0.1:${port}`,
    requests,
    get last() { return requests[requests.length - 1]; },
    reply(fn) { handler = fn; },
    reset() { requests.length = 0; handler = respond || (() => ({ status: 200, body: {} })); },
    async close() {
      if (server.closeAllConnections) server.closeAllConnections();
      await new Promise((resolve) => server.close(resolve));
    },
  };
}

/** A token that expires in one hour. */
function validToken(accessToken = 'test-access-token-123') {
  return {
    access_token: accessToken,
    '.issued': new Date().toISOString(),
    '.expires': new Date(Date.now() + 3600e3).toISOString(),
  };
}

/** Parses a multipart/form-data body into { name, filename, contentType, data } parts. */
function parseMultipart(req) {
  const type = req.headers['content-type'] || '';
  const match = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(type);
  if (!type.startsWith('multipart/form-data') || !match) {
    throw new Error(`not a multipart request: ${type}`);
  }
  const boundary = Buffer.from(`--${match[1] || match[2]}`);
  const parts = [];
  let start = req.body.indexOf(boundary);
  while (start !== -1) {
    const next = req.body.indexOf(boundary, start + boundary.length);
    if (next === -1) break;
    const section = req.body.subarray(start + boundary.length + 2, next - 2); // drop CRLFs
    const headerEnd = section.indexOf('\r\n\r\n');
    const headerText = section.subarray(0, headerEnd).toString('utf8');
    const data = section.subarray(headerEnd + 4);
    const disposition = /content-disposition:([^\r\n]+)/i.exec(headerText)[1];
    const name = /name="([^"]*)"/.exec(disposition)[1];
    const filenameMatch = /filename="([^"]*)"/.exec(disposition);
    const contentTypeMatch = /content-type:\s*([^\r\n]+)/i.exec(headerText);
    parts.push({
      name,
      filename: filenameMatch ? filenameMatch[1] : undefined,
      contentType: contentTypeMatch ? contentTypeMatch[1].trim() : undefined,
      data,
      text: data.toString('utf8'),
    });
    start = next;
  }
  return parts;
}

/**
 * Points the default server URLs at a closed local port, so a test that forgets an
 * apiServerUri/identityServerUri option fails fast instead of calling the real API.
 */
function guardNetwork(CopyleaksConfig) {
  CopyleaksConfig.API_SERVER_URI = 'http://127.0.0.1:9';
  CopyleaksConfig.IDENTITY_SERVER_URI = 'http://127.0.0.1:9';
}

/** Asserts the headers the SDK controls: User-Agent, Authorization and Content-Type. */
function assertSdkHeaders(assert, req, { token, contentType }) {
  assert.equal(req.headers['user-agent'], 'node-sdk/7.0.0', 'User-Agent');
  assert.equal(req.headers.authorization, token === undefined ? undefined : `Bearer ${token}`, 'Authorization');
  if (contentType === 'multipart') {
    assert.match(req.headers['content-type'] || '', /^multipart\/form-data; boundary=/, 'Content-Type');
  } else {
    assert.equal(req.headers['content-type'], contentType, 'Content-Type');
  }
}

module.exports = { startMockServer, validToken, parseMultipart, guardNetwork, assertSdkHeaders };
