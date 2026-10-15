import { CopyleaksAiTextDetectionPatternsModel } from './CopyleaksAiTextDetectionPatternsModel.js';

/** AI Logic explanation of the AI text detection result. */
export class CopyleaksAiTextDetectionExplainModel {
    /** The AI Logic patterns found in the text. */
    public patterns!: CopyleaksAiTextDetectionPatternsModel;

    /**
     * @param init Parsed JSON object. Unknown fields are ignored.
     */
    constructor(init?: Partial<CopyleaksAiTextDetectionExplainModel>) {
        const raw: any = init || {};
        if (raw.patterns != null) {
            this.patterns = new CopyleaksAiTextDetectionPatternsModel(raw.patterns);
        }
    }
}
