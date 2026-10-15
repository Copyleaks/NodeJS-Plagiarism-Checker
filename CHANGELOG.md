# Changelog

## 7.0.0

This is the first release under the new npm name `copyleaks`. It replaces the `plagiarism-checker` package, whose last version is 6.0.0. Existing class and method names are the same as in 6.0.0. The package name, the module entry points, the errors that failed calls throw, the default request timeout, the axios instance that sends the requests and some TypeScript types changed, so this is a major version. Read the upgrade notes before you upgrade.

### Upgrade notes

#### 1. Install the new package

```bash
npm uninstall plagiarism-checker && npm install copyleaks
```

Then change every `require` and `import` path from `plagiarism-checker` to `copyleaks`:

| 6.0.0 (`plagiarism-checker`) | 7.0.0 (`copyleaks`) |
|---|---|
| `const { Copyleaks } = require('plagiarism-checker');` | `const { Copyleaks } = require('copyleaks');` |
| `import { Copyleaks } from 'plagiarism-checker';` | `import { Copyleaks } from 'copyleaks';` |
| `require('plagiarism-checker/dist/models/submissions/properties')` | `require('copyleaks/dist/models/submissions/properties')` |

The rest of your code stays the same.

#### 2. Which deep imports still work

The package now has an `exports` map in `package.json`. Node.js and bundlers only resolve the paths that the map lists.

These paths work with both `require` and `import`:

- `copyleaks`, the package root. `import` loads the new ES module build in `dist/esm`. `require` loads the CommonJS build in `dist`, the same file as before.
- `copyleaks/package.json`.
- These folders: `copyleaks/dist`, `copyleaks/dist/models/constants`, `copyleaks/dist/models/exceptions`, `copyleaks/dist/models/exports`, `copyleaks/dist/models/request`, `copyleaks/dist/models/response`, `copyleaks/dist/models/submissions`, `copyleaks/dist/models/submissions/properties` and `copyleaks/dist/utils`. Like the root, `import` gets the ES module copy and `require` gets the CommonJS copy.
- Any single file under `dist/`, with or without the `.js` extension. For example, `copyleaks/dist/models/submissions/properties/PdfReportVersion` and `copyleaks/dist/models/submissions/properties/PdfReportVersion.js` both work. A file path loads exactly that file, so a path outside `dist/esm` loads the CommonJS file, also under `import`.

These paths no longer resolve. Node.js reports `ERR_PACKAGE_PATH_NOT_EXPORTED`:

- Any path outside `dist/` other than `package.json`, for example `copyleaks/src/...`, `copyleaks/demo/...` or `copyleaks/docs/...`. The package no longer contains those folders. It now ships only `dist/`, `README.md`, `CHANGELOG.md` and `package.json`.

The 6.0.0 package also contained three build files with no source, which are gone: `dist/DeprecationService`, `dist/models/constants/SupportedFilesTypes` and `dist/models/submissions/ai-detector/CopyleaksSourceCodeSubmissionModel`.

Folders without an `index.js`, such as `copyleaks/dist/models`, did not resolve in 6.0.0 and still do not.

The package root does not export the submission property types, so you still need a deep import for them. The folder `copyleaks/dist/models/submissions/properties` now exports all of them, for example `SubmissionProperties`, `SubmissionPDF`, `AISourceMatch`, `PdfReportColors`, `PdfReportVersion`, `MaskingPolicy`, `ScanMethodAlgorithm` and the `SubmissionActions` and `SubmissionFilterDomainsMode` enums. Each type is also still available from its own file in that folder, for example `.../properties/PdfReportVersion`.

For TypeScript: with `moduleResolution` set to `node16`, `nodenext` or `bundler`, TypeScript resolves through the same `exports` map. With the older `node` setting, it ignores the map and finds the declarations through the new `types` field.

#### 3. Results are typed

Nine methods that returned `Promise<any>` now return a typed result (see "First-class TypeScript support" below). The JSON you get at runtime is the same. TypeScript code that reads a field the type does not declare, or assigns a result to an incompatible type, now fails to compile. Use the declared fields, or cast the result if you rely on an undocumented field.

#### 4. Optional alert fields

`AlertsModel.helpLink` and `AlertsModel.additionalData` are now optional (`string | undefined`), because the server does not send them for every alert. With `strictNullChecks`, check them before you use them.

#### 5. Load the SDK one way per process

