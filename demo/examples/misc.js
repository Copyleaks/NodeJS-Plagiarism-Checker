const { logSuccess, logError } = require('../utils/logger');

function TEST_MISC(copyleaks, loginResult) {
  copyleaks.getOCRSupportedLanguagesAsync().then(
    (loginResult) => {
      logSuccess("getOCRSupportedLanguagesAsync", loginResult);
    },
    (err) => logError("getOCRSupportedLanguagesAsync", err)
  );
  copyleaks.getSupportedFileTypesAsync().then(
    (loginResult) => {
      logSuccess("getSupportedFileTypesAsync", loginResult);
    },
    (err) => logError("getSupportedFileTypesAsync", err)
  );
  copyleaks.getReleaseNotesAsync().then(
    (loginResult) => {
      logSuccess("getReleaseNotesAsync", loginResult);
    },
    (err) => logError("getReleaseNotesAsync", err)
  );
}

module.exports = { TEST_MISC };