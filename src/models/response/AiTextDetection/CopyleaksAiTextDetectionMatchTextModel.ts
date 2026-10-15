import { CopyleaksAiTextDetectionPositionsModel } from './CopyleaksAiTextDetectionPositionsModel.js';

/** Character and word positions of the matched text segments. */
export class CopyleaksAiTextDetectionMatchTextModel {
    /** Positions measured in characters. */
    public chars!: CopyleaksAiTextDetectionPositionsModel;

    /** Positions measured in words. */
    public words!: CopyleaksAiTextDetectionPositionsModel;

    /**
     * @param init Parsed JSON object. Unknown fields are ignored.
     */
    constructor(init?: Partial<CopyleaksAiTextDetectionMatchTextModel>) {
        const raw: any = init || {};
        if (raw.chars != null) {
            this.chars = new CopyleaksAiTextDetectionPositionsModel(raw.chars);
        }
        if (raw.words != null) {
            this.words = new CopyleaksAiTextDetectionPositionsModel(raw.words);
        }
    }
}