If your app loads the SDK with `import` and one of your dependencies loads it with `require`, Node.js loads two separate copies. Settings such as `CopyleaksConfig.API_SERVER_URI` that you set through one copy do not apply to the other, and `instanceof CommandException` does not match errors thrown by the other copy. Use either `import` or `require` for the SDK in one process.

#### 6. Failed calls throw SDK exceptions

In 6.0.0 every failed call rejected with the raw axios error, because axios rejected the request before the SDK could map it. That error held the request configuration, including the `Authorization: Bearer` header, so logging it exposed your token. Now:

| What happened | 6.0.0 | 7.0.0 |
|---|---|---|
| HTTP 429 | axios error | `RateLimitException`, with `retryAfter` (seconds) when the server sends `Retry-After` |
| HTTP 503 | axios error | `UnderMaintenanceException` |
| Any other non-2xx status | axios error | `CommandException` |
| No response: a timeout or a connection error | axios error | `NetworkException`, with `code` (for example `ECONNABORTED`) and `isTimeout` |

`CommandException`, `RateLimitException` and `UnderMaintenanceException` have `status` and `body`, and `response` with `status`, `statusText`, `headers` and `data`, so code that reads `err.response.status` or `err.response.data` keeps working. `err.config`, `err.request` and `err.isAxiosError` are gone. Replace `axios.isAxiosError(err)` checks with `instanceof` checks on the SDK exceptions.

#### 7. Requests time out after 2 minutes

Calls used to wait forever for a response. Now each attempt stops after 120 seconds and throws a `NetworkException` whose `isTimeout` is `true`. Change the limit with `new Copyleaks({ timeout: 300000 })`, or pass `timeout: 0` to wait without a limit.

#### 8. The SDK no longer uses the global axios instance

In 6.0.0 the SDK sent its requests through the default `axios` export, and `axios` was also a peer dependency, so the SDK usually shared your app's copy of axios and its global settings. Now the SDK sends its requests through its own instance, created with `axios.create()`, and `axios` is only a regular dependency, so npm may install a separate copy for the SDK. These global settings no longer apply to SDK calls:

- `axios.interceptors`.
- `axios.defaults.httpAgent` and `axios.defaults.httpsAgent`, for example a proxy or custom CA certificates.
- `axios.defaults.timeout`. The SDK's own default is 2 minutes (upgrade note 7).

Pass them in the SDK options instead:

```js
const https = require('https');
const axios = require('axios');
const { Copyleaks } = require('copyleaks');

// A proxy or custom CA certificates, and a time limit
const copyleaks = new Copyleaks({
  httpsAgent: new https.Agent({ keepAlive: true, ca: myCaCertificate }),
  timeout: 300000,
});

// Interceptors: send the requests through your own axios instance
const instance = axios.create();
instance.interceptors.request.use((config) => { console.log(config.method, config.url); return config; });
const copyleaksWithInterceptors = new Copyleaks({ axiosInstance: instance });
```

To keep the 6.0.0 behavior, pass the global instance: `new Copyleaks({ axiosInstance: axios })`. Its interceptors and defaults then apply, including `axios.defaults.timeout` unless you also pass `timeout`.

#### 9. Node.js 18 or later

`package.json` now declares `"engines": { "node": ">=18" }`. The image uploads use the `FormData` and `Blob` classes built into Node.js 18.

#### 10. Type and validation changes

- `CopyleaksAiImageDetectionResponseModel.result` is now optional. The API leaves it out when the request sets `maskType` to `"none"`. With `strictNullChecks`, check it before you use it.
- `matchedWords` of webhook results is now typed `number`, the type the API always sent. It was `string`.
- `ExportCompletedWebhookModel.tasks` is now a list, `TaskModel[]`, as the API sends it. In 6.0.0 the constructor turned the list into a single, broken `TaskModel`.
- `CopyleaksTextModerationRequestModel` now accepts at most 16 labels, the limit of the API. It used to accept 32 and the API rejected more than 16.

### Added

#### New products and endpoints

