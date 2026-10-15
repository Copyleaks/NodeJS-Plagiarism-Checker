import type { ErrorModel } from '../../submissions/webhooks/helperModels/errorModels/errorModel.js';
import type { CopyleaksAiImageDetectionScannedDocumentModel } from '../AiImageDetection/CopyleaksAiImageDetectionScannedDocumentModel.js';
import type { CopyleaksImageMetadataModel } from '../AiImageDetection/CopyleaksImageMetadataModel.js';
import type { CopyleaksRangesModel } from '../CopyleaksRangesModel.js';

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
  /** Scan id, credits and creation time. */
  public scannedVideo?: CopyleaksAiImageDetectionScannedDocumentModel;
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

/** AI-detected segments of one track (audio or visual): `starts` and `lengths` in milliseconds. */
export interface CopyleaksAiVideoDetectionTrackResultModel extends CopyleaksRangesModel {
  /** Ranges of the track that were not scored and are left out of the AI ratios. */
  exclude?: CopyleaksRangesModel;
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
  metadata?: CopyleaksImageMetadataModel;
}
