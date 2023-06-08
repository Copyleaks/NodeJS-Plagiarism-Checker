/*
 The MIT License(MIT)

 Copyright(c) 2016 Copyleaks LTD (https://copyleaks.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/

import { AIGeneratedText } from './AIGeneratedText';
import { SubmissionActions } from './Actions';
import { SubmissionAuthor } from './Author';
import { CustomMetadata } from './CustomMetadata';
import { SubmissionExclude } from './Exclude';
import { SubmissionFilter } from './Filter';
import { SubmissionIndexing } from './Indexing';
import { SubmissionPDF } from './PdfProperties';
import { ScanMethodAlgorithm } from './ScanMethods';
import { SubmissionScanning } from './Scanning';
import { SubmissionSensitiveData } from './SensitiveDataProtection';
import { SubmissionWebhooks } from './Webhooks';

export interface SubmissionProperties {
  webhooks: SubmissionWebhooks;
  /**
   * By default, Copyleaks will present the report in text format. If set to true, Copyleaks will also include html format.
   */
  includeHtml?: boolean;
  /**
   * Add custom developer payload that will then be provided on the webhooks.
   * https://api.copyleaks.com/documentation/v3/webhooks
   */
  developerPayload?: string;
  /**
   * You can test the integration with the Copyleaks API for free using the sandbox mode.
   *
   * You will be able to submit content for a scan and get back mock results, simulating the way Copyleaks will work to make sure that you successfully integrated with the API.
   *
   * Turn off this feature on production environment.
   */
  sandbox?: boolean;
  /**
   * Specify the maximum life span of a scan in hours on the Copyleaks servers.
   *
   * When expired, the scan will be deleted and will no longer be accessible.
   */
  expiration?: number;
  /**
   * You can control the level of plagiarism sensitivity that will be identified according to the speed of the scan.
   * If you prefer a faster scan with the results that contains the highest amount of plagiarism choose 1,
   * and if a slower, more comprehensive scan, that will also detect the smallest instances choose 5.
   */
  sensitivityLevel?: number;
  /**
   * Choose the algorithm goal. You can set this value depending on your use-case.
   */
  scanMethodAlgorithm?: ScanMethodAlgorithm;

  /**
   * Add custom properties that will be attached to your document in a Copyleaks repository.
   * 
   * If this document is found as a repository result, your custom properties will be added to the result.
   */
  customMetadata?: CustomMetadata[];
  /**
   * When set to true the submitted document will be checked for cheating. If a cheating will be detected, a scan alert will be added to the completed webhook.
   */
  cheatDetection?: boolean;
/**
 * Detects whether the text was written by an AI.
 * 
 * Upon detection a scan alert of type "suspected-ai-text" will be added to the scan completion webhook.
 */
  aiGeneratedText?: AIGeneratedText;
  /**
   * Types of content submission actions.
   *
   * * Possible values:
   *  * Scan: Start scan immediately.
   *  * Check Credits: Check how many credits will be used for this scan.
   *  * Index Only: Only index the file in the Copyleaks internal database. No credits will be used.
   */
  action?: SubmissionActions;
  /**
   * Check inner properties for more details.
   */
  author?: SubmissionAuthor;
  /**
   * Check inner properties for more details.
   */
  filters?: SubmissionFilter;
  /**
   * Check inner properties for more details.
   */
  scanning?: SubmissionScanning;
  /**
   * Check inner properties for more details.
   */
  indexing?: SubmissionIndexing;
  /**
   * Check inner properties for more details.
   */
  exclude?: SubmissionExclude;
  /**
   * Check inner properties for more details.
   */
  pdf?: SubmissionPDF;
  /**
   * Check inner properties for more details.
   */
  sensitiveDataProtection?: SubmissionSensitiveData
}