| Method | Endpoint |
|---|---|
| `imagePlagiarismClient.submitAsync` | Image Plagiarism Detector: search the web for copies of an image. `POST /v1/image-plagiarism-detector/{scanId}/check`, multipart upload. Returns `CopyleaksImagePlagiarismResponseModel`. |
| `aiVideoDetectionClient.submitAsync` | AI Video Detector: `POST /v1/ai-video-detector/{scanId}/submit`. The result is sent to your webhook; parse it with `new CopyleaksAiVideoDetectionResponseModel(body)`. |
| `aiImageDetectionClient.submitUrlAsync` | AI Image Detector for an image URL, with the result sent to your webhook: `PUT /v1/ai-image-detector-async/{scanId}/submit`. Parse the webhook with `new CopyleaksAiImageDetectionResponseModel(body)`. |
| `aiImageDetectionClient.submitFileAsync` | AI Image Detector with the image bytes uploaded as multipart/form-data, without base64. Same endpoint and result as `submitAsync`. |
| `aiDetectionClient.getCreditsBalanceAsync` | AI text detector credits: `GET /v2/writer-detector/credits`. Returns `CopyleaksAiTextDetectionCreditsResponseModel`. |
| `Copyleaks.getAllowedCrossLanguagesAsync` | Languages for cross-language plagiarism detection: `GET /v3/miscellaneous/allowed-cross-languages`. Each list maps a language name to its ISO-639-1 code. No login needed. |
| `Copyleaks.getSupportedAiTextDetectionFileTypesAsync` | File types of AI text detection: `GET /v3/miscellaneous/supported-ai-text-detection-file-types`. No login needed. |
| `Copyleaks.getRepositoryInfoAsync` | Private Cloud Hub repository information: `GET /v3/repositories/repository/{repositoryId}/info`. |

New request models: `CopyleaksImagePlagiarismRequestModel`, `CopyleaksAiVideoDetectionRequestModel`, `CopyleaksAiImageDetectionAsyncRequestModel` and `CopyleaksAiImageDetectionFileRequestModel`; the AI image request models share the new base `CopyleaksAiImageDetectionBaseRequestModel`. New constants: `CopyleaksAiVideoDetectionModels`, `CopyleaksAiImageDetectionMaskTypes` and `CopyleaksImagePlagiarismMatchTypes`.

#### Client options

`new Copyleaks(options)` takes optional settings (type `CopyleaksOptions`). The product clients take the same options when you create them on their own, for example `new AIDetectionClient(options)`.

- `timeout`: time limit per attempt, in milliseconds. Default: 120000. With retries, a call can take up to (`maxRetries` + 1) times `timeout`, plus the retry delays.
- `maxRetries`, `retryDelay`, `maxRetryDelay`: retry HTTP 429 and 503 responses and connection errors, with exponential backoff and `Retry-After`. Off by default. GET requests are also retried after timeouts. Other requests are never retried after a timeout, or after HTTP 503 without a `Retry-After` header, because the server may already have processed them and charged credits.
- `maxSockets`, `httpAgent`, `httpsAgent`: control the connection pool.
- `axiosInstance`: send the requests through your own axios instance, for example one with interceptors.
- `apiServerUri`, `identityServerUri`: server URLs for this instance only. `CopyleaksConfig` still sets the default for every instance.

#### New request fields

- Scan properties: `scanTimeZone`, `course.id`, `assignment.id`, `institution.id`, `writingFeedback` (`enable` and `score` weights, to run the Grammar Checker in the scan), `overview` (`enable`, `ignoreAIDetection`, `ignorePlagiarismDetection`, `ignoreWritingFeedback`, `ignoreAuthorData`), `internalAiSourceMatch.enable`, `references.validate` (Citation Checker), `aiGeneratedText.sensitivity` and `aiGeneratedText.explain.enable` (AI Logic).
- `webhooks.newResultHeaders` and `webhooks.statusHeaders`.
- `scanning.crossLanguages.languages`, `scanning.include.idPattern`, `scanning.exclude.backlinksDomains` and `scanning.exclude.text`.
- `indexing.copyleaksDb`.
- `pdf.colors.titles`, `pdf.colors.aiDetection` and `pdf.colors.writingFeedback`, and `PdfReportVersion.V3`.
- Submit URL: `verb` and `headers` (`new CopyleaksURLSubmissionModel(url, properties, verb, headers)`).
- Delete: `headers` for the completion webhook (fourth argument of `CopyleaksDeleteRequestModel`).
- Export: the `aiDetection`, `writingFeedback` and `overview` targets and `completionWebhookHeaders` (new arguments 7 to 10 of `CopyleaksExportModel`, or set the fields). `CopyleaksExportedOverviewModel` describes the uploaded overview file.
- AI text detection: `explain` (AI Logic) and `sensitivity` (arguments 4 and 5 of `CopyleaksNaturalLanguageSubmissionModel`).
- AI image detection: `maskType` (`binary`, `heatmap` or `none`) and `objectDetection` (arguments 5 and 6 of `CopyleaksAiImageDetectionRequestModel`).

#### New response and webhook fields

