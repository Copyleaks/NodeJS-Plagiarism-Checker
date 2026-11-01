export class TaskModel {
  
  endpoint?: string;
  
  /** Whether the task completed without internal errors on the Copyleaks side. */
  isHealthy?: boolean;
  
  /** HTTP status code returned by your server. Null when `isHealthy` is false. */
  httpStatusCode?: number;

  constructor(init?: Partial<TaskModel>) {
    Object.assign(this, init);
  }
}
