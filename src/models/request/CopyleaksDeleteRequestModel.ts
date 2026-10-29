export class CopyleaksDeleteRequestModel {
  /**
   * @param purge Also delete every trace from the Copyleaks internal database.
   *   A purged scan no longer appears as a result of other scans.
   * @param completionWebhook Called with POST (no body) once the deletion is complete.
   * @param headers Headers of the completionWebhook request. Example: [["header-key", "header-value"]]
   */
  constructor(
    public scans: { id: string }[],
    public purge?: boolean,
    public completionWebhook?: string,
    public headers?: string[][],
  ) { }
}