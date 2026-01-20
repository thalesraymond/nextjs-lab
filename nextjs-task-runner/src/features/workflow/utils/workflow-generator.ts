import { TaskStep } from "@calmo/task-runner";

// Shared context interface (matching the one in page.tsx for now, 
// normally would be shared in a types file but keeping scope small)
export interface CIContext {
  repoName: string;
  branch: string;
  filesChanged: string[];
  testCoverage: number;
  securityVulnerabilities: number;
  buildArtifact?: string;
  environment: "staging" | "production" | "none";
}

const VERBS = ["Build", "Test", "Lint", "Deploy", "Scan", "Upload", "Notify", "Clean", "Provision", "Validate"];
const NOUNS = ["Core", "UI", "API", "DB", "Docs", "Artifacts", "Images", "Cache", "Logs", "Metrics"];

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomWorkflow(size: number = 10): TaskStep<CIContext>[] {
  const tasks: TaskStep<CIContext>[] = [];
  const usedNames = new Set<string>();

  // 1. Generate Nodes
  for (let i = 0; i < size; i++) {
    let name = `${getRandomElement(VERBS)}${getRandomElement(NOUNS)}`;
    let counter = 1;
    while (usedNames.has(name)) {
      name = `${name}${counter++}`;
    }
    usedNames.add(name);

    // Determines if this task should fail randomly
    const shouldFail = Math.random() < 0.1; // 10% failure rate
    const duration = getRandomInt(200, 2000);

    tasks.push({
      name,
      run: async (ctx: CIContext) => {
        await new Promise((resolve) => setTimeout(resolve, duration));
        if (shouldFail) {
          // Sometimes tasks fail
           return { status: "failure", error: "Random chaos failure simulated" };
        }
        return { status: "success", message: `Completed ${name}` };
      },
    });
  }

  // 2. Add Dependencies (Create DAG)
  // We iterate from 1 to N. For each node i, we can depend on any node 0..i-1.
  // This guarantees no cycles.
  for (let i = 1; i < size; i++) {
    const numDeps = getRandomInt(0, 3); // 0 to 3 dependencies
    const possibleDeps = tasks.slice(0, i);
    
    // Shuffle possibleDeps to pick random ones
    const shuffled = [...possibleDeps].sort(() => 0.5 - Math.random());
    const selectedDeps = shuffled.slice(0, numDeps);

    if (selectedDeps.length > 0) {
      tasks[i].dependencies = selectedDeps.map((t) => t.name);
    }
  }

  // Ensure there is at least one root (node with no deps) - logically guaranteed by the loop starting at 1
  // and 0 having 0 deps.

  // Optional: Shuffle the tasks array so the visual order isn't just strictly topological 
  // (though the runner needs dependencies to be defined, the array order doesn't dictate execution order strictly 
  // other than what dependencies say, BUT for Mermaid generation, it might look better if shuffled or not).
  // We'll keep them in creation order for simplicity, which often helps graphviz/mermaid layout engines 
  // if they match topological sort roughly.

  return tasks;
}

/**
 * Optimized generator for 1 Million nodes.
 * Avoids complex operations inside loops.
 */
export function generateHugeWorkflow(size: number = 1000000): TaskStep<CIContext>[] {
  const tasks: TaskStep<CIContext>[] = [];
  
  const shortRun = async () => {
     // 20ms delay
     await new Promise(resolve => setTimeout(resolve, 2));
     return { status: "success" as const, message: "Done" };
  };

  const longRun = async () => {
     // 5s delay
     await new Promise(resolve => setTimeout(resolve, 5000));
     return { status: "success" as const, message: "Long task done" };
  };

  for (let i = 0; i < size; i++) {
     const isLong = Math.random() < 0.05;
     const name = `Task_${i}`;
     
     const dependencies: string[] = [];
     if (i > 0) {
        // Sparse dependencies: 0 to 3
        const rand = Math.random();
        const numDeps = rand < 0.5 ? 0 : rand < 0.8 ? 1 : rand < 0.95 ? 2 : 3;
        for(let d=0; d<numDeps; d++) {
           const depIndex = Math.floor(Math.random() * i);
           dependencies.push(`Task_${depIndex}`);
        }
     }

     tasks.push({
        name,
        run: isLong ? longRun : shortRun,
        dependencies
     });
  }

  return tasks;
}
