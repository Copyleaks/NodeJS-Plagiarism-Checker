import { CopyleaksAiImageDetectionResultModel } from './CopyleaksAiImageDetectionResultModel.js';
import { CopyleaksAiImageDetectionSummaryModel } from './CopyleaksAiImageDetectionSummaryModel.js';
import { CopyleaksAiImageDetectionImageInfoModel } from './CopyleaksAiImageDetectionImageInfoModel.js';
import { CopyleaksAiImageDetectionScannedDocumentModel } from './CopyleaksAiImageDetectionScannedDocumentModel.js';
import { CopyleaksAiImageDetectedObjectModel } from './CopyleaksAiImageDetectedObjectModel.js';
import { ErrorModel } from '../../submissions/webhooks/helperModels/errorModels/errorModel.js';

/**
 * AI image detection result: the response of `AiImageDetectionClient.submitAsync` and `submitFileAsync`,
 * and the webhook body of `submitUrlAsync` (parse it with `new CopyleaksAiImageDetectionResponseModel(req.body)`).
 * In the webhook, check `error` first: a failed scan has only `error` and `developerPayload`.
 */
export class CopyleaksAiImageDetectionResponseModel {
    /** Version of the detection model that was used. */
    public model!: string;
    /** RLE mask of the AI-detected regions. Missing when the request set `maskType` to "none". */
    public result?: CopyleaksAiImageDetectionResultModel;
    public summary!: CopyleaksAiImageDetectionSummaryModel;
    /** Whether the image was determined to be AI-generated. */
    public isAiDetected?: boolean;
    public imageInfo!: CopyleaksAiImageDetectionImageInfoModel;
    /**
     * The objects found, when the request included `objectDetection`.
     * Objects that were not found are left out, so look entries up by `object`, not by position.
     */
    public detectedObjects?: CopyleaksAiImageDetectedObjectModel[];
    public scannedDocument!: CopyleaksAiImageDetectionScannedDocumentModel;
    /** Why the scan failed (`submitUrlAsync` webhook only). */
    public error?: ErrorModel;
    /** The `developerPayload` of the `submitUrlAsync` request, unchanged. */
    public developerPayload?: string;

    /**
     * @param init The parsed JSON response. Every field is copied, including fields this SDK version does not declare.
     */
    constructor(init?: Partial<CopyleaksAiImageDetectionResponseModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
