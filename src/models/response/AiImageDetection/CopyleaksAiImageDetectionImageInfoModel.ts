import { CopyleaksImageShapeModel } from './CopyleaksImageShapeModel.js';
import { CopyleaksImageMetadataModel } from './CopyleaksImageMetadataModel.js';

/** Information about the analyzed image. */
export class CopyleaksAiImageDetectionImageInfoModel {
    /** Dimensions of the analyzed image. */
    public shape: CopyleaksImageShapeModel;

    /** Optional metadata extracted from the image. */
    public metadata?: CopyleaksImageMetadataModel;

    constructor(shape: CopyleaksImageShapeModel, metadata?: CopyleaksImageMetadataModel) {
        this.shape = shape;
        this.metadata = metadata;
    }
}
