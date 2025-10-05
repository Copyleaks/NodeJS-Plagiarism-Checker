const { logSuccess, logError } = require('../utils/logger');
const { 
  CopyleaksTextModerationRequestModel,
  CopyleaksTextModerationLabel,
  CopyleaksTextModerationConstants,
  CopyleaksTextModerationLanguages
} = require('../../dist');

function TEST_submitTextModerationText(copyleaks, loginResult) {
  var labelsArray=[
    new CopyleaksTextModerationLabel(CopyleaksTextModerationConstants.ADULT_V1),
    new CopyleaksTextModerationLabel(CopyleaksTextModerationConstants.TOXIC_V1),
    new CopyleaksTextModerationLabel(CopyleaksTextModerationConstants.VIOLENT_V1),
    new CopyleaksTextModerationLabel(CopyleaksTextModerationConstants.PROFANITY_V1),
    new CopyleaksTextModerationLabel(CopyleaksTextModerationConstants.SELF_HARM_V1),
    new CopyleaksTextModerationLabel(CopyleaksTextModerationConstants.HARASSMENT_V1),
    new CopyleaksTextModerationLabel(CopyleaksTextModerationConstants.HATE_SPEECH_V1),
    new CopyleaksTextModerationLabel(CopyleaksTextModerationConstants.DRUGS_V1),
    new CopyleaksTextModerationLabel(CopyleaksTextModerationConstants.FIREARMS_V1),
    new CopyleaksTextModerationLabel(CopyleaksTextModerationConstants.CYBERSECURITY_V1)
  ];

  const model = new CopyleaksTextModerationRequestModel({
    text: "This is some text to scan.",
    sandbox: true,
    language: CopyleaksTextModerationLanguages.ENGLISH,
    labels: labelsArray
  });

  copyleaks.textModerationClient.submitTextAsync(loginResult, Date.now() + 1, model)
    .then(response => {
      logSuccess('TEST_submitTextModerationText', JSON.stringify(response, null, 2));
    })
    .catch(error => {
      logError('TEST_submitTextModerationText', error);
    });
}

module.exports = { TEST_submitTextModerationText };