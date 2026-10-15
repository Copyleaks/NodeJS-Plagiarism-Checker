/** An object found in the image, in the `detectedObjects` list of an AI image detection result. */
export interface CopyleaksAiImageDetectedObjectModel {
    /** The object from the request's `objectDetection` list, for example "face". */
    object: string;
    /** RLE segmentation mask of the object, in the coordinate space of `imageInfo.shape`. */
    mask: CopyleaksAiImageMaskModel;
}

/** A Run-Length Encoded (RLE) mask over the flattened image. */
export interface CopyleaksAiImageMaskModel {
    /** Start positions of the segments in the flattened 1D image array. */
    starts: number[];
    /** Lengths of the segments, one for each start position. */
    lengths: number[];
}
