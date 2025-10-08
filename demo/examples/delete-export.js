const { logSuccess, logError } = require('../utils/logger');
const { CopyleaksDeleteRequestModel, CopyleaksExportModel } = require('../../dist');

function TEST_deleteScanAsync(copyleaks, scansId, loginResult, WEBHOOK_URL) {
  if (scansId.length) {
    const model = new CopyleaksDeleteRequestModel(
      // add your own scan ids to remove
      scansId.map((id) => ({ id })),
      false,
      `${WEBHOOK_URL}/delete`
    );
    copyleaks.deleteAsync(loginResult, model).then(
      (res) => logSuccess("deleteAsync", res),
      (err) => {
        logError("deleteAsync", err);
      }
    );
  }
}

function TEST_exportAsync(copyleaks, loginResult, WEBHOOK_URL) {
  var scanId = "1610625417127"; // change this with your own scanId

  const model = new CopyleaksExportModel(
    `${WEBHOOK_URL}/export/scanId/${scanId}/completion`,
    [
      // results
      {
        id: "2a1b402420", // change this with your own result Id
        endpoint: `${WEBHOOK_URL}/export/${scanId}/result/2a1b402420`,
        verb: "POST",
        headers: [
          ["key", "value"],
          ["key2", "value2"],
        ],
      },
    ],
    {
      // crawled version
      endpoint: `${WEBHOOK_URL}/export/${scanId}/crawled-version`,
      verb: "POST",
      headers: [
        ["key", "value"],
        ["key2", "value2"],
      ],
    }
  );

  copyleaks.exportAsync(loginResult, scanId, scanId, model).then(
    (res) => logSuccess("exportAsync", res),
    (err) => {
      logError("exportAsync", err);
    }
  );
}

module.exports = { TEST_deleteScanAsync, TEST_exportAsync };