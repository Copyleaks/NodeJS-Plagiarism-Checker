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
}
