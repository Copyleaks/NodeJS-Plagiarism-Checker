export declare class CopyleaksStartRequestModel {
    trigger: string[];
    errorHandling?: CopyleaksStartErrorHandlings | undefined;
    /**
     * @param trigger A list of scans that you submitted for a check-credits scan and that you would like to submit for a full scan.
     * @param errorHandling When set to ignore (ignore = 1) the trigger scans will start running even if some of them are in error mode, when set to cancel (cancel = 0) the request will be cancelled if any error was found.
     */
    constructor(trigger: string[], errorHandling?: CopyleaksStartErrorHandlings | undefined);
}
export declare enum CopyleaksStartErrorHandlings {
    Cancel = 0,
    Ignore = 1
}
