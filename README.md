# Copyleaks SDK
The official [Copyleaks](https://copyleaks.com/) JavaScript library.

Copyleaks is the integrity layer for your tech stack that helps organizations and individuals understand what's human-made and original, AI-generated, or manipulated across text, image, audio and video.

This SDK gives you access to the following Copyleaks products:

*   AI Text Detection
*   AI Image Detection
*   AI Video Detection
*   Plagiarism Checker (Authenticity scans: file, URL, OCR)
*   Image Plagiarism Detection
*   Grammar Checker
*   Text Moderation

## 🚀 Getting Started
Before you start, ensure you have the following:

*   An active Copyleaks account. If you don’t have one, [sign up for free](https://copyleaks.com/signup).
*   You can find your API key on the [API Dashboard](https://api.copyleaks.com/dashboard).
*   Node.js 18 or later.

Once you have your account and API key:

**Install the SDK**:

Install using [npm](https://www.npmjs.com/package/copyleaks)  
```bash
npm install copyleaks
```

## 🔷 TypeScript
The SDK is written in TypeScript and its type declarations ship with the package, so there is no `@types` package to install. Responses are typed, for example `CopyleaksAiTextDetectionResponseModel` for AI Text Detection.

The package works with both ES modules (`import`) and CommonJS (`require`):

```typescript
import { Copyleaks, CopyleaksNaturalLanguageSubmissionModel } from 'copyleaks';

async function main() {
  const copyleaks = new Copyleaks();
  const authToken = await copyleaks.loginAsync('YOUR_EMAIL_ADDRESS', 'YOUR_API_KEY');

  const submission = new CopyleaksNaturalLanguageSubmissionModel('TEXT_TO_CHECK_AT_LEAST_255_CHARACTERS', true);
  const result = await copyleaks.aiDetectionClient.submitNaturalTextAsync(authToken, `scan${Date.now()}`, submission);
  console.log(`AI score: ${result.summary.ai}`);
}

main().catch(err => console.error(err));
```


## Configuration and errors
Create one `Copyleaks` instance and reuse it. All its calls share one pool of keep-alive connections. Every option is optional:

```javascript
const { Copyleaks } = require('copyleaks');

const copyleaks = new Copyleaks({
  timeout: 120000,    // time limit per attempt in milliseconds (default 2 minutes, 0 = no limit)
  maxRetries: 2,      // retry HTTP 429/503 and connection errors (default 0)
  retryDelay: 1000,   // first backoff delay in milliseconds, doubled on each retry; Retry-After wins
  maxSockets: 50,     // largest number of open connections per host
  // axiosInstance, httpAgent, httpsAgent, apiServerUri and identityServerUri are also available
});
```

A request that charges credits, such as a scan, is never retried after a timeout, or after HTTP 503 without a `Retry-After` header, because the server may already have processed it.

Failed calls throw these exceptions. None of them contains your token:

```javascript
const { CommandException, RateLimitException, UnderMaintenanceException, NetworkException } = require('copyleaks');

try {
  await copyleaks.getCreditsBalanceAsync(authToken);
} catch (err) {
  if (err instanceof RateLimitException) {
    console.log(`Too many requests, retry in ${err.retryAfter ?? 60} seconds`);
  } else if (err instanceof UnderMaintenanceException) {
    console.log('Copyleaks is under maintenance, retry later');
  } else if (err instanceof CommandException) {
    console.log(`Rejected with HTTP ${err.status}:`, err.body); // 400, 401, 402, 403, 404, 409...
  } else if (err instanceof NetworkException) {
    console.log(err.isTimeout ? 'Timed out' : `Connection error ${err.code}`);
  } else {
    throw err;
  }
}
```

## 📚 Documentation
To learn more about how to use Copyleaks API please check out our [Documentation](https://docs.copyleaks.com/resources/sdks/javascript/). 

## 💡 Usage Examples
Here are some common usage examples for the Copyleaks SDK. You can also see a comprehensive code example in the `index.js` file on our GitHub repository: [index.js](https://github.com/Copyleaks/NodeJS-Plagiarism-Checker/blob/master/demo/index.js).

### Get Authentication Token
This example demonstrates how to log in to the Copyleaks API and obtain an authentication token.

```javascript
const { Copyleaks } = require('copyleaks');

// --- Your Credentials ---
const EMAIL_ADDRESS = 'YOUR_EMAIL_ADDRESS';
const KEY = 'YOUR_API_KEY';
// --------------------

async function main() {
  console.log('Authenticating...');
  const copyleaks = new Copyleaks();
  const authToken = await copyleaks.loginAsync(EMAIL_ADDRESS, KEY);
  console.log('✅ Login successful!');
}

main();
```
For a detailed understanding of the authentication process, refer to the Copyleaks Login Endpoint [Documentation](https://docs.copyleaks.com/reference/actions/account/login).
##
### Submit Text for Plagiarism Scan
This example shows how to prepare and submit raw text content for a plagiarism scan.

```javascript
const { Copyleaks,CopyleaksFileSubmissionModel } = require('copyleaks');

// --- Your Credentials ---
const EMAIL_ADDRESS = 'YOUR_EMAIL_ADDRESS';
const KEY = 'YOUR_API_KEY';
const WEBHOOK_URL = 'https://your-server.com';
// --------------------

async function main() {
  var submission = new CopyleaksFileSubmissionModel(
    "SGVsbG8gV29ybGQ=",
    "nodejs-sdk-demo.txt",
    {
      sandbox: true,
      webhooks: {
        status: `${WEBHOOK_URL}/webhook/{STATUS}`,
      },
    }
  );

  copyleaks.submitFileAsync(authToken, Date.now() + 1, submission).then(
    (res) => logSuccess("submitFileAsync", res),
    (err) => {
      logError("submitFileAsync", err);
    }
  );
}

main().catch(err => console.error(err));
```
For a full guide please refer to our step by step [Guide](https://docs.copyleaks.com/guides/authenticity/detect-plagiarism-text)

For a detailed understanding of the plagiarism detection process, refer to the Copyleaks Submit Endpoint [Documentation](https://docs.copyleaks.com/reference/actions/scans/submit-file)
##
### Reading the AI alert from the completed webhook
When a scan is submitted with `aiGeneratedText: { detect: true }` and AI-generated text is found, the completed webhook contains a `suspected-ai-text` alert in `notifications.alerts`. The alert's `additionalData` is a JSON string. The SDK decodes it into a typed `CopyleaksAiTextDetectionResponseModel`.

```javascript
const express = require('express');
const { CompletedWebhookModel } = require('copyleaks');

const app = express();
// The completed webhook can be large, so raise the default body size limit.
app.use(express.json({ limit: '10mb' }));

app.post('/webhook/completed', (req, res) => {
  const completed = new CompletedWebhookModel(req.body);

  // null when the scan produced no AI alert
  const aiAlert = completed.getAIDetectionAlert();
  if (aiAlert) {
    try {
      // null when the alert has no data; throws a SyntaxError when additionalData is not valid JSON
      const aiResult = completed.getAIDetectionResult();
      if (aiResult && aiResult.summary) {
        console.log('AI:', aiResult.summary.ai, 'Human:', aiResult.summary.human, 'Model:', aiResult.modelVersion);
        for (const result of aiResult.results || []) {
          // classification: 1 = human, 2 = AI
          console.log(result.classification, result.matches.map(m => m.text.chars));
        }
      }
    } catch (err) {
      console.error('Could not decode the AI alert:', err.message);
    }
  }
  // Acknowledge the webhook even when the AI alert could not be decoded.
  res.sendStatus(200);
});
```
`getAIDetectionAlert()` returns null when the completed webhook contains no `suspected-ai-text` alert. The raw JSON string stays available in `aiAlert.additionalData`.
##
### AI Text Detection
Use the AI detection client to determine if content was generated by artificial intelligence.

```javascript
const { Copyleaks,CopyleaksNaturalLanguageSubmissionModel } = require('copyleaks');

// --- Your Credentials ---
const EMAIL_ADDRESS = 'YOUR_EMAIL_ADDRESS';
const KEY = 'YOUR_API_KEY';
// --------------------

async function main() {
  const sampleText =
    "Lions are social animals, living in groups called prides, typically consisting of several females, their offspring, and a few males. Female lions are the primary hunters, working together to catch prey. Lions are known for their strength, teamwork, and complex social structures.";
  const submission = new CopyleaksNaturalLanguageSubmissionModel(sampleText);
  submission.sandbox = true;

  copyleaks.aiDetectionClient
    .submitNaturalTextAsync(authToken, Date.now() + 1, submission)
    .then((response) => {
      logSuccess("TEST_submitAIDetectionNaturalLanguage", response);
    })
    .catch((error) => {
      logError("TEST_submitAIDetectionNaturalLanguage", error);
    });

}

main().catch(err => console.error(err));
```
For a full guide please refer to our step by step [Guide](https://docs.copyleaks.com/guides/ai-detector/ai-text-detection/)

For a detailed understanding of the AI Text Detection process, refer to the Copyleaks detect natural language Endpoint [Documentation](https://docs.copyleaks.com/reference/actions/writer-detector/check/)
##
### Grammar Checker (WritingAssistantClient)
Get intelligent suggestions for improving grammar, spelling, style, and overall writing quality.

```javascript
const { Copyleaks,CopyleaksWritingAssistantSubmissionModel } = require('copyleaks');

// --- Your Credentials ---
const EMAIL_ADDRESS = 'YOUR_EMAIL_ADDRESS';
const KEY = 'YOUR_API_KEY';
// --------------------

async function main() {
 const sampleText =
    "Lions are the only cat that live in groups, called pride. A prides typically consists of a few adult males, several feales, and their offspring. This social structure is essential for hunting and raising young cubs. Female lions, or lionesses are the primary hunters of the prid. They work together in cordinated groups to take down prey usually targeting large herbiores like zbras, wildebeest and buffalo. Their teamwork and strategy during hunts highlight the intelligence and coperation that are key to their survival.";
  const submission = new CopyleaksWritingAssistantSubmissionModel(sampleText);
  submission.sandbox = true;

  copyleaks.writingAssistantClient
    .submitTextAsync(authToken, Date.now() + 1, submission)
    .then((response) => {
      logSuccess("TEST_submitWritingAssistText", response);
    })
    .catch((error) => {
      logError("TEST_submitWritingAssistText", error);
    });
}

main().catch(err => console.error(err));
```
For a full guide please refer to our step by step [Guide](https://docs.copyleaks.com/guides/writing/check-grammar/)

For a detailed understanding of the Grammar Checker (WritingAssistantClient) process, refer to the Copyleaks writing feedback Endpoint [Documentation](https://docs.copyleaks.com/reference/actions/writing-assistant/check/)
##
### Text Moderation
Scan and moderate text content for unsafe, inappropriate, or policy-violating material across various categories.

```javascript
const { Copyleaks,CopyleaksWritingAssistantSubmissionModel } = require('copyleaks');

// --- Your Credentials ---
const EMAIL_ADDRESS = 'YOUR_EMAIL_ADDRESS';
const KEY = 'YOUR_API_KEY';
// --------------------

async function main() {
  
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
        labels:labelsArray
    });

    copyleaks.textModerationClient.submitTextAsync(authToken, Date.now() + 1, model)
      .then(response => {
        logSuccess('TEST_submitTextModerationText', JSON.stringify(response, null, 2));
      })
      .catch(error => {
        logError('TEST_submitTextModerationText', error);
      });
}

main().catch(err => console.error(err));
```
For a full guide please refer to our step by step [Guide](https://docs.copyleaks.com/guides/moderation/moderate-text/)

For a detailed understanding of the Text moderation process, refer to the Copyleaks text moderation Endpoint [Documentation](https://docs.copyleaks.com/reference/actions/text-moderation/check/)
##
### AI Image Detection
Determine if a given image was generated or partially generated by an AI.

```javascript
const { Copyleaks, CopyleaksAiImageDetectionRequestModel } = require('copyleaks');

// --- Your Credentials ---
const EMAIL_ADDRESS = 'YOUR_EMAIL_ADDRESS';
const KEY = 'YOUR_API_KEY';
// --------------------

async function main() {

  console.log("Submitting a new image for AI image detection...");
  
  // Read and encode your image file to base64
  const fs = require('fs');
  const imagePath = "path/to/your/image.jpg"; // Update this path to your image
  const base64Image = fs.readFileSync(imagePath, { encoding: 'base64' });
  
  const model = new CopyleaksAiImageDetectionRequestModel(
    base64Image,
    "sample-image.jpg",
    CopyleaksAiImageDetectionModels.AI_IMAGE_1_ULTRA,
    true // sandbox mode
  );

  copyleaks.aiImageDetectionClient
    .submitAsync(authToken, Date.now() + 1, model)
    .then(response => {
      console.log('AI Image Detection Response:', JSON.stringify(response, null, 2));
    })
    .catch(error => {
      console.error('AI Image Detection Error:', error);
    });
}

main().catch(err => console.error(err));
```
For a full guide please refer to our step by step [Guide](https://docs.copyleaks.com/guides/ai-detector/ai-image-detection/)

For a detailed understanding of the AI Image Detection process, refer to the Copyleaks AI image detection Endpoint [Documentation](https://docs.copyleaks.com/reference/actions/ai-image-detector/check/)

##
### AI Image Detection: upload the file, masks and objects
`submitFileAsync` uploads the image bytes as multipart/form-data, without base64. Both methods accept a mask type (`binary`, `heatmap` or `none`) and up to 3 objects to find.

```javascript
const fs = require('fs');
const {
  CopyleaksAiImageDetectionFileRequestModel, CopyleaksAiImageDetectionModels, CopyleaksAiImageDetectionMaskTypes,
} = require('copyleaks');

const model = new CopyleaksAiImageDetectionFileRequestModel(
  fs.readFileSync('path/to/image.png'),
  'image.png',
  CopyleaksAiImageDetectionModels.AI_IMAGE_1_ULTRA,
  true, // sandbox mode
  CopyleaksAiImageDetectionMaskTypes.HEATMAP,
  [{ object: 'face' }]
);
const result = await copyleaks.aiImageDetectionClient.submitFileAsync(authToken, `scan${Date.now()}`, model);
console.log(result.isAiDetected, result.summary.ai, result.result?.labels, result.detectedObjects);
```
##
### AI Image Detection for an image URL (webhook)
Copyleaks downloads the image and POSTs the result to your webhook. The call returns when the request is accepted.

```javascript
const { CopyleaksAiImageDetectionAsyncRequestModel, CopyleaksAiImageDetectionResponseModel } = require('copyleaks');

await copyleaks.aiImageDetectionClient.submitUrlAsync(authToken, `scan${Date.now()}`, new CopyleaksAiImageDetectionAsyncRequestModel({
  url: 'https://example.com/image.png',
  fileName: 'image.png',
  model: 'ai-image-1-ultra',
  webhooks: { url: 'https://your-server.com/webhook/ai-image' },
  sandbox: true,
}));

// In your webhook handler:
app.post('/webhook/ai-image', (req, res) => {
  const result = new CopyleaksAiImageDetectionResponseModel(req.body);
  if (result.error) {
    console.log(`Scan failed: ${result.error.code} ${result.error.message}`, result.developerPayload);
  } else {
    console.log(result.isAiDetected, result.summary.ai);
  }
  res.sendStatus(200);
});
```
When the scan fails, the webhook has only `error` (`type`, `id`, `code`, `message`, and optionally `url` and `details`) and your `developerPayload`, without the result fields. Check `error` first.

For more details, see the AI Image Detector Async [Documentation](https://docs.copyleaks.com/reference/actions/ai-image-detector/submit/)
##
### Image Plagiarism Detection
Search the web for copies of an image. The image is uploaded as multipart/form-data and the result comes back in the response.

```javascript
const fs = require('fs');
const { CopyleaksImagePlagiarismRequestModel, CopyleaksImagePlagiarismMatchTypes } = require('copyleaks');

const model = new CopyleaksImagePlagiarismRequestModel(
  fs.readFileSync('path/to/photo.jpg'),
  'photo.jpg',
  true // sandbox mode: mock results, no credits used
);
const result = await copyleaks.imagePlagiarismClient.submitAsync(authToken, `scan${Date.now()}`, model);
console.log(`Total matches: ${result.matches.score.totalMatches}`);
for (const match of result.matches.internet) {
  const type = match.matchType === CopyleaksImagePlagiarismMatchTypes.FULL ? 'full' : 'partial';
  console.log(type, match.url, (match.webPages || []).map(page => page.url));
}
```
For more details, see the Image Plagiarism Detection [Documentation](https://docs.copyleaks.com/reference/actions/image-plagiarism-detector/check/)
##
### AI Video Detection
Submit a video URL. Copyleaks POSTs the result to your webhook when the analysis is done.

```javascript
const {
  CopyleaksAiVideoDetectionRequestModel, CopyleaksAiVideoDetectionModels, CopyleaksAiVideoDetectionResponseModel,
} = require('copyleaks');

await copyleaks.aiVideoDetectionClient.submitAsync(authToken, `video${Date.now()}`, new CopyleaksAiVideoDetectionRequestModel({
  url: 'https://example.com/my-video.mp4',
  filename: 'my-video.mp4',
  model: CopyleaksAiVideoDetectionModels.AI_VIDEO_1_PRO,
  webhooks: { url: 'https://your-server.com/webhook/ai-video' },
  sandbox: true,
}));

// In your webhook handler:
app.post('/webhook/ai-video', (req, res) => {
  const result = new CopyleaksAiVideoDetectionResponseModel(req.body);
  if (result.error) {
    console.log(`Scan failed: ${result.error.code} ${result.error.message}`, result.developerPayload);
  } else {
    console.log(result.isAiDetected, result.summary.overallAIRatio, result.audioResult, result.visualResult, result.developerPayload);
  }
  res.sendStatus(200);
});
```
When the scan fails, the webhook has only `error` and your `developerPayload`, without the result fields, as for AI Image Detection. Check `error` first.

For more details, see the AI Video Detection [Documentation](https://docs.copyleaks.com/reference/actions/ai-video-detector/submit/)
##
### AI Logic, sensitivity and AI credits
```javascript
const { CopyleaksNaturalLanguageSubmissionModel } = require('copyleaks');

// text, sandbox, language, explain (AI Logic), sensitivity (1 to 3)
const submission = new CopyleaksNaturalLanguageSubmissionModel(sampleText, true, 'en', true, 3);
const result = await copyleaks.aiDetectionClient.submitNaturalTextAsync(authToken, `scan${Date.now()}`, submission);
console.log(result.summary.ai, result.explain);

const { credits } = await copyleaks.aiDetectionClient.getCreditsBalanceAsync(authToken);
```
##
### Scan options
Plagiarism scans accept more options in `properties`, for example the Grammar Checker, the Gen-AI Overview, the Citation Checker and cross-language detection:

```javascript
const submission = new CopyleaksURLSubmissionModel('https://example.com/article', {
  sandbox: true,
  webhooks: { status: `${WEBHOOK_URL}/webhook/{STATUS}`, statusHeaders: [['Authorization', 'Bearer my-webhook-token']] },
  aiGeneratedText: { detect: true, sensitivity: 2, explain: { enable: true } },
  writingFeedback: { enable: true },
  overview: { enable: true },
  references: { validate: true },
  internalAiSourceMatch: { enable: true },
  scanTimeZone: 'America/New_York',
  scanning: { crossLanguages: { languages: [{ code: 'fr' }, { code: 'es' }] } },
  pdf: { create: true, reportVersion: 'latest', colors: { titles: '#040F21' } },
});
await copyleaks.submitUrlAsync(authToken, `scan${Date.now()}`, submission);
```
Export the extra reports with the `aiDetection`, `writingFeedback` and `overview` targets of `CopyleaksExportModel`.
##
### Lookups
```javascript
// No login needed:
const { documentLanguages, resultLanguages } = await copyleaks.getAllowedCrossLanguagesAsync();
console.log(Object.values(resultLanguages)); // language name -> ISO-639-1 code, for example { english: 'en' }
const { supportedAiFileTypes } = await copyleaks.getSupportedAiTextDetectionFileTypesAsync();

// Private Cloud Hub repository information (Admin or Super Admin role):
const repository = await copyleaks.getRepositoryInfoAsync(authToken, 'my-repository-id');
console.log(repository.name, repository.currentCredits, repository.maxCredits);
```

##
### Further Resources

*   **Copyleaks API Dashboard:** Manage your API keys, monitor usage, and view analytics from your personalized dashboard. [Access Dashboard](https://api.copyleaks.com/dashboard)
*   **Copyleaks SDK Documentation:** Explore comprehensive guides, API references, and code examples for seamless integration. [Read Documentation](https://docs.copyleaks.com/resources/sdks/overview/)


## Support
* If you need assistance, please contact Copyleaks Support via our support portal: Contact Copyleaks [Support](https://help.copyleaks.com/s/contactsupport).
* To arrange a product demonstration, book a demo here: [Booking Link](https://copyleaks.com/book-a-demo).
