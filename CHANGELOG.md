# Changelog

## 7.0.0

This is the first release under the new npm name `copyleaks`. It replaces the `plagiarism-checker` package, whose last version is 6.0.0. Class and method names are the same as in 6.0.0. The package name, the module entry points and some TypeScript types changed, so this is a major version.

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

Folders without an `index.js`, such as `copyleaks/dist/models`, did not resolve in 6.0.0 and still do not.

The package root does not export some types, so you still need a deep import for them:

- From the folder `copyleaks/dist/models/submissions/properties`: the submission property interfaces, such as `SubmissionProperties`, `SubmissionPDF` and `AISourceMatch`, and the `SubmissionActions` and `SubmissionFilterDomainsMode` enums.
- From their own file in that folder: `AIGeneratedText`, `CrossLanguages`, `CustomMetadata`, `ExcludeCode`, `Language`, `PdfReportColors` and `PdfReportVersion`, each in a file of the same name (for example `.../properties/PdfReportVersion`), plus `SubmissionIndexingRepository` (`.../properties/IndexingRepository`), `MaskingPolicy` (`.../properties/Policies`) and `ScanMethodAlgorithm` (`.../properties/ScanMethods`).

For TypeScript: with `moduleResolution` set to `node16`, `nodenext` or `bundler`, TypeScript resolves through the same `exports` map. With the older `node` setting, it ignores the map and finds the declarations through the new `types` field.

#### 3. Results are typed

Nine methods that returned `Promise<any>` now return a typed result (see BAC-5384 below). The JSON you get at runtime is the same. TypeScript code that reads a field the type does not declare, or assigns a result to an incompatible type, now fails to compile. Use the declared fields, or cast the result if you rely on an undocumented field.

#### 4. Optional alert fields

`AlertsModel.helpLink` and `AlertsModel.additionalData` are now optional (`string | undefined`), because the server does not send them for every alert. With `strictNullChecks`, check them before you use them.

#### 5. Load the SDK one way per process

If your app loads the SDK with `import` and one of your dependencies loads it with `require`, Node.js loads two separate copies. Settings such as `CopyleaksConfig.API_SERVER_URI` that you set through one copy do not apply to the other, and `instanceof CommandException` does not match errors thrown by the other copy. Use either `import` or `require` for the SDK in one process.

### Changes by ticket

#### BAC-5378: New submit properties (#45)

- `SubmissionProperties.aiSourceMatch` (`{ enable?: boolean }`, new type `AISourceMatch`): finds online sources that are suspected of containing AI-generated text. It only applies to documents detected as English. When you leave it out, the server default is off.
- `SubmissionProperties.displayLanguage`: the language of the scan's PDF report. Supported values are lowercase: `en`, `es`, `pt`, `fr`, `de`, `it`. The server rejects other values, such as `EN` or `en-US`. When you leave it out, the report is in English. Do not send `null`.
- `SubmissionPDF.reportVersion` (`pdf.reportVersion`): which PDF report version to generate. Supported values are lowercase: `v1`, `v2`, `v3`, `latest`. It overrides `pdf.version` when you send both.
- `AISourceMatch` is exported from `copyleaks/dist/models/submissions/properties`.

#### BAC-5392: Read the AI alert from the completed webhook (#46)

- `CompletedWebhookModel.getAIDetectionAlert()` returns the `suspected-ai-text` alert of the scan, or `null` when there is none.
- `CompletedWebhookModel.getAIDetectionResult()` and `AlertsModel.getAIDetectionResult()` decode the alert's `additionalData` JSON string into a `CopyleaksAiTextDetectionResponseModel`. They return `null` when there is no AI alert, when the alert has no data, or when the data is not a JSON object. They throw a `SyntaxError` when `additionalData` is not valid JSON.
- New constant `CopyleaksAlertCodes.SUSPECTED_AI_TEXT` (`'suspected-ai-text'`).
- New classes for the AI text detection result: `CopyleaksAiTextDetectionResponseModel`, `CopyleaksAiTextDetectionResultModel`, `CopyleaksAiTextDetectionMatchModel`, `CopyleaksAiTextDetectionMatchTextModel`, `CopyleaksAiTextDetectionPositionsModel`, `CopyleaksAiTextDetectionSummaryModel`, `CopyleaksAiTextDetectionExplainModel`, `CopyleaksAiTextDetectionPatternsModel`, `CopyleaksAiTextDetectionPatternMatchModel` and `CopyleaksAiTextDetectionPatternStatisticsModel`. Their constructors take the parsed JSON. The summary and positions models also accept the PascalCase keys (`Human`, `Ai`, `Starts`, `Lengths`) that sandbox scans send.
- `new CompletedWebhookModel(req.body)` now turns each item of `notifications.alerts` into an `AlertsModel` instance, so the methods above work on a parsed webhook.
- The root package exports all the new classes and the constant.
- The README and `demo/webhook-server.js` show how to read the alert.

#### BAC-5374: Package renamed to `copyleaks` (#51)

- The npm package is now `copyleaks`. It was `plagiarism-checker`. See upgrade note 1.
- `package.json` has a description, keywords and a link to the GitHub repository.
- The README lists the products this SDK covers: AI Text Detection, AI Image Detection, Plagiarism Checker, Grammar Checker and Text Moderation. The Writing Assistant section is now called "Grammar Checker (WritingAssistantClient)". No class or method was renamed.

#### BAC-5384: First-class TypeScript support (#52)

- `package.json` now has a `types` field that points at `dist/index.d.ts`. The type declarations themselves already shipped in `dist/` in 6.0.0, so there is still no `@types` package to install.
- The package ships an ES module build (`dist/esm`) next to the CommonJS build (`dist`), with an `exports` map that picks the right one. See upgrade note 2.
- For contributors: `dist/` is no longer committed to the repository. `npm install` builds it through the new `prepare` script, and so do `npm pack` and `npm publish`, so a release always ships a fresh build of `src/`.
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
- `CopyleaksAiTextDetectionResponseModel` (from BAC-5392) also describes the result of `submitNaturalTextAsync`, so it gained the optional `scannedDocument` and `scanType` fields of that response. `submitNaturalTextAsync` results include `scannedDocument`, but the `suspected-ai-text` alert data can leave it out, for example for sandbox scans, so check it before you use it. `submitNaturalTextAsync` still returns the plain JSON object, not a class instance, so `instanceof CopyleaksAiTextDetectionResponseModel` is `false` for it. Call `new CopyleaksAiTextDetectionResponseModel(result)` if you need an instance.
- The SDK is now built with TypeScript 5.9. This only affects contributors. The runtime dependencies did not change.
