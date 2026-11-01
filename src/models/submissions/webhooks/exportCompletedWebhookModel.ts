import { WebhookModel } from "./helperModels/baseModels/webhookModel.js";
import { TaskModel } from "./helperModels/exportModels/taskModel.js";

export class ExportCompletedWebhookModel extends WebhookModel {
  completed?: boolean;
  /** The export tasks, one for each exported item. */
  tasks?: TaskModel[];

  constructor(init?: Partial<ExportCompletedWebhookModel>) {
    super(init);
    if (Array.isArray(init?.tasks)) {
      this.tasks = init!.tasks.map((task) => new TaskModel(task));
    }
  }
}
