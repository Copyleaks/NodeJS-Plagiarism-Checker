/**
 * Run-length encoded ranges: range i starts at `starts[i]` and spans `lengths[i]`.
 * Pixels of the flattened image for AI image detection, milliseconds for AI video detection.
 */
export class CopyleaksRangesModel {
    /** Start positions of the ranges. */
    public starts: number[];

    /** Lengths of the ranges, one for each start position. */
    public lengths: number[];

    constructor(starts: number[], lengths: number[]) {
        this.starts = starts;
        this.lengths = lengths;
    }
}
