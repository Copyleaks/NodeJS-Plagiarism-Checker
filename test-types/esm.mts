// Type-level test: a strict ESM consumer.
// `import ... from 'copyleaks'` resolves through the "import" condition of package.json "exports"
// (dist/esm/index.d.ts). Compiled by `npm run test:types`; never executed.
import {
  AIDetectionClient,
  CommandException,
  CompletedWebhookModel,
  CopyleaksAiImageDetectionAsyncRequestModel,
  CopyleaksAiImageDetectionFileRequestModel,
  CopyleaksAiImageDetectionMaskTypes,
  CopyleaksAiVideoDetectionModels,
  CopyleaksAiVideoDetectionRequestModel,
  CopyleaksAiVideoDetectionResponseModel,
  CopyleaksImagePlagiarismMatchTypes,
  CopyleaksImagePlagiarismRequestModel,
  ErrorWebhookModel,
  ExportCompletedWebhookModel,
  NetworkException,
  RateLimitException,
  UnderMaintenanceException,
  Copyleaks,
  CopyleaksAiImageDetectionModels,
  CopyleaksAiImageDetectionRequestModel,
  CopyleaksAlertCodes,
  CopyleaksConfig,
  CopyleaksDeleteRequestModel,
  CopyleaksExportModel,
  CopyleaksFileOcrSubmissionModel,
  CopyleaksFileSubmissionModel,
  CopyleaksNaturalLanguageSubmissionModel,
  CopyleaksStartErrorHandlings,
  CopyleaksStartRequestModel,
  CopyleaksTextModerationConstants,
  CopyleaksTextModerationLabel,
  CopyleaksTextModerationLanguages,
  CopyleaksTextModerationRequestModel,
  CopyleaksURLSubmissionModel,
  CopyleaksWritingAssistantSubmissionModel,
} from 'copyleaks';
import type {
  CopyleaksAiImageDetectedObjectModel,
  CopyleaksAiImageDetectionResponseModel,
  ErrorModel,
  CopyleaksAiTextDetectionCreditsResponseModel,
  CopyleaksAiTextDetectionFileTypesResponseModel,
  CopyleaksCrossLanguagesResponseModel,
  CopyleaksErrorResponse,
  CopyleaksExportedOverviewModel,
  CopyleaksImagePlagiarismResponseModel,
  CopyleaksOptions,
  CopyleaksRepositoryInfoResponseModel,
  CopyleaksAiTextDetectionResponseModel,
  CopyleaksAiTextDetectionScannedDocumentModel,
  CopyleaksAuthToken,
  CopyleaksCorrectionTypesResponseModel,
  CopyleaksCreditsBalanceResponseModel,
  CopyleaksReleaseNotesResponseModel,
  CopyleaksStartResponseModel,
  CopyleaksSupportedFileTypesResponseModel,
  CopyleaksTextModerationResponseModel,
  CopyleaksWritingAssistantResponseModel,
} from 'copyleaks';
// Folder deep import: types not exported from the root (resolves via the exact "./dist/<folder>" exports key).
import { SubmissionActions } from 'copyleaks/dist/models/submissions/properties';
import type { AISourceMatch, PdfReportColors, SubmissionPDF, SubmissionProperties } from 'copyleaks/dist/models/submissions/properties';
import { PdfReportVersion } from 'copyleaks/dist/models/submissions/properties';

// True only when A and B are the same type. `any` never matches a concrete type.
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;

const WEBHOOK = 'https://example.com/webhook/{STATUS}';

