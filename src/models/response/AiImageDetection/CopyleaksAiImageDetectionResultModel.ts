import { CopyleaksRangesModel } from '../CopyleaksRangesModel.js';

/** RLE mask of the AI-detected regions, over the flattened image. */
export class CopyleaksAiImageDetectionResultModel extends CopyleaksRangesModel {
    /** Confidence band of each range, 0 (lowest) to 4 (highest). Only when `maskType` was "heatmap". */
    public labels?: number[];

    constructor(starts: number[], lengths: number[], labels?: number[]) {
        super(starts, lengths);
        if (labels !== undefined) {
            this.labels = labels;
        }
    }
}
