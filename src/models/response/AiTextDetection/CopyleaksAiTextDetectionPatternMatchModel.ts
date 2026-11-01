import { CopyleaksAiTextDetectionPositionsModel } from './CopyleaksAiTextDetectionPositionsModel.js';

/** Positions of the AI Logic patterns found in the text. */
export class CopyleaksAiTextDetectionPatternMatchModel {
    /** Pattern positions measured in characters. */
    public chars?: CopyleaksAiTextDetectionPositionsModel;

    /** Pattern positions measured in words. */
    public words!: CopyleaksAiTextDetectionPositionsModel;

    /**
     * @param init Parsed JSON object. Unknown fields are ignored.
     */
    constructor(init?: Partial<CopyleaksAiTextDetectionPatternMatchModel>) {
        const raw: any = init || {};
        if (raw.chars != null) {
            this.chars = new CopyleaksAiTextDetectionPositionsModel(raw.chars);
        }
        if (raw.words != null) {
            this.words = new CopyleaksAiTextDetectionPositionsModel(raw.words);
        }
    }
}
