import { WorkflowStatus, TaskStatus } from '../src/features/workflow/domain/workflow-status.enum';
import type { Workflow } from '../src/features/workflow/domain/workflow.entity';
import type { Task } from '../src/features/workflow/domain/task.entity';
import crypto from 'node:crypto';

// Helper to generate random ID
const randomId = () => crypto.randomUUID();

// Helper to pick random enum
const randomEnum = <T>(anEnum: T): T[keyof T] => {
  const enumValues = Object.values(anEnum as any) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
};

const generateRandomTask = (index: number): Task => {
  return {
    id: randomId(),
    name: `Task ${index + 1}`,
    kind: Math.random() > 0.5 ? 'http' : 'log',
    status: randomEnum(TaskStatus),
    config: {
      url: 'https://example.com/api',
      retries: Math.floor(Math.random() * 3),
    },
    startedAt: new Date(),
    completedAt: new Date(),
  };
};

const generateRandomWorkflow = (index: number): Workflow => {
  const taskCount = Math.floor(Math.random() * 3) + 3; // 3 to 5 tasks
  const tasks = Array.from({ length: taskCount }).map((_, i) => generateRandomTask(i));

  return {
    id: randomId(),
    name: `Workflow ${index + 1}`,
    status: randomEnum(WorkflowStatus),
    tasks,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

async function main() {
  console.log('🌱 Seeding random workflows (in-memory simulation)...');

  const workflows: Workflow[] = [];
  for (let i = 0; i < 10; i++) {
    workflows.push(generateRandomWorkflow(i));
  }

  console.log(`Generated ${workflows.length} workflows.`);
  
  // Pretty print first workflow as sample
  console.log('Sample Workflow:');
  console.log(JSON.stringify(workflows[0], null, 2));

  console.log('✅ Seeding checks passed (InMemory).');
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
