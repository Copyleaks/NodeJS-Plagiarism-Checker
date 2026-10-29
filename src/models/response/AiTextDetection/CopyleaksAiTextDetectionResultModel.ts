import { CopyleaksAiTextDetectionMatchModel } from './CopyleaksAiTextDetectionMatchModel.js';

/** A classification of parts of the scanned text. */
export class CopyleaksAiTextDetectionResultModel {
    /** 1 = human-written, 2 = AI-generated. */
    public classification!: number;

    /**
     * Probability of the classification. Can be missing.
     * @deprecated The server plans to remove it. Use `classification` and `summary` instead.
     */
    public probability?: number;

    /** The text segments that received this classification. */
    public matches!: CopyleaksAiTextDetectionMatchModel[];

    /**
     * @param init Parsed JSON object. Unknown fields are ignored.
     */
    constructor(init?: Partial<CopyleaksAiTextDetectionResultModel>) {
        const raw: any = init || {};
        if (raw.classification != null) {
            this.classification = raw.classification;
        }
        if (raw.probability != null) {
            this.probability = raw.probability;
        }
        if (Array.isArray(raw.matches)) {
            this.matches = raw.matches.map((m: any) => new CopyleaksAiTextDetectionMatchModel(m));
        }
    }
}
