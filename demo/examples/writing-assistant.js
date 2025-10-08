const { logSuccess, logError } = require('../utils/logger');
const { CopyleaksWritingAssistantSubmissionModel } = require('../../dist');

function TEST_submitWritingAssistText(copyleaks, loginResult) {
  const sampleText =
    "Lions are the only cat that live in groups, called pride. A prides typically consists of a few adult males, several feales, and their offspring. This social structure is essential for hunting and raising young cubs. Female lions, or lionesses are the primary hunters of the prid. They work together in cordinated groups to take down prey usually targeting large herbiores like zbras, wildebeest and buffalo. Their teamwork and strategy during hunts highlight the intelligence and coperation that are key to their survival.";
  const submission = new CopyleaksWritingAssistantSubmissionModel(sampleText);
  submission.sandbox = true;

  copyleaks.writingAssistantClient
    .submitTextAsync(loginResult, Date.now() + 1, submission)
    .then((response) => {
      logSuccess("TEST_submitWritingAssistText", response);
    })
    .catch((error) => {
      logError("TEST_submitWritingAssistText", error);
    });
}

function TEST_getCorrectionTypes(copyleaks, loginResult) {
  copyleaks.writingAssistantClient
    .getCorrectionTypesAsync(loginResult, "en")
    .then((response) => {
      logSuccess("TEST_getCorrectionTypes", response);
    })
    .catch((error) => {
      logError("TEST_getCorrectionTypes", error);
    });
}

module.exports = { TEST_submitWritingAssistText, TEST_getCorrectionTypes };