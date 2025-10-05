const { logSuccess, logError } = require('../utils/logger');
const { CopyleaksNaturalLanguageSubmissionModel, CopyleaksAiImageDetectionRequestModel, CopyleaksAiImageDetectionModels } = require('../../dist');
const fs = require('fs');

function TEST_submitAIDetectionNaturalLanguage(copyleaks, loginResult) {
  const sampleText =
    "Lions are social animals, living in groups called prides, typically consisting of several females, their offspring, and a few males. Female lions are the primary hunters, working together to catch prey. Lions are known for their strength, teamwork, and complex social structures.";
  const submission = new CopyleaksNaturalLanguageSubmissionModel(sampleText);
  submission.sandbox = true;

  copyleaks.aiDetectionClient
    .submitNaturalTextAsync(loginResult, Date.now() + 1, submission)
    .then((response) => {
      logSuccess("TEST_submitAIDetectionNaturalLanguage", response);
    })
    .catch((error) => {
      logError("TEST_submitAIDetectionNaturalLanguage", error);
    });
}

function TEST_submitAiImageDetection(copyleaks, loginResult, base64Img) {
  
  console.log("Submitting a new image for AI image detection...");

  // Read and encode your image file to base64
  const imagePath = "PATH/TO/YOUR/IMAGE"; // Update this path to your image
  const base64Image = fs.readFileSync(imagePath, { encoding: 'base64' });
  
  const model = new CopyleaksAiImageDetectionRequestModel(
    base64Image,
    "image2.png",
    CopyleaksAiImageDetectionModels.AI_IMAGE_1_ULTRA,
    true // sandbox mode
  );

  copyleaks.aiImageDetectionClient
    .submitAsync(loginResult, Date.now() + 1, model)
    .then(response => {
      logSuccess('TEST_submitAiImageDetection', JSON.stringify(response, null, 2));
    })
    .catch(error => {
      logError('TEST_submitAiImageDetection', error);
    });
}

module.exports = { TEST_submitAIDetectionNaturalLanguage, TEST_submitAiImageDetection };