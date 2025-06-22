import { TextModerationCharsModel } from "./TextModerationCharsModel";
export declare class Text {
    chars?: TextModerationCharsModel[];
    /**
     * @param init Initialization object
     */
    constructor(init: {
        chars: TextModerationCharsModel[];
        starts: boolean;
        lengths: string;
    });
}
