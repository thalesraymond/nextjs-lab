import { TaskStatus } from './workflow-status.enum';

export type TaskKind = 'http' | 'log' | 'wait' | string;

export interface Task {
  id: string;
  name: string;
  kind: TaskKind;
  status: TaskStatus;
  config: Record<string, unknown>;
  errorMessage?: string;
  startedAt?: Date;
  completedAt?: Date;
}
