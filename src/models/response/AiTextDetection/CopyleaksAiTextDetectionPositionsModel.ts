/** Positions of text segments: segment i starts at starts[i] and spans lengths[i] characters or words. */
export class CopyleaksAiTextDetectionPositionsModel {
    /** Start positions of the segments. */
    public starts!: number[];

    /** Lengths of the segments, one for each start position. */
    public lengths!: number[];

    /** Group id of each segment. Only for positions in the HTML version of the document. */
    public groupIds?: number[];

    /**
     * @param init Parsed JSON object. Accepts both camelCase keys (starts, lengths) and
     * the PascalCase keys (Starts, Lengths) that sandbox scans send. Unknown fields are ignored.
     */
    constructor(init?: Partial<CopyleaksAiTextDetectionPositionsModel>) {
        const raw: any = init || {};
        const starts = raw.starts ?? raw.Starts;
        const lengths = raw.lengths ?? raw.Lengths;
        if (starts != null) {
            this.starts = starts;
        }
        if (lengths != null) {
            this.lengths = lengths;
        }
        if (raw.groupIds != null) {
            this.groupIds = raw.groupIds;
        }
    }
}
