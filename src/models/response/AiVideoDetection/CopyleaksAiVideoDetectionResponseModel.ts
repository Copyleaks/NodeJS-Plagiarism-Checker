import type { ErrorModel } from '../../submissions/webhooks/helperModels/errorModels/errorModel.js';

/**
 * AI video detection result, POSTed to `webhooks.url` of the request. Parse it with
 * `new CopyleaksAiVideoDetectionResponseModel(req.body)`, and check `error` first: a failed scan has only
 * `error` and `developerPayload`. Positions and lengths are in milliseconds.
 * For more info: https://docs.copyleaks.com/reference/data-types/ai-detector/ai-video-detection-response
 */
export class CopyleaksAiVideoDetectionResponseModel {
  /** Version of the detection model that was used. */
  public model!: string;
  /** AI-detected segments of the audio track. */
  public audioResult?: CopyleaksAiVideoDetectionTrackResultModel;
  /** AI-detected segments of the visual track. */
  public visualResult?: CopyleaksAiVideoDetectionTrackResultModel;
  /** Overall AI ratios, calculated from the scored segments only. */
  public summary!: CopyleaksAiVideoDetectionSummaryModel;
  /** Whether the video was determined to contain AI-generated content. */
  public isAiDetected!: boolean;
  public videoInfo?: CopyleaksAiVideoDetectionVideoInfoModel;
  public scannedVideo?: CopyleaksAiVideoDetectionScannedVideoModel;
  /** Why the scan failed. */
  public error?: ErrorModel;
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

/** AI-detected segments of one track (audio or visual), in milliseconds. */
export interface CopyleaksAiVideoDetectionTrackResultModel {
  /** Start positions of the AI-detected segments, in milliseconds. */
  starts: number[];
  /** Durations of the AI-detected segments, in milliseconds, one for each start position. */
  lengths: number[];
  /** Ranges of the track that were not scored and are left out of the AI ratios. */
  exclude?: CopyleaksAiVideoDetectionRangesModel;
}

/** Time ranges of a track, in milliseconds. */
export interface CopyleaksAiVideoDetectionRangesModel {
  /** Start positions of the ranges, in milliseconds. */
  starts: number[];
  /** Durations of the ranges, in milliseconds. */
  lengths: number[];
}

/** Overall AI ratios of a video, each from 0.0 to 1.0. */
export interface CopyleaksAiVideoDetectionSummaryModel {
  /** AI-detected audio duration divided by the audible duration. */
  audioAIRatio: number;
  /** AI-detected visual duration divided by the visible duration. */
  visualAIRatio: number;
  /** Combined AI ratio across the audio and visual tracks. */
  overallAIRatio: number;
}

/** Information about the analyzed video. */
export interface CopyleaksAiVideoDetectionVideoInfoModel {
  /** Duration of the video, in seconds. */
  duration?: number;
  /** Metadata extracted from the video file, for example C2PA provenance data. */
  metadata?: CopyleaksAiVideoDetectionMetadataModel;
}

/** Metadata extracted from the video file. */
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

/** Metadata about an AI video scan. */
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