export async function useEveryClient(): Promise<void> {
  CopyleaksConfig.API_SERVER_URI = 'https://api.copyleaks.com';
  const copyleaks = new Copyleaks();

  // Auth
  const token = await copyleaks.loginAsync('user@example.com', 'api-key');
  const tokenTyped: Equal<typeof token, CopyleaksAuthToken> = true;
  copyleaks.verifyAuthToken(token);

  // Plagiarism Checker (authenticity) submissions
  const properties = { sandbox: true, action: SubmissionActions.Scan, webhooks: { status: WEBHOOK } };
  const fileSubmit = await copyleaks.submitFileAsync(token, 'scan1', new CopyleaksFileSubmissionModel('aGVsbG8=', 'a.txt', properties));
  const fileSubmitTyped: Equal<typeof fileSubmit, void> = true;
  const urlSubmit = await copyleaks.submitUrlAsync(token, 'scan2', new CopyleaksURLSubmissionModel('https://example.com', properties));
  const urlSubmitTyped: Equal<typeof urlSubmit, void> = true;
  const ocrSubmit = await copyleaks.submitFileOcrAsync(token, 'scan3', new CopyleaksFileOcrSubmissionModel('en', 'aGVsbG8=', 'a.png', properties));
  const ocrSubmitTyped: Equal<typeof ocrSubmit, void> = true;

  const start = await copyleaks.startAsync(token, new CopyleaksStartRequestModel(['scan1'], CopyleaksStartErrorHandlings.Ignore));
  const startTyped: Equal<typeof start, CopyleaksStartResponseModel> = true;
  const startedIds: string[] = start.success.map((scan) => scan.id);

  const exported = await copyleaks.exportAsync(token, 'scan1', 'export1', new CopyleaksExportModel(`${WEBHOOK}/export`, [], { endpoint: 'https://example.com/crawled', verb: 'POST' }));
  const exportedTyped: Equal<typeof exported, void> = true;
  const deleted = await copyleaks.deleteAsync(token, new CopyleaksDeleteRequestModel([{ id: 'scan1' }]));
  const deletedTyped: Equal<typeof deleted, void> = true;

  // Webhooks
  const resent = await copyleaks.resendWebhookAsync(token, 'scan1');
  const resentTyped: Equal<typeof resent, void> = true;
  const completed = new CompletedWebhookModel({ scannedDocument: undefined });
  const completedScanId: string | undefined = completed.scannedDocument?.scanId;
  // AI alert of the completed webhook
  const aiAlertCode: Equal<typeof CopyleaksAlertCodes.SUSPECTED_AI_TEXT, 'suspected-ai-text'> = true;
  const aiAlertResult = completed.getAIDetectionResult();
  const aiAlertResultTyped: Equal<typeof aiAlertResult, CopyleaksAiTextDetectionResponseModel | null> = true;
  const aiAlertDocTyped: Equal<CopyleaksAiTextDetectionResponseModel['scannedDocument'], CopyleaksAiTextDetectionScannedDocumentModel | undefined> = true;
  const aiAlertShare: number | undefined = aiAlertResult?.summary.ai;
  // New submit properties
  const aiSourceMatch: AISourceMatch = { enable: true };
  const newProperties: Pick<SubmissionProperties, 'aiSourceMatch' | 'displayLanguage'> = { aiSourceMatch, displayLanguage: 'en' };

  // Account and public endpoints
  const credits = await copyleaks.getCreditsBalanceAsync(token);
  const creditsTyped: Equal<typeof credits, CopyleaksCreditsBalanceResponseModel> = true;
  const amount: number = credits.Amount;
  const usageCsv = await copyleaks.getUsagesHistoryCsvAsync(token, '01-01-2026', '31-01-2026');
  const usageCsvTyped: Equal<typeof usageCsv, string> = true;
  const releaseNotes = await copyleaks.getReleaseNotesAsync();
  const releaseNotesTyped: Equal<typeof releaseNotes, CopyleaksReleaseNotesResponseModel> = true;
  const latestNoteDate: string | undefined = releaseNotes.updates[0]?.date;
  const fileTypes = await copyleaks.getSupportedFileTypesAsync();
  const fileTypesTyped: Equal<typeof fileTypes, CopyleaksSupportedFileTypesResponseModel> = true;
  const ocrFileTypes: string[] = fileTypes.ocr;
  const ocrLanguages = await copyleaks.getOCRSupportedLanguagesAsync();
  const ocrLanguagesTyped: Equal<typeof ocrLanguages, string[]> = true;

  // AI Text Detection
  const aiText = await copyleaks.aiDetectionClient.submitNaturalTextAsync(token, 'scan4', new CopyleaksNaturalLanguageSubmissionModel('Lions are social animals.', true));
  const aiTextTyped: Equal<typeof aiText, CopyleaksAiTextDetectionResponseModel> = true;
  const aiShare: number = aiText.summary.ai;
  const firstAiCharStarts: number[] | undefined = aiText.results[0]?.matches[0]?.text.chars.starts;
  // @ts-expect-error -- the response is typed, so unknown fields are rejected
  aiText.summary.notAField;

  // AI Image Detection
  const aiImage = await copyleaks.aiImageDetectionClient.submitAsync(token, 'scan5', new CopyleaksAiImageDetectionRequestModel('aGVsbG8=', 'a.png', CopyleaksAiImageDetectionModels.AI_IMAGE_1_ULTRA, true));
  const aiImageTyped: Equal<typeof aiImage, CopyleaksAiImageDetectionResponseModel> = true;
  const aiImageShare: number = aiImage.summary.ai;

  // Grammar Checker (Writing Assistant)
  const grammar = await copyleaks.writingAssistantClient.submitTextAsync(token, 'scan6', new CopyleaksWritingAssistantSubmissionModel('Lions is social animals.', true));
  const grammarTyped: Equal<typeof grammar, CopyleaksWritingAssistantResponseModel> = true;
  const overallScore: number = grammar.score.corrections.overallScore;
  const correctionTypes = await copyleaks.writingAssistantClient.getCorrectionTypesAsync(token, 'en');
  const correctionTypesTyped: Equal<typeof correctionTypes, CopyleaksCorrectionTypesResponseModel> = true;
  const correctionTitles: string[] = correctionTypes.correctionTypes.map((type) => type.title);

  // Text Moderation
  const moderation = await copyleaks.textModerationClient.submitTextAsync(token, 'scan7', new CopyleaksTextModerationRequestModel({
    text: 'Some text to moderate.',
    sandbox: true,
    language: CopyleaksTextModerationLanguages.ENGLISH,
    labels: [new CopyleaksTextModerationLabel(CopyleaksTextModerationConstants.TOXIC_V1)],
  }));
  const moderationTyped: Equal<typeof moderation, CopyleaksTextModerationResponseModel> = true;

  // Errors
  try {
    await copyleaks.getReleaseNotesAsync();
  } catch (error) {
    if (error instanceof CommandException) {
      const message: string = error.message;
      const status: number | undefined = error.status;
      const body: unknown = error.body;
      const response: CopyleaksErrorResponse | undefined = error.response;
      const statusFromResponse: number | undefined = error.response?.status;
    } else if (error instanceof RateLimitException) {
      const retryAfter: number | undefined = error.retryAfter;
    } else if (error instanceof UnderMaintenanceException) {
      const status: number | undefined = error.status;
    } else if (error instanceof NetworkException) {
      const isTimeout: boolean = error.isTimeout;
      const code: string | undefined = error.code;
    }
  }
}