- AI image detection: `isAiDetected`, `detectedObjects`, `result.labels` (heatmap) and `imageInfo.metadata.contentSummary`. Masks and video ranges use the new `CopyleaksRangesModel` (`starts`, `lengths`).
- Text moderation: `modelVersion`.
- Completed webhook: `referencesValidation` (Citation Checker summary), `results.internalAIData`, `url` of each `results.internet` item, and `scannedDocument.totalExcluded`.
- Error webhook: `error.type`, `error.id`, `error.url` and `error.details`.
- AI video and async AI image webhooks: `error` when the scan failed (an `ErrorModel`, the same type as in error webhooks, with `type`, `id`, `code`, `message`, `url` and `details`), and `developerPayload`. A failed scan's webhook has no result fields, so check `error` first. `CopyleaksAiVideoDetectionResponseModel` and `CopyleaksAiImageDetectionResponseModel` declare both fields.
- Exceptions: `status`, `body` and `response` on `CommandException`, `RateLimitException` and `UnderMaintenanceException` (all three extend the new `CopyleaksApiException`), `retryAfter` on `RateLimitException` and `UnderMaintenanceException`, and the new `NetworkException`. See upgrade note 6.

#### Other additions

- The client classes (`AIDetectionClient`, `AiImageDetectionClient`, `AiVideoDetectionClient`, `ImagePlagiarismClient`, `TextModerationClient` and `WritingAssistantClient`) and the `CopyleaksOptions` type are exported from the package root.
- `SubmissionProperties.aiSourceMatch` (`{ enable?: boolean }`, new type `AISourceMatch`): finds online sources that are suspected of containing AI-generated text. It only applies to documents detected as English. When you leave it out, the server default is off.
- `SubmissionProperties.displayLanguage`: the language of the scan's PDF report. Supported values are lowercase: `en`, `es`, `pt`, `fr`, `de`, `it`. The server rejects other values, such as `EN` or `en-US`. When you leave it out, the report is in English. Do not send `null`.
- `SubmissionPDF.reportVersion` (`pdf.reportVersion`): which PDF report version to generate. Supported values are lowercase: `v1`, `v2`, `v3`, `latest`. It overrides `pdf.version` when you send both.

#### Read the AI alert from the completed webhook

- `CompletedWebhookModel.getAIDetectionAlert()` returns the `suspected-ai-text` alert of the scan, or `null` when there is none.
- `CompletedWebhookModel.getAIDetectionResult()` and `AlertsModel.getAIDetectionResult()` decode the alert's `additionalData` JSON string into a `CopyleaksAiTextDetectionResponseModel`. They return `null` when there is no AI alert, when the alert has no data, or when the data is not a JSON object. They throw a `SyntaxError` when `additionalData` is not valid JSON.
- New constant `CopyleaksAlertCodes.SUSPECTED_AI_TEXT` (`'suspected-ai-text'`).
- New classes for the AI text detection result: `CopyleaksAiTextDetectionResponseModel`, `CopyleaksAiTextDetectionResultModel`, `CopyleaksAiTextDetectionMatchModel`, `CopyleaksAiTextDetectionMatchTextModel`, `CopyleaksAiTextDetectionPositionsModel`, `CopyleaksAiTextDetectionSummaryModel`, `CopyleaksAiTextDetectionExplainModel`, `CopyleaksAiTextDetectionPatternsModel`, `CopyleaksAiTextDetectionPatternMatchModel` and `CopyleaksAiTextDetectionPatternStatisticsModel`. Their constructors take the parsed JSON. The summary and positions models also accept the PascalCase keys (`Human`, `Ai`, `Starts`, `Lengths`) that sandbox scans send.
- `new CompletedWebhookModel(req.body)` now turns each item of `notifications.alerts` into an `AlertsModel` instance, so the methods above work on a parsed webhook.
- The root package exports all the new classes and the constant.
- The README and `demo/webhook-server.js` show how to read the alert.

#### First-class TypeScript support

