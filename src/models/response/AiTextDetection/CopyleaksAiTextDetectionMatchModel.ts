import { CopyleaksAiTextDetectionMatchTextModel } from './CopyleaksAiTextDetectionMatchTextModel.js';

/** Location of the text segments that received a classification. */
export class CopyleaksAiTextDetectionMatchModel {
    /** Positions in the text of the document. */
    public text!: CopyleaksAiTextDetectionMatchTextModel;

    /** Positions in the HTML version of the document. Only for HTML sources. */
    public html?: CopyleaksAiTextDetectionMatchTextModel | null;

    /**
     * @param init Parsed JSON object. Unknown fields are ignored.
     */
    constructor(init?: Partial<CopyleaksAiTextDetectionMatchModel>) {
        const raw: any = init || {};
        if (raw.text != null) {
            this.text = new CopyleaksAiTextDetectionMatchTextModel(raw.text);
        }
        if (raw.html != null) {
            this.html = new CopyleaksAiTextDetectionMatchTextModel(raw.html);
        }
    }
}