export async function useNewApi(): Promise<void> {
  // Options
  const options: CopyleaksOptions = { timeout: 30000, maxSockets: 10, maxRetries: 2, retryDelay: 500, maxRetryDelay: 10000, apiServerUri: 'https://api.copyleaks.com' };
  const copyleaks = new Copyleaks(options);
  const standalone = new AIDetectionClient({ timeout: 5000 });
  const token = await copyleaks.loginAsync('user@example.com', 'api-key');

  // New scan properties
  const properties: SubmissionProperties = {
    webhooks: { status: WEBHOOK, statusHeaders: [['k', 'v']], newResultHeaders: [['k', 'v']] },
    scanTimeZone: 'America/New_York',
    course: { id: 'c' }, assignment: { id: 'a' }, institution: { id: 'i' },
    writingFeedback: { enable: true, score: { grammarScoreWeight: 0 } },
    overview: { enable: true, ignoreAuthorData: true },
    internalAiSourceMatch: { enable: true },
    references: { validate: true },
    aiGeneratedText: { detect: true, sensitivity: 2, explain: { enable: true } },
    scanning: { include: { idPattern: 'a*' }, exclude: { backlinksDomains: ['x.com'], text: ['abc'] }, crossLanguages: { languages: [{ code: 'fr' }] } },
    indexing: { copyleaksDb: true },
    pdf: { create: true, reportVersion: 'v3', colors: { titles: '#000000', aiDetection: '#111111', writingFeedback: '#222222' } },
  };
  const pdfWithoutDeprecatedFields: SubmissionPDF = { create: true };
  const deprecatedVersion: SubmissionPDF = { version: PdfReportVersion.V3 };
  const deprecatedTitleColor: PdfReportColors = { title: '#000000' };
  await copyleaks.submitUrlAsync(token, 'scan1', new CopyleaksURLSubmissionModel('https://example.com', properties, 'POST', [['Cookie', 'a=b']]));
  await copyleaks.deleteAsync(token, new CopyleaksDeleteRequestModel([{ id: 'scan1' }], false, WEBHOOK, [['k', 'v']]));
  const exportModel = new CopyleaksExportModel(WEBHOOK);
  exportModel.aiDetection = { endpoint: 'https://example.com/ai', verb: 'POST' };
  exportModel.overview = { endpoint: 'https://example.com/overview', verb: 'POST' };
  await copyleaks.exportAsync(token, 'scan1', 'export1', exportModel);
  const overviewFile: CopyleaksExportedOverviewModel = { overview: '# Overview', modelVersion: 'v1' };

  // AI text: explain, sensitivity and credits
  await copyleaks.aiDetectionClient.submitNaturalTextAsync(token, 'scan2', new CopyleaksNaturalLanguageSubmissionModel('text', true, 'en', true, 3));
  const aiCredits = await standalone.getCreditsBalanceAsync(token);
  const aiCreditsTyped: Equal<typeof aiCredits, CopyleaksAiTextDetectionCreditsResponseModel> = true;
  const creditCount: number = aiCredits.credits;

  // AI image: mask type, object detection, multipart upload and async submit
  const aiImage = await copyleaks.aiImageDetectionClient.submitAsync(token, 'scan3',
    new CopyleaksAiImageDetectionRequestModel('aGk=', 'a.png', CopyleaksAiImageDetectionModels.AI_IMAGE_1_ULTRA, true, CopyleaksAiImageDetectionMaskTypes.HEATMAP, [{ object: 'face' }]));
  const isAi: boolean | undefined = aiImage.isAiDetected;
  const objects: CopyleaksAiImageDetectedObjectModel[] | undefined = aiImage.detectedObjects;
  const labels: number[] | undefined = aiImage.result?.labels;
  const contentSummary: string | undefined = aiImage.imageInfo.metadata?.contentSummary;
  // @ts-expect-error -- result is missing when maskType is "none"
  aiImage.result.starts;
  const aiImageFile = await copyleaks.aiImageDetectionClient.submitFileAsync(token, 'scan4',
    new CopyleaksAiImageDetectionFileRequestModel(new Uint8Array([1, 2, 3]), 'a.png', CopyleaksAiImageDetectionModels.AI_IMAGE_1_ULTRA, true));
  const aiImageFileTyped: Equal<typeof aiImageFile, CopyleaksAiImageDetectionResponseModel> = true;
  const asyncSubmit = await copyleaks.aiImageDetectionClient.submitUrlAsync(token, 'scan5', new CopyleaksAiImageDetectionAsyncRequestModel({
    url: 'https://example.com/a.png', fileName: 'a.png', model: CopyleaksAiImageDetectionModels.AI_IMAGE_1_ULTRA, webhooks: { url: WEBHOOK }, sandbox: true,
  }));
  const asyncSubmitTyped: Equal<typeof asyncSubmit, void> = true;

  // Image Plagiarism Detector
  const imagePlagiarism = await copyleaks.imagePlagiarismClient.submitAsync(token, 'scan6', new CopyleaksImagePlagiarismRequestModel(new Uint8Array([1]), 'a.jpg', true));
  const imagePlagiarismTyped: Equal<typeof imagePlagiarism, CopyleaksImagePlagiarismResponseModel> = true;
  const fullMatches = imagePlagiarism.matches.internet.filter((m) => m.matchType === CopyleaksImagePlagiarismMatchTypes.FULL);
  const pageUrl: string | undefined = imagePlagiarism.matches.internet[0]?.webPages?.[0]?.url;

  // AI Video Detector
  const video = await copyleaks.aiVideoDetectionClient.submitAsync(token, 'scan7', new CopyleaksAiVideoDetectionRequestModel({
    url: 'https://example.com/v.mp4', filename: 'v.mp4', model: CopyleaksAiVideoDetectionModels.AI_VIDEO_1_PRO, webhooks: { url: WEBHOOK }, sandbox: true,
  }));
  const videoTyped: Equal<typeof video, void> = true;
  const videoResult = new CopyleaksAiVideoDetectionResponseModel({ isAiDetected: true });
  const overallRatio: number = videoResult.summary.overallAIRatio;
  const videoError: ErrorModel | undefined = videoResult.error;
  const videoErrorCode: number | undefined = videoResult.error?.code;
  const videoErrorParam: string | undefined = videoResult.error?.details?.[0]?.param;
  const videoPayload: string | undefined = videoResult.developerPayload;
  const imageError = aiImage.error;
  const imagePayload: string | undefined = aiImage.developerPayload;
  const imageErrorTyped: Equal<typeof imageError, ErrorModel | undefined> = true;

  // Lookups
  const crossLanguages = await copyleaks.getAllowedCrossLanguagesAsync();
  const crossLanguagesTyped: Equal<typeof crossLanguages, CopyleaksCrossLanguagesResponseModel> = true;
  const resultCodes: string[] = Object.values(crossLanguages.resultLanguages);
  const englishCode: string | undefined = crossLanguages.documentLanguages['english'];
  const aiFileTypes = await copyleaks.getSupportedAiTextDetectionFileTypesAsync();
  const aiFileTypesTyped: Equal<typeof aiFileTypes, CopyleaksAiTextDetectionFileTypesResponseModel> = true;
  const repository = await copyleaks.getRepositoryInfoAsync(token, 'repo1');
  const repositoryTyped: Equal<typeof repository, CopyleaksRepositoryInfoResponseModel> = true;

  // Webhooks
  const tasks = new ExportCompletedWebhookModel({}).tasks;
  const firstTaskStatus: number | undefined = tasks?.[0]?.httpStatusCode;
  const errorDetails = new ErrorWebhookModel({}).error?.details?.[0]?.param;
  const completed = new CompletedWebhookModel({});
  const totalExcluded: number | undefined = completed.scannedDocument?.totalExcluded;
  const referencesTotal: number | undefined = completed.referencesValidation?.summary?.total;
  const internalAiWords: number | undefined = completed.results?.internalAIData?.[0]?.matchedWords;
  const matchedWords: number | undefined = completed.results?.internet?.[0]?.matchedWords;
  const resultUrl: string | undefined = completed.results?.internet?.[0]?.url;
}
