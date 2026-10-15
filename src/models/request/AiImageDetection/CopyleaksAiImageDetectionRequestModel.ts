import { CopyleaksAiImageDetectionBaseRequestModel } from './CopyleaksAiImageDetectionBaseRequestModel.js';
import { CopyleaksAiImageObjectDetectionModel } from './CopyleaksAiImageObjectDetectionModel.js';

/** Request of `AiImageDetectionClient.submitAsync`. */
export class CopyleaksAiImageDetectionRequestModel extends CopyleaksAiImageDetectionBaseRequestModel {
    /** The image, base64-encoded. 512x512 to 6000x4500 px, under 32 MB. PNG, JPEG, BMP, WebP or HEIC/HEIF. */
    public base64: string;

    /** File name with extension (.png, .bmp, .jpg, .jpeg, .webp, .heic, .heif), up to 255 characters. */
    public fileName: string;

    /**
     * See `CopyleaksAiImageDetectionModels`. Accepts the alias ("ai-image-1-ultra")
     * or the full name ("ai-image-1-ultra-01-09-2025").
     */
    public model: string;

    /** Return mock results without using credits, to test your integration. */
    public sandbox: boolean = false;

    constructor(
        base64: string,
        fileName: string,
        model: string,
        sandbox: boolean = false,
        maskType?: string,
        objectDetection?: CopyleaksAiImageObjectDetectionModel[]) {
        super();
        this.base64 = base64;
        this.fileName = fileName;
        this.model = model;
        this.sandbox = sandbox;
        if (maskType !== undefined) {
            this.maskType = maskType;
        }
        if (objectDetection !== undefined) {
            this.objectDetection = objectDetection;
        }
    }
}
