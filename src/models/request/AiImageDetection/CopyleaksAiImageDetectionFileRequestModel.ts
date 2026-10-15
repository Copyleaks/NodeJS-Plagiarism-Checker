import { CopyleaksAiImageDetectionBaseRequestModel } from './CopyleaksAiImageDetectionBaseRequestModel.js';
import { CopyleaksAiImageObjectDetectionModel } from './CopyleaksAiImageObjectDetectionModel.js';

/** Request of `AiImageDetectionClient.submitFileAsync`. */
export class CopyleaksAiImageDetectionFileRequestModel extends CopyleaksAiImageDetectionBaseRequestModel {
  /**
   * @param image The image bytes, for example from `fs.readFileSync`. 512x512 to 6000x4500 px, under 32 MB.
   *   PNG, JPG, JPEG, BMP, WebP or HEIC/HEIF.
   * @param filename File name with extension, up to 255 characters.
   * @param model See `CopyleaksAiImageDetectionModels`.
   * @param sandbox Return mock results without using credits.
   * @param maskType See the `maskType` field.
   * @param objectDetection See the `objectDetection` field.
   */
  constructor(
    public image: Uint8Array,
    public filename: string,
    public model: string,
    public sandbox: boolean = false,
    maskType?: string,
    objectDetection?: CopyleaksAiImageObjectDetectionModel[]) {
    super();
    this.maskType = maskType;
    this.objectDetection = objectDetection;
  }
}
