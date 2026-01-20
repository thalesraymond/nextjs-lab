import { describe, it, expect } from "vitest";
import { generateRandomWorkflow } from "./workflow-generator";

describe("generateRandomWorkflow", () => {
  it("should generate the requested number of tasks", () => {
    const size = 15;
    const tasks = generateRandomWorkflow(size);
    expect(tasks).toHaveLength(size);
  });

  it("should generate unique task names", () => {
    const tasks = generateRandomWorkflow(20);
    const names = new Set(tasks.map((t) => t.name));
    expect(names.size).toBe(20);
  });

  it("should not have cycles (DAG property)", () => {
    const tasks = generateRandomWorkflow(50); // Larger sample
    const taskMap = new Map(tasks.map((t) => [t.name, t]));

    // Simple DFS to detect cycles
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    function hasCycle(taskName: string): boolean {
      if (recursionStack.has(taskName)) return true;
      if (visited.has(taskName)) return false;

      visited.add(taskName);
      recursionStack.add(taskName);

      const task = taskMap.get(taskName);
      if (task?.dependencies) {
        for (const dep of task.dependencies) {
            if (hasCycle(dep)) return true;
        }
      }

      recursionStack.delete(taskName);
      return false;
    }

    for (const task of tasks) {
      if (hasCycle(task.name)) {
         throw new Error(`Cycle detected involving ${task.name}`);
      }
    }
    
    // Explicit expectation
    expect(true).toBe(true);
  });

  it("should respect dependency constraints (deps must exist)", () => {
      const tasks = generateRandomWorkflow(20);
      const taskNames = new Set(tasks.map(t => t.name));

      tasks.forEach(task => {
          task.dependencies?.forEach(dep => {
              expect(taskNames.has(dep)).toBe(true);
          });
      });
  });
});
