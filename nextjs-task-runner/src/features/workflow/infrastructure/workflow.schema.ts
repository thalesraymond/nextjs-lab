import mongoose, { Schema } from 'mongoose';
import { WorkflowStatus, TaskStatus } from '../domain/workflow-status.enum';
import { Workflow } from '../domain/workflow.entity';
import { Task } from '../domain/task.entity';

const TaskSchema = new Schema<Task>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  kind: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.PENDING,
    required: true,
  },
  config: { type: Schema.Types.Mixed, default: {} },
  errorMessage: { type: String },
  startedAt: { type: Date },
  completedAt: { type: Date },
}, { _id: false });

const WorkflowSchema = new Schema<Workflow>({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(WorkflowStatus),
    default: WorkflowStatus.PENDING,
    required: true,
  },
  tasks: { type: [TaskSchema], default: [] },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete (ret as any)._id;
      delete (ret as any).__v;
    }
  },
  toObject: {
    virtuals: true
  }
});

// Use existing model if defined (for hot reloading/singleton pattern)
export const WorkflowModel = mongoose.models.Workflow || mongoose.model<Workflow>('Workflow', WorkflowSchema);
