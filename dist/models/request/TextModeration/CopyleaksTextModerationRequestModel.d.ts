export declare class CopyleaksTextModerationRequestModel {
    text: string;
    sandbox: boolean;
    language?: string | null;
    labels: any[];
    /**
     * @param init Initialization object
     */
    constructor(init: {
        text: string;
        sandbox?: boolean;
        language?: string;
        labels: any[];
    });
}
