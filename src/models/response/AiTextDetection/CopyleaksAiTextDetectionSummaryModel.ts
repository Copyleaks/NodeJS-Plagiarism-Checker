/** Summary of the AI text detection result. */
export class CopyleaksAiTextDetectionSummaryModel {
    /** Share of the text classified as human-written, 0.0 to 1.0. */
    public human!: number;

    /** Share of the text classified as AI-generated, 0.0 to 1.0. */
    public ai!: number;

    /**
     * @param init Parsed JSON object. Accepts both camelCase keys (human, ai) and
     * the PascalCase keys (Human, Ai) that sandbox scans send. Unknown fields are ignored.
     */
    constructor(init?: Partial<CopyleaksAiTextDetectionSummaryModel>) {
        const raw: any = init || {};
        const human = raw.human ?? raw.Human;
        const ai = raw.ai ?? raw.Ai;
        if (human != null) {
            this.human = human;
        }
        if (ai != null) {
            this.ai = ai;
        }
    }
}
