/** RLE mask of the AI-detected regions, over the flattened image. */
export class CopyleaksAiImageDetectionResultModel {
    /** Start positions of the segments. */
    public starts: number[];

    /** Lengths of the segments, one for each start position. */
    public lengths: number[];
    /** Confidence band of each segment, 0 (lowest) to 4 (highest). Only when `maskType` was "heatmap". */
    public labels?: number[];

    constructor(starts: number[], lengths: number[], labels?: number[]) {
        this.starts = starts;
        this.lengths = lengths;
        if (labels !== undefined) {
            this.labels = labels;
        }
    }
}