- `package.json` now has a `types` field that points at `dist/index.d.ts`. The type declarations themselves already shipped in `dist/` in 6.0.0, so there is still no `@types` package to install.
- The package ships an ES module build (`dist/esm`) next to the CommonJS build (`dist`), with an `exports` map that picks the right one. See upgrade note 2.
- These methods now return a typed result instead of `Promise<any>`:

  | Method | Result type |
  |---|---|
  | `Copyleaks.startAsync` | `CopyleaksStartResponseModel` |
  | `Copyleaks.getCreditsBalanceAsync` | `CopyleaksCreditsBalanceResponseModel` |
  | `Copyleaks.getUsagesHistoryCsvAsync` | `string` (the CSV text) |
  | `Copyleaks.getReleaseNotesAsync` | `CopyleaksReleaseNotesResponseModel` |
  | `Copyleaks.getSupportedFileTypesAsync` | `CopyleaksSupportedFileTypesResponseModel` |
  | `Copyleaks.getOCRSupportedLanguagesAsync` | `string[]` |
  | `AIDetectionClient.submitNaturalTextAsync` | `CopyleaksAiTextDetectionResponseModel` |
  | `WritingAssistantClient.submitTextAsync` | `CopyleaksWritingAssistantResponseModel` |
  | `WritingAssistantClient.getCorrectionTypesAsync` | `CopyleaksCorrectionTypesResponseModel` |

- The new result types are exported from the package root, together with their parts: `CopyleaksStartResponseScanModel`, `CopyleaksReleaseNoteModel`, `CopyleaksCorrectionTypeModel`, the `CopyleaksWritingAssistant...Model` types and `CopyleaksAiTextDetectionScannedDocumentModel`.
- `CopyleaksAiTextDetectionResponseModel` (new in this release) also describes the result of `submitNaturalTextAsync`, so it gained the optional `scannedDocument` and `scanType` fields of that response. `submitNaturalTextAsync` results include `scannedDocument`, but the `suspected-ai-text` alert data can leave it out, for example for sandbox scans, so check it before you use it. `submitNaturalTextAsync` still returns the plain JSON object, not a class instance, so `instanceof CopyleaksAiTextDetectionResponseModel` is `false` for it. Call `new CopyleaksAiTextDetectionResponseModel(result)` if you need an instance.

### Changed

- The npm package is now `copyleaks`. It was `plagiarism-checker`. See upgrade note 1. `package.json` has a description, keywords and a link to the GitHub repository.
- All requests share one axios instance with keep-alive connections, so repeated calls reuse open connections instead of opening a new TLS connection each time. Each `Copyleaks` instance and its product clients share one pool. Connections idle for 5 seconds are closed, so a connection that the server may have closed is not reused. The SDK no longer uses the global axios instance (upgrade note 8).
- Requests time out after 2 minutes by default (upgrade note 7).
- HTTP 429 throws `RateLimitException` on every method. Before, the submit, start, export and login methods did not check for it.
- Error messages include the HTTP status and the response body. The SDK exceptions set `name` to their class name, for example `CommandException`.
- `getSupportedFileTypesAsync` calls the documented path `/v3/miscellaneous/supported-plagiarism-file-types`. The response is the same.
- The `User-Agent` header is `node-sdk/7.0.0`. It was `node-sdk/3.0`.
- These fields are now optional, as in the API: `pdf.create`, `pdf.title`, `pdf.largeLogo`, `pdf.rtl` and `pdf.version`, the four `ScoreWeights` weights (a weight you leave out counts as 1.0), `aiGeneratedText.detect`, and the `results` and `crawledVersion` arguments of `CopyleaksExportModel`.
- `pdf.version` is deprecated. Use `pdf.reportVersion`.
- `pdf.colors.title` is deprecated. Use `pdf.colors.titles`.
- `CopyleaksAiImageDetectionResponseModel` and `CopyleaksTextModerationResponseModel` accept any parsed JSON in their constructor, so you can build them from a webhook body.
- `axios` is a regular dependency only, no longer also a peer dependency (upgrade note 8). `rimraf`, a build tool, is no longer installed with the SDK.
- `CopyleaksTextModerationRequestModel` accepts at most 16 labels (upgrade note 10).

### Fixed

- `CommandException`, `RateLimitException` and `UnderMaintenanceException` are now thrown. Before, axios rejected every non-2xx response first, and the raw axios error exposed the bearer token. `CommandException` also had the message `[object Object]`.
- The PDF title color is sent as `titles`, the field the API reads. It was sent as `title`, so the API ignored it. Code that still sets `colors.title` now works too.
- The AI image detection result no longer drops fields: it keeps `isAiDetected`, `detectedObjects` and any other field the API returns. The text moderation result keeps `modelVersion` and every other field.
- `scanning.crossLanguages` can be set. The `CrossLanguages` type existed but no property used it.
- `ExportCompletedWebhookModel` keeps every task of the `tasks` list.
- `scannedDocument.totalExcluded` of the completed webhook is declared with the API's spelling. The misspelled `totalExecluded` is deprecated and now holds the same value.
- `getUsagesHistoryCsvAsync` returns the CSV text without first trying to parse it as JSON.
