/** Summary statistics of the AI detection analysis. */
export class CopyleaksAiImageDetectionSummaryModel {
    /** Share of pixels suspected to be human-created, 0.0 to 1.0. */
    public human: number;

    /** Share of pixels suspected to be AI-generated, 0.0 to 1.0. */
    public ai: number;

    constructor(human: number, ai: number) {
        this.human = human;
        this.ai = ai;
    }
}
