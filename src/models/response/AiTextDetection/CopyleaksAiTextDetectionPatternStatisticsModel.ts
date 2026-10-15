/** Statistics of the AI Logic patterns. Index i of every array describes pattern i. */
export class CopyleaksAiTextDetectionPatternStatisticsModel {
    /** Frequency of each pattern in AI-generated text. An infinite value is sent as 0. */
    public aiCount!: number[];

    /** Frequency of each pattern in human-written text. An infinite value is sent as 0. */
    public humanCount!: number[];

    /** Ratio between the AI and human frequencies of each pattern. An infinite value is sent as -1. */
    public proportion!: number[];

    /** Source of each pattern: 1 = AI, 2 = humanizer. */
    public source!: number[];

    /**
     * @param init Parsed JSON object. Unknown fields are ignored.
     */
    constructor(init?: Partial<CopyleaksAiTextDetectionPatternStatisticsModel>) {
        const raw: any = init || {};
        if (raw.aiCount != null) {
            this.aiCount = raw.aiCount;
        }
        if (raw.humanCount != null) {
            this.humanCount = raw.humanCount;
        }
        if (raw.proportion != null) {
            this.proportion = raw.proportion;
        }
        if (raw.source != null) {
            this.source = raw.source;
        }
    }
}
