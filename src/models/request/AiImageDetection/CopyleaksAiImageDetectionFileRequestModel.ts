import { CopyleaksAiImageObjectDetectionModel } from './CopyleaksAiImageObjectDetectionModel.js';

/** Request of `AiImageDetectionClient.submitFileAsync`. */
export class CopyleaksAiImageDetectionFileRequestModel {
  /**
   * @param image The image bytes, for example from `fs.readFileSync`. 512x512 to 6000x4500 px, under 32 MB.
   *   PNG, JPG, JPEG, BMP, WebP or HEIC/HEIF.
   * @param filename File name with extension, up to 255 characters.
   * @param model See `CopyleaksAiImageDetectionModels`.
   * @param sandbox Return mock results without using credits.
   * @param maskType "binary" (default), "heatmap" or "none", see `CopyleaksAiImageDetectionMaskTypes`.
   * @param objectDetection Up to 3 objects to find, for example [{ object: "face" }].
   */
  constructor(
    public image: Uint8Array,
    public filename: string,
    public model: string,
    public sandbox: boolean = false,
    public maskType?: string,
    public objectDetection?: CopyleaksAiImageObjectDetectionModel[]) {
  }
}
