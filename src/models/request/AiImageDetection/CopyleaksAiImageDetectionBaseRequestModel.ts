import { CopyleaksAiImageObjectDetectionModel } from './CopyleaksAiImageObjectDetectionModel.js';

/** Options shared by the AI image detection requests. */
export abstract class CopyleaksAiImageDetectionBaseRequestModel {
  /**
   * "binary" (default) or "heatmap"; `submitAsync` and `submitFileAsync` also accept "none".
   * See `CopyleaksAiImageDetectionMaskTypes`.
   */
  public maskType?: string;
  /** Up to 3 objects to find, for example [{ object: "face" }]. The response lists the ones found in `detectedObjects`. */
  public objectDetection?: CopyleaksAiImageObjectDetectionModel[];
}
