
import { NextRequest, NextResponse } from "next/server";
import {
  TaskRunnerBuilder,
  StandardExecutionStrategy,
} from "@calmo/task-runner";
import { generateHugeWorkflow, CIContext } from "@/features/workflow/utils/workflow-generator";

export const dynamic = "force-dynamic";

// Local data to drive the logic (mirrors page.tsx)
const pipelineData: CIContext = {
  repoName: "huge-monorepo",
  branch: "main",
  filesChanged: ["everything"],
  testCoverage: 99,
  securityVulnerabilities: 0,
  environment: "production",
};

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (data: any) => {
        controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
      };

      try {
        // Generate tasks
        const tasks = generateHugeWorkflow(1000000);
        
        // Initial stats
        sendEvent({
           type: "init",
           total: tasks.length,
           timestamp: Date.now()
        });

        // Batching state
        let running = 0;
        let success = 0;
        let failure = 0;
        let lastUnknownUpdate = Date.now();
        
        // We can't easily batch events from the emitter without a buffer, 
        // but for 1M nodes, the runner emits synchronous events very fast for the short tasks.
        // We will throttle updates to the stream to every ~50ms to avoid network congestion.
        
        let pendingUpdates = {
            runningDelta: 0,
            successDelta: 0,
            failureDelta: 0
        };

        const flushUpdates = () => {
            if (pendingUpdates.runningDelta === 0 && pendingUpdates.successDelta === 0 && pendingUpdates.failureDelta === 0) return;
            
            sendEvent({
                type: "update",
                runningDelta: pendingUpdates.runningDelta,
                successDelta: pendingUpdates.successDelta,
                failureDelta: pendingUpdates.failureDelta,
                timestamp: Date.now()
            });

            pendingUpdates = { runningDelta: 0, successDelta: 0, failureDelta: 0 };
        };

        const runner = new TaskRunnerBuilder(pipelineData)
          .useStrategy(new StandardExecutionStrategy())
          .on("taskStart", () => {
             pendingUpdates.runningDelta++;
             checkFlush();
          })
          .on("taskEnd", ({ result }) => {
             pendingUpdates.runningDelta--;
             if (result.status === 'success') {
                 pendingUpdates.successDelta++;
             } else {
                 pendingUpdates.failureDelta++;
             }
             checkFlush();
          })
          // We might miss the workflowStart/End here if we don't return the promise from runner.execute
          // but we are inside the stream start.
          .build();

        // Simple throttling
        let lastFlush = Date.now();
        const checkFlush = () => {
            const now = Date.now();
            if (now - lastFlush > 50) {
                flushUpdates();
                lastFlush = now;
            }
        };

        await runner.execute(tasks, {
            concurrency: 500, // Reasonable server load
        });
        
        // Final flush
        flushUpdates();
        
        sendEvent({ type: "done", timestamp: Date.now() });
        controller.close();
      } catch (error) {
        console.error("Workflow error", error);
        sendEvent({ type: "error", error: String(error) });
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
