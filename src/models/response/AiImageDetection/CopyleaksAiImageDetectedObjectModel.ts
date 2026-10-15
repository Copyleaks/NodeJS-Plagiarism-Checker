import { CopyleaksRangesModel } from '../CopyleaksRangesModel.js';

/** An object found in the image, in the `detectedObjects` list of an AI image detection result. */
export interface CopyleaksAiImageDetectedObjectModel {
    /** The object from the request's `objectDetection` list, for example "face". */
    object: string;
    /** RLE segmentation mask of the object, in the coordinate space of `imageInfo.shape`. */
    mask: CopyleaksRangesModel;
}
