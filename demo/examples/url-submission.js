const { logSuccess, logError } = require('../utils/logger');
const { CopyleaksURLSubmissionModel } = require('../../dist');

function TEST_submitUrlAsync(copyleaks, loginResult, WEBHOOK_URL) {
  var submission = new CopyleaksURLSubmissionModel("https://copyleaks.com", {
    sandbox: true,
    webhooks: {
      status: `${WEBHOOK_URL}/submit-url-webhook/{STATUS}`,
      newResult: `${WEBHOOK_URL}/submit-url-webhook/new-results`,
    },
  });

  copyleaks.submitUrlAsync(loginResult, Date.now() + 1, submission).then(
    (res) => logSuccess("submitUrlAsync", res),
    (err) => {
      logError("submitUrlAsync", err);
    }
  );
}

module.exports = { TEST_submitUrlAsync };