"use client";

import React, { useState, useRef } from "react";

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
  
  const countersRef = useRef({
    total: 0,
    pending: 0,
    running: 0,
    success: 0,
    failure: 0,
    startTime: 0,
    endTime: 0,
  });

  const requestRef = useRef<number>(0);

  const updateUI = (_timestamp?: number) => {
    const c = countersRef.current;
    
    // Recalculate pending based on total - (running + success + failure)
    // or we can track it precisely. 
    // Let's track precise deltas.
    
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
    
    // Reset counters
    countersRef.current = {
      total: 0,
      pending: 0,
      running: 0,
      success: 0,
      failure: 0,
      startTime: 0,
      endTime: 0,
    };

    // Start UI loop
    requestRef.current = requestAnimationFrame(updateUI);

    try {
        const response = await fetch('/api/workflows/performance/stream');
        if (!response.body) throw new Error("No response body");
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            // Last line might be incomplete
            buffer = lines.pop() || '';
            
            for (const line of lines) {
                if (!line.trim()) continue;
                try {
                    const event = JSON.parse(line);
                    handleServerEvent(event);
                } catch (e) {
                    console.error("Error parsing JSON line", e);
                }
            }
        }
    } catch (error) {
        console.error("Execution failed", error);
    } finally {
        countersRef.current.endTime = performance.now();
        setIsRunning(false);
        cancelAnimationFrame(requestRef.current!);
        updateUI();
    }
  };

  const handleServerEvent = (event: any) => {
      if (event.type === 'init') {
          countersRef.current.total = event.total;
          countersRef.current.pending = event.total;
          countersRef.current.startTime = performance.now(); // Sync start time roughly
      } else if (event.type === 'update') {
          countersRef.current.running += event.runningDelta;
          
          // Pending decreases when tasks start (runningDelta > 0 means tasks started)
          // Wait, runningDelta is net change.
          // Workflow events: 
          // taskStart: running++, pending--
          // taskEnd: running--, success/failure++
          
          // Let's deduce pending change from the other deltas if strict mapping isn't sent.
          // But our server sends "runningDelta", "successDelta", "failureDelta" of the *counters*? 
          // No, the server code does:
          // runningDelta++ on start
          // runningDelta-- on end
          
          // We need to know how many *started* to reduce pending.
          // runningDelta = (started - ended).
          // successDelta = endedSuccess.
          // failureDelta = endedFailure.
          // endedTotal = successDelta + failureDelta.
          // started = runningDelta + endedTotal.
          
          // So decrease pending by 'started'.
          const endedCount = event.successDelta + event.failureDelta;
          const startedCount = event.runningDelta + endedCount;
          
          countersRef.current.pending -= startedCount;
          countersRef.current.success += event.successDelta;
          countersRef.current.failure += event.failureDelta;
          // running is directly adjusted by delta
          // Actually, if we just apply keys:
          // running += runningDelta.
          // success += successDelta.
          // failure += failureDelta.
          
          // We just need to ensure 'pending' is accurate. 
          // Initial pending = Total.
          // Pending = Total - (Running + Success + Failure) is always true?
          // Let's verify:
          // Task starts: Pending -> Running. (Pending--, Running++)
          // Task ends: Running -> Success. (Running--, Success++)
          // Task ends: Running -> Failure. (Running--, Failure++)
          // So yes, Total = Pending + Running + Success + Failure.
          
          // So we can recompute pending derived from the others.
          // But we are using refs for performance.
          // Let's just update the explicit counters we got deltas for, then derive pending.
      } else if (event.type === 'done') {
          // ensure 100% completion visually
          countersRef.current.running = 0;
          countersRef.current.pending = 0;
      }
      
      // Re-derive pending to avoid drift
      countersRef.current.pending = countersRef.current.total - (
          countersRef.current.running + 
          countersRef.current.success + 
          countersRef.current.failure
      );
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Performance Showcase</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Server-Side Execution • Streaming Updates</p>
        </div>
        <button
          onClick={runHugeWorkflow}
          disabled={isRunning}
          className="px-4 py-2 bg-purple-600 text-white dark:bg-purple-500 dark:text-white rounded-md disabled:opacity-50 font-medium hover:bg-purple-700 transition-colors"
        >
          {isRunning ? "Running..." : "Run on Server"}
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
      
      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-900 rounded-md text-sm text-purple-800 dark:text-purple-200">
        <strong>Server-Side Execution:</strong> The workflow is now executing on the server (Node.js) and streaming updates to the client. This allows for massive scale without freezing your browser.
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
