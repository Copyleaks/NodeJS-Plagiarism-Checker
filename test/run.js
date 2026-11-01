'use strict';
// Runs every test/*.test.js and test/*.test.mjs file with the built-in node:test runner.
// Listing the files here keeps `npm test` working the same way on every Node.js version and shell.
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const files = fs.readdirSync(__dirname)
  .filter((name) => /\.test\.m?js$/.test(name))
  .sort()
  .map((name) => path.join(__dirname, name));

const result = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
process.exit(result.status === null ? 1 : result.status);
