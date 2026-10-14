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

import type { CopyleaksAsyncWebhookErrorModel } from '../CopyleaksAsyncWebhookErrorModel.js';

/**
 * The AI Video Detector result that Copyleaks POSTs to your webhook (`webhooks.url` of the request).
 * Use `new CopyleaksAiVideoDetectionResponseModel(req.body)` in your webhook handler.
 * Check `error` first: when the scan failed, the webhook has `error` and `developerPayload` only, and no result fields.
 * Positions and lengths are in milliseconds.
 * For more info: https://docs.copyleaks.com/reference/data-types/ai-detector/ai-video-detection-response
 */
export class CopyleaksAiVideoDetectionResponseModel {
  /** The version of the AI detection model used for the analysis. */
  public model!: string;
  /** AI-detected segments of the audio track. */
  public audioResult?: CopyleaksAiVideoDetectionTrackResultModel;
  /** AI-detected segments of the visual track. */
  public visualResult?: CopyleaksAiVideoDetectionTrackResultModel;
  /** Overall AI ratios, calculated from the scored segments only. */
  public summary!: CopyleaksAiVideoDetectionSummaryModel;
  /** Whether the video was determined to contain AI-generated content. */
  public isAiDetected!: boolean;
  /** Information about the analyzed video. */
  public videoInfo?: CopyleaksAiVideoDetectionVideoInfoModel;
  /** Metadata about the scan operation. */
  public scannedVideo?: CopyleaksAiVideoDetectionScannedVideoModel;
  /** Why the scan failed. Set only when the scan failed, and then the result fields are missing. */
  public error?: CopyleaksAsyncWebhookErrorModel;
  /** The `developerPayload` of the request, unchanged. */
  public developerPayload?: string;

  /**
   * @param init The parsed webhook JSON. Every field is copied, including fields this SDK version does not declare.
   */
  constructor(init?: Partial<CopyleaksAiVideoDetectionResponseModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}

/**
 * AI-detected segments of one track (audio or visual), in milliseconds.
 */
export interface CopyleaksAiVideoDetectionTrackResultModel {
  /** Start positions of the AI-detected segments, in milliseconds. */
  starts: number[];
  /** Durations of the AI-detected segments, in milliseconds, one for each start position. */
  lengths: number[];
  /** Ranges of the track that were not scored and are left out of the AI ratios. */
  exclude?: CopyleaksAiVideoDetectionRangesModel;
}

/**
 * Time ranges of a track, in milliseconds.
 */
export interface CopyleaksAiVideoDetectionRangesModel {
  /** Start positions of the ranges, in milliseconds. */
  starts: number[];
  /** Durations of the ranges, in milliseconds. */
  lengths: number[];
}

/**
 * Overall AI ratios of a video, each from 0.0 to 1.0.
 */
export interface CopyleaksAiVideoDetectionSummaryModel {
  /** AI-detected audio duration divided by the audible duration. */
  audioAIRatio: number;
  /** AI-detected visual duration divided by the visible duration. */
  visualAIRatio: number;
  /** Combined AI ratio across the audio and visual tracks. */
  overallAIRatio: number;
}

/**
 * Information about the analyzed video.
 */
export interface CopyleaksAiVideoDetectionVideoInfoModel {
  /** Duration of the video, in seconds. */
  duration?: number;
  /** Metadata extracted from the video file, for example C2PA provenance data. */
  metadata?: CopyleaksAiVideoDetectionMetadataModel;
}

/**
 * Metadata extracted from the video file.
 */
export interface CopyleaksAiVideoDetectionMetadataModel {
  /** When the video was created, if available. */
  issuedTime?: string;
  /** The AI service or tool that created the video, if available. */
  issuedBy?: string;
  /** The application or device used to create the video, if available. */
  appOrDeviceUsed?: string;
  /** A summary of how the video was generated, if available. */
  contentSummary?: string;
}

/**
 * Metadata about an AI video scan.
 */
export interface CopyleaksAiVideoDetectionScannedVideoModel {
  /** The scan id of the request. */
  scanId: string;
  /** The number of credits charged for the scan. */
  actualCredits: number;
  /** The number of credits expected for the scan. */
  expectedCredits: number;
  /** ISO 8601 creation time of the scan. */
  creationTime: string;
}
