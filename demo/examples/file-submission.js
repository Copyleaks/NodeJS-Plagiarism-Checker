const { logSuccess, logError } = require('../utils/logger');
const { CopyleaksFileSubmissionModel, CopyleaksFileOcrSubmissionModel } = require('../../dist');

function TEST_submitFileAsync(copyleaks, loginResult, WEBHOOK_URL) {
  var submission = new CopyleaksFileSubmissionModel(
    "SGVsbG8gV29ybGQ=",
    "nodejs-sdk-demo.txt",
    {
      sandbox: true,
      webhooks: {
        status: `${WEBHOOK_URL}/submit-file-webhook/{STATUS}`,
      },
    }
  );

  copyleaks.submitFileAsync(loginResult, Date.now() + 1, submission).then(
    (res) => logSuccess("submitFileAsync", res),
    (err) => {
      logError("submitFileAsync", err);
    }
  );
}

function TEST_submitOcrFileAsync(copyleaks, loginResult, WEBHOOK_URL, base64Img) {
  var submission = new CopyleaksFileOcrSubmissionModel(
    "en",
    base64Img,
    "nodejs-sdk-demo.txt",
    {
      sandbox: true,
      webhooks: {
        status: `${WEBHOOK_URL}/submit-file-ocr-webhook/{STATUS}`,
      },
    }
  );

  copyleaks.submitFileOcrAsync(loginResult, Date.now() + 1, submission).then(
    (res) => logSuccess("submitFileOcrAsync", res),
    (err) => {
      logError("submitFileOcrAsync", err);
    }
  );
}

module.exports = { TEST_submitFileAsync, TEST_submitOcrFileAsync };