export class CopyleaksStartRequestModel {
  /**
   * @param trigger IDs of the scans submitted with the `CheckCredits` action to start.
   * @param errorHandling `Ignore` starts the other scans when some are in error;
   *   `Cancel` cancels the request on any error.
   */
  constructor(
    public trigger: string[],
    public errorHandling?: CopyleaksStartErrorHandlings
  ) { }
}

export enum CopyleaksStartErrorHandlings {
  Cancel,
  Ignore
}