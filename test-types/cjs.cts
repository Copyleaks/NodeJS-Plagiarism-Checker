// Type-level test: a strict CommonJS consumer.
// `require('copyleaks')` resolves through the "require" condition of package.json "exports"
// (dist/index.d.ts). Compiled by `npm run test:types`; never executed.
import copyleaksSdk = require('copyleaks');
// Folder deep import: types not exported from the root (resolves via the exact "./dist/<folder>" exports key).
import submissionProperties = require('copyleaks/dist/models/submissions/properties');

// True only when A and B are the same type. `any` never matches a concrete type.
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;

export async function useEveryClient(): Promise<void> {
  const copyleaks = new copyleaksSdk.Copyleaks();

  // Auth
  const token = await copyleaks.loginAsync('user@example.com', 'api-key');
  const tokenTyped: Equal<typeof token, copyleaksSdk.CopyleaksAuthToken> = true;

  // Plagiarism Checker (authenticity)
  const submission = new copyleaksSdk.CopyleaksURLSubmissionModel('https://example.com', {
    sandbox: true,
    action: submissionProperties.SubmissionActions.CheckCredits,
    aiSourceMatch: { enable: true },
    displayLanguage: 'en',
    webhooks: { status: 'https://example.com/webhook/{STATUS}' },
  });
  const submitted = await copyleaks.submitUrlAsync(token, 'scan1', submission);
  const submittedTyped: Equal<typeof submitted, void> = true;
  const start = await copyleaks.startAsync(token, new copyleaksSdk.CopyleaksStartRequestModel(['scan1']));
  const startTyped: Equal<typeof start, copyleaksSdk.CopyleaksStartResponseModel> = true;
  const aiSourceMatch: submissionProperties.AISourceMatch = { enable: false };

  // AI alert of the completed webhook
  const completed = new copyleaksSdk.CompletedWebhookModel({ notifications: { alerts: [{ code: copyleaksSdk.CopyleaksAlertCodes.SUSPECTED_AI_TEXT }] } });
  const aiAlertCode: Equal<typeof copyleaksSdk.CopyleaksAlertCodes.SUSPECTED_AI_TEXT, 'suspected-ai-text'> = true;
  const aiAlert = completed.getAIDetectionAlert();
  const aiAlertTyped: Equal<typeof aiAlert, copyleaksSdk.AlertsModel | null> = true;
  const aiAlertResult = completed.getAIDetectionResult();
  const aiAlertResultTyped: Equal<typeof aiAlertResult, copyleaksSdk.CopyleaksAiTextDetectionResponseModel | null> = true;
  const aiAlertScanId: string | undefined = aiAlertResult?.scannedDocument?.scanId;

  // Account and public endpoints
  const credits = await copyleaks.getCreditsBalanceAsync(token);
  const creditsTyped: Equal<typeof credits, copyleaksSdk.CopyleaksCreditsBalanceResponseModel> = true;
  const releaseNotes = await copyleaks.getReleaseNotesAsync();
  const releaseNotesTyped: Equal<typeof releaseNotes, copyleaksSdk.CopyleaksReleaseNotesResponseModel> = true;
  const fileTypes = await copyleaks.getSupportedFileTypesAsync();
  const fileTypesTyped: Equal<typeof fileTypes, copyleaksSdk.CopyleaksSupportedFileTypesResponseModel> = true;

  // AI Text Detection
  const aiText = await copyleaks.aiDetectionClient.submitNaturalTextAsync(token, 'scan2', new copyleaksSdk.CopyleaksNaturalLanguageSubmissionModel('Lions are social animals.', true));
  const aiTextTyped: Equal<typeof aiText, copyleaksSdk.CopyleaksAiTextDetectionResponseModel> = true;

  // AI Image Detection
  const aiImage = await copyleaks.aiImageDetectionClient.submitAsync(token, 'scan3', new copyleaksSdk.CopyleaksAiImageDetectionRequestModel('aGVsbG8=', 'a.png', copyleaksSdk.CopyleaksAiImageDetectionModels.AI_IMAGE_1_ULTRA, true));
  const aiImageTyped: Equal<typeof aiImage, copyleaksSdk.CopyleaksAiImageDetectionResponseModel> = true;

  // Grammar Checker (Writing Assistant)
  const grammar = await copyleaks.writingAssistantClient.submitTextAsync(token, 'scan4', new copyleaksSdk.CopyleaksWritingAssistantSubmissionModel('Lions is social animals.', true));
  const grammarTyped: Equal<typeof grammar, copyleaksSdk.CopyleaksWritingAssistantResponseModel> = true;
  const correctionTypes = await copyleaks.writingAssistantClient.getCorrectionTypesAsync(token, 'en');
  const correctionTypesTyped: Equal<typeof correctionTypes, copyleaksSdk.CopyleaksCorrectionTypesResponseModel> = true;

  // Text Moderation
  const moderation = await copyleaks.textModerationClient.submitTextAsync(token, 'scan5', new copyleaksSdk.CopyleaksTextModerationRequestModel({
    text: 'Some text to moderate.',
    sandbox: true,
    labels: [new copyleaksSdk.CopyleaksTextModerationLabel(copyleaksSdk.CopyleaksTextModerationConstants.TOXIC_V1)],
  }));
  const moderationTyped: Equal<typeof moderation, copyleaksSdk.CopyleaksTextModerationResponseModel> = true;
  const moderationModel: string | undefined = moderation.modelVersion;

  // New endpoints
  const configured = new copyleaksSdk.Copyleaks({ timeout: 60000, maxRetries: 1 });
  const imagePlagiarism = await configured.imagePlagiarismClient.submitAsync(token, 'scan6', new copyleaksSdk.CopyleaksImagePlagiarismRequestModel(new Uint8Array([1]), 'a.png', true));
  const imagePlagiarismTyped: Equal<typeof imagePlagiarism, copyleaksSdk.CopyleaksImagePlagiarismResponseModel> = true;
  const video = await configured.aiVideoDetectionClient.submitAsync(token, 'scan7', new copyleaksSdk.CopyleaksAiVideoDetectionRequestModel({
    url: 'https://example.com/v.mp4', filename: 'v.mp4', model: copyleaksSdk.CopyleaksAiVideoDetectionModels.AI_VIDEO_1_PRO, webhooks: { url: 'https://example.com/hook' },
  }));
  const videoTyped: Equal<typeof video, void> = true;
  const asyncImage = await configured.aiImageDetectionClient.submitUrlAsync(token, 'scan8', new copyleaksSdk.CopyleaksAiImageDetectionAsyncRequestModel({
    url: 'https://example.com/a.png', fileName: 'a.png', model: copyleaksSdk.CopyleaksAiImageDetectionModels.AI_IMAGE_1_ULTRA, webhooks: { url: 'https://example.com/hook' },
  }));
  const asyncImageTyped: Equal<typeof asyncImage, void> = true;
  const aiCredits = await configured.aiDetectionClient.getCreditsBalanceAsync(token);
  const aiCreditsTyped: Equal<typeof aiCredits, copyleaksSdk.CopyleaksAiTextDetectionCreditsResponseModel> = true;
  const crossLanguages = await configured.getAllowedCrossLanguagesAsync();
  const crossLanguagesTyped: Equal<typeof crossLanguages, copyleaksSdk.CopyleaksCrossLanguagesResponseModel> = true;
  const aiFileTypes = await configured.getSupportedAiTextDetectionFileTypesAsync();
  const aiFileTypesTyped: Equal<typeof aiFileTypes, copyleaksSdk.CopyleaksAiTextDetectionFileTypesResponseModel> = true;
  const repository = await configured.getRepositoryInfoAsync(token, 'repo1');
  const repositoryTyped: Equal<typeof repository, copyleaksSdk.CopyleaksRepositoryInfoResponseModel> = true;
  const properties: submissionProperties.SubmissionProperties = {
    webhooks: { status: 'https://example.com/webhook/{STATUS}' },
    writingFeedback: { enable: true },
    overview: { enable: true },
    references: { validate: true },
    scanning: { crossLanguages: { languages: [{ code: 'fr' }] } },
  };
  const networkError = new copyleaksSdk.NetworkException('timeout', { code: 'ECONNABORTED', isTimeout: true });
  const isTimeout: boolean = networkError.isTimeout;
}
