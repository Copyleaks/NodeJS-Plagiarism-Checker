import { CopyleaksAiTextDetectionPatternMatchModel } from './CopyleaksAiTextDetectionPatternMatchModel.js';
import { CopyleaksAiTextDetectionPatternStatisticsModel } from './CopyleaksAiTextDetectionPatternStatisticsModel.js';

/** AI Logic patterns found in the text. */
export class CopyleaksAiTextDetectionPatternsModel {
    /** Statistics of each pattern. */
    public statistics!: CopyleaksAiTextDetectionPatternStatisticsModel;

    /** Pattern positions in the text of the document. */
    public text!: CopyleaksAiTextDetectionPatternMatchModel;

    /** Positions in the HTML version of the document. Only for HTML sources. */
    public html?: CopyleaksAiTextDetectionPatternMatchModel | null;

    /**
     * @param init Parsed JSON object. Unknown fields are ignored.
     */
    constructor(init?: Partial<CopyleaksAiTextDetectionPatternsModel>) {
        const raw: any = init || {};
        if (raw.statistics != null) {
            this.statistics = new CopyleaksAiTextDetectionPatternStatisticsModel(raw.statistics);
        }
        if (raw.text != null) {
            this.text = new CopyleaksAiTextDetectionPatternMatchModel(raw.text);
        }
        if (raw.html != null) {
            this.html = new CopyleaksAiTextDetectionPatternMatchModel(raw.html);
        }
    }
}
