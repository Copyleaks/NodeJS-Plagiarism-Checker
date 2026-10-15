import { AIGeneratedText } from './AIGeneratedText.js';
import { AISourceMatch } from './AISourceMatch.js';
import { SubmissionActions } from './Actions.js';
import { SubmissionAssignment, SubmissionCourse, SubmissionInstitution } from './AnalyticsIdentifiers.js';
import { SubmissionAuthor } from './Author.js';
import { CustomMetadata } from './CustomMetadata.js';
import { SubmissionExclude } from './Exclude.js';
import { SubmissionFilter } from './Filter.js';
import { SubmissionIndexing } from './Indexing.js';
import { InternalAISourceMatch } from './InternalAISourceMatch.js';
import { SubmissionOverview } from './Overview.js';
import { SubmissionPDF } from './PdfProperties.js';
import { SubmissionReferences } from './References.js';
import { ScanMethodAlgorithm } from './ScanMethods.js';
import { SubmissionScanning } from './Scanning.js';
import { SubmissionSensitiveData } from './SensitiveDataProtection.js';
import { SubmissionWebhooks } from './Webhooks.js';
import { SubmissionWritingFeedback } from './WritingFeedback.js';

export interface SubmissionProperties {
  webhooks: SubmissionWebhooks;
  /** Also produce the report in HTML format, not only text. */
  includeHtml?: boolean;
  /** Returned in the webhooks of the scan. */
  developerPayload?: string;
  /** Return mock results without using credits, to test your integration. Turn it off in production. */
  sandbox?: boolean;
  /** Hours to keep the scan on the Copyleaks servers. It is then deleted. */
  expiration?: number;
  /**
   * Plagiarism sensitivity, 1 to 5: 1 is a faster scan that finds the most plagiarism,
   * 5 a slower one that also finds the smallest instances.
   */
  sensitivityLevel?: number;
  scanMethodAlgorithm?: ScanMethodAlgorithm;

  /** Custom properties of the document in a Copyleaks repository, added to its repository results. */
  customMetadata?: CustomMetadata[];
  /** Check the document for cheating. When found, a scan alert is added to the completed webhook. */
  cheatDetection?: boolean;
  aiGeneratedText?: AIGeneratedText;
  aiSourceMatch?: AISourceMatch;
  /**
   * Language of the PDF report: en, es, pt, fr, de or it, lowercase (the server rejects "EN" or "en-US").
   * Needs `pdf.create`. Leave it undefined to get the default ("en"); do not send null, the server would
   * store it in place of the default.
   */
  displayLanguage?: string;
  /** Scan, only check credits, or only index, see `SubmissionActions`. */
  action?: SubmissionActions;
  author?: SubmissionAuthor;
  filters?: SubmissionFilter;
  scanning?: SubmissionScanning;
  indexing?: SubmissionIndexing;
  exclude?: SubmissionExclude;
  pdf?: SubmissionPDF;
  sensitiveDataProtection?: SubmissionSensitiveData
  /**
   * Time zone of the scan time shown in the PDF report, as a case-sensitive IANA time zone name,
   * for example "America/New_York". Default: the time zone of the user's country, or UTC.
   */
  scanTimeZone?: string;
  course?: SubmissionCourse;
  assignment?: SubmissionAssignment;
  institution?: SubmissionInstitution;
  writingFeedback?: SubmissionWritingFeedback;
  overview?: SubmissionOverview;
  internalAiSourceMatch?: InternalAISourceMatch;
  references?: SubmissionReferences;
}













