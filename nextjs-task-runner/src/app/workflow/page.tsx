"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  TaskRunnerBuilder,
  TaskStep,
  StandardExecutionStrategy,
  RetryingExecutionStrategy,
} from "@calmo/task-runner";
import { WorkflowGraph } from "@/components/workflow-graph";

import { generateRandomWorkflow, CIContext } from "@/features/workflow/utils/workflow-generator";

// 2. Local data to drive the logic
const pipelineData: CIContext = {
  repoName: "cool-viz-app",
  branch: "main",
  filesChanged: ["src/index.ts", "package.json", "README.md"],
  testCoverage: 85,
  securityVulnerabilities: 0,
  environment: "production",
};


export default function WorkflowPage() {
  // Generate tasks once on mount
  const tasks = useMemo(() => generateRandomWorkflow(15), []);

  const [logs, setLogs] = useState<string[]>([]);
  const [graphDef, setGraphDef] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  // State for real-time task status
  const [taskStatuses, setTaskStatuses] = useState<Record<string, "pending" | "running" | "success" | "failure">>({});

  // Helper to generate Mermaid class definitions
  const getMermaidStyles = () => `
classDef default fill:#fff,stroke:#333,stroke-width:1px;
classDef running fill:#3b82f6,stroke:#1d4ed8,color:#fff,stroke-width:2px;
classDef success fill:#22c55e,stroke:#15803d,color:#fff,stroke-width:2px;
classDef failure fill:#ef4444,stroke:#b91c1c,color:#fff,stroke-width:2px;
`;

  // Helper to inject class assignments into the graph definition
  const augmentGraphWithStyles = (baseGraph: string, statuses: typeof taskStatuses) => {
    if (!baseGraph) return "";
    let augmented = baseGraph + "\n" + getMermaidStyles();
    Object.entries(statuses).forEach(([taskName, status]) => {
      if (status !== "pending") {
        augmented += `\nclass ${taskName} ${status};`;
      }
    });
    return augmented;
  };

  // Simplest change: 
  const [baseGraphDef, setBaseGraphDef] = useState<string>("");

  // Update visible graph when base or statuses change
  useEffect(() => {
      if (baseGraphDef) {
          setGraphDef(augmentGraphWithStyles(baseGraphDef, taskStatuses));
      }
  }, [baseGraphDef, taskStatuses]);

  const runWorkflow = async () => {
    setIsRunning(true);
    setLogs([]);
    setResults(null);
    setTaskStatuses({}); // Reset statuses
    
    // Add delays to the tasks for visual effect (already added above in run definitions)

    const runner = new TaskRunnerBuilder(pipelineData)
      .useStrategy(new RetryingExecutionStrategy(new StandardExecutionStrategy()))
      .on("taskStart", ({ step }) => {
        setLogs((prev) => [...prev, `🚀 Starting: ${step.name}`]);
        setTaskStatuses((prev) => ({ ...prev, [step.name]: "running" }));
      })
      .on("taskEnd", ({ step, result }) => {
        setLogs((prev) => [...prev, `✅ Finished: ${step.name} [${result.status}]`]);
        setTaskStatuses((prev) => ({ ...prev, [step.name]: result.status === 'success' ? 'success' : 'failure' }));
      })
      .build();

    // Generate graph immediately to show structure
    // We need to cast to any to access the static method if it's not exposed on the instance type definition
    // Or check if the builder exposes it. The user said runner.constructor
    try {
        const mermaidGraph = (TaskRunnerBuilder as any).getMermaidGraph 
            ? (TaskRunnerBuilder as any).getMermaidGraph(tasks) 
            : (runner.constructor as any).getMermaidGraph(tasks);
            
        setBaseGraphDef(mermaidGraph);
    } catch (e) {
        console.error("Could not generate graph", e);
        setLogs((prev) => [...prev, `⚠️ Error generating graph: ${e}`]);
    }

    setLogs((prev) => [...prev, "--- Starting Workflow Execution ---"]);

    try {
        const res = await runner.execute(tasks, {
            concurrency: 3,
        });
        setResults(Object.fromEntries(res));
        setLogs((prev) => [...prev, "--- Workflow Execution Completed ---"]);
    } catch (error) {
        console.error("Execution failed", error);
        setLogs((prev) => [...prev, `❌ Execution failed: ${error}`]);
    } finally {
        setIsRunning(false);
    }
  };

  useEffect(() => {
    runWorkflow();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Workflow Dashboard</h1>
        <button
          onClick={runWorkflow}
          disabled={isRunning}
          className="px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 rounded-md disabled:opacity-50 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          {isRunning ? "Running..." : "Rerun Workflow"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Live Execution Log</h2>
            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg h-[500px] overflow-auto border border-zinc-200 dark:border-zinc-800 font-mono text-sm leading-relaxed">
                {logs.length === 0 && <span className="text-zinc-400">Waiting to start...</span>}
                {logs.map((log, i) => (
                    <div key={i} className="border-b border-zinc-200/50 dark:border-zinc-800/50 pb-1 mb-1 last:border-0">
                        {log}
                    </div>
                ))}
            </div>
        </div>

        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Dependency Graph</h2>
            <WorkflowGraph graphDefinition={graphDef} />
        </div>
      </div>

      {results && (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Final Results</h2>
             <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400">
                        <tr>
                            <th className="px-6 py-3">Task Name</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(results).map(([name, result]: [string, any]) => (
                            <tr key={name} className="bg-white border-b dark:bg-zinc-900 dark:border-zinc-800">
                                <td className="px-6 py-4 font-medium">{name}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        result.status === 'success' 
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                    }`}>
                                        {result.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {result.message || JSON.stringify(result)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>
      )}
    </div>
  );
}
