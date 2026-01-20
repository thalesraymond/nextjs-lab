import { Task } from './task.entity';
import { WorkflowStatus } from './workflow-status.enum';

export interface Workflow {
  id: string;
  name: string;
  status: WorkflowStatus;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}
