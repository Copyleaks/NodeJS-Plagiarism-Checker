// Type-level test: a strict ESM consumer.
// `import ... from 'copyleaks'` resolves through the "import" condition of package.json "exports"
// (dist/esm/index.d.ts). Compiled by `npm run test:types`; never executed.
import {
  CommandException,
  CompletedWebhookModel,
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
  CopyleaksAiImageDetectionResponseModel,
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
import type { AISourceMatch, SubmissionPDF, SubmissionProperties } from 'copyleaks/dist/models/submissions/properties';

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
  // AI alert of the completed webhook (BAC-5392)
  const aiAlertCode: Equal<typeof CopyleaksAlertCodes.SUSPECTED_AI_TEXT, 'suspected-ai-text'> = true;
  const aiAlertResult = completed.getAIDetectionResult();
  const aiAlertResultTyped: Equal<typeof aiAlertResult, CopyleaksAiTextDetectionResponseModel | null> = true;
  const aiAlertDocTyped: Equal<CopyleaksAiTextDetectionResponseModel['scannedDocument'], CopyleaksAiTextDetectionScannedDocumentModel | undefined> = true;
  const aiAlertShare: number | undefined = aiAlertResult?.summary.ai;
  // New submit properties (BAC-5378)
  const aiSourceMatch: AISourceMatch = { enable: true };
  const newProperties: Pick<SubmissionProperties, 'aiSourceMatch' | 'displayLanguage'> = { aiSourceMatch, displayLanguage: 'en' };
  // PDF version is optional (deprecated) so reportVersion can be used alone (BAC-6814)
  const pdfReportV3: Pick<SubmissionPDF, 'create' | 'version' | 'reportVersion'> = { create: true, reportVersion: 'v3' };

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
    }
  }
}
