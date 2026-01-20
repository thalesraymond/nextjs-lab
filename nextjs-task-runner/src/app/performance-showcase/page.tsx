"use client";

import React, { useState, useRef } from "react";
import {
  TaskRunnerBuilder,
  TaskStep,
  StandardExecutionStrategy,
  RetryingExecutionStrategy,
} from "@calmo/task-runner";
import { generateHugeWorkflow, CIContext } from "@/features/workflow/utils/workflow-generator";

// Local data to drive the logic
const pipelineData: CIContext = {
  repoName: "huge-monorepo",
  branch: "main",
  filesChanged: ["everything"],
  testCoverage: 99,
  securityVulnerabilities: 0,
  environment: "production",
};

export default function PerformanceShowcasePage() {
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    running: 0,
    success: 0,
    failure: 0,
  });
  const [timer, setTimer] = useState<string>("0.00 ms");
  
  // Ref to hold state without re-rendering for every event if we wanted to throttle,
  // but for 1M nodes updates might be too frequent.
  // We'll update React state directly but maybe debounce if needed.
  // Actually, updating React state 1M times will kill the browser.
  // We MUST use a ref for the counters and an interval to update the UI.

  const countersRef = useRef({
    total: 0,
    pending: 0,
    running: 0,
    success: 0,
    failure: 0,
    startTime: 0,
    endTime: 0,
  });

  const requestRef = useRef<number>();

  const updateUI = (_timestamp?: number) => {
    const c = countersRef.current;
    setStats({
      total: c.total,
      pending: c.pending,
      running: c.running,
      success: c.success,
      failure: c.failure,
    });
    
    if (c.startTime > 0) {
      const end = c.endTime > 0 ? c.endTime : performance.now();
      setTimer((end - c.startTime).toFixed(2) + " ms");
    }

    if (isRunning || c.endTime === 0) {
       requestRef.current = requestAnimationFrame(updateUI);
    }
  };

  const runHugeWorkflow = async () => {
    setIsRunning(true);
    
    // Generate tasks efficiently
    console.time("Generation");
    const tasks = generateHugeWorkflow(1000000);
    console.timeEnd("Generation");

    countersRef.current = {
      total: tasks.length,
      pending: tasks.length,
      running: 0,
      success: 0,
      failure: 0,
      startTime: 0,
      endTime: 0,
    };

    // Start UI loop
    requestRef.current = requestAnimationFrame(updateUI);

    const runner = new TaskRunnerBuilder(pipelineData)
      .useStrategy(new StandardExecutionStrategy()) // No retries for speed in this demo
      .on("workflowStart", () => {
         countersRef.current.startTime = performance.now();
      })
      .on("taskStart", () => {
        countersRef.current.pending--;
        countersRef.current.running++;
      })
      .on("taskEnd", ({ result }) => {
        countersRef.current.running--;
        if (result.status === 'success') {
          countersRef.current.success++;
        } else {
          countersRef.current.failure++;
        }
      })
      .build();

    try {
        await runner.execute(tasks, {
            concurrency: 1000, // Higher concurrency for 1M nodes to finish in reasonable time? 
            // well, Javascript is single threaded mostly, but async works.
        });
    } catch (error) {
        console.error("Execution failed", error);
    } finally {
        countersRef.current.endTime = performance.now();
        setIsRunning(false);
        // One last update
        cancelAnimationFrame(requestRef.current!);
        updateUI();
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Performance Showcase (1M Nodes)</h1>
        <button
          onClick={runHugeWorkflow}
          disabled={isRunning}
          className="px-4 py-2 bg-red-600 text-white dark:bg-red-500 dark:text-white rounded-md disabled:opacity-50 font-medium hover:bg-red-700 transition-colors"
        >
          {isRunning ? "Running..." : "Run 1 Million Tasks"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total Tasks" value={stats.total} />
        <StatsCard label="Pending" value={stats.pending} />
        <StatsCard label="Running" value={stats.running} color="text-blue-500" />
        <StatsCard label="Success" value={stats.success} color="text-green-500" />
        <StatsCard label="Failure" value={stats.failure} color="text-red-500" />
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm col-span-1 md:col-span-2 lg:col-span-4 flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Total Duration</span>
            <span className="text-4xl font-mono font-bold text-zinc-900 dark:text-zinc-50">{timer}</span>
        </div>
      </div>
      
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-md text-sm text-yellow-800 dark:text-yellow-200">
        <strong>Note:</strong> Generating 1,000,000 tasks takes significant memory. We use valid random DAG generation. Visualizations are disabled to prevent crashing the browser.
      </div>
    </div>
  );
}

function StatsCard({ label, value, color = "text-zinc-900 dark:text-zinc-50" }: { label: string, value: number, color?: string }) {
    return (
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">{label}</div>
            <div className={`text-3xl font-bold ${color}`}>{value.toLocaleString()}</div>
        </div>
    );
}
