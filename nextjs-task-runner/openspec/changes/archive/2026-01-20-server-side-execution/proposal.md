# Server-Side Workflow Execution

## Goal Description
The `performance-showcase` currently executes a 1-million-node workflow on the client side. While impressive that it runs, it puts heavy load on the browser and doesn't reflect the typical server-side nature of workflow engines.
This change moves the execution to the server (Next.js API route) and streams progress updates to the client. This demonstrates:
1.  Server-side processing power.
2.  Streaming response capabilities of Next.js.
3.  Ability to handle large-scale workflows without freezing the UI.

## User Review Required
-   **Architecture**: We are introducing a long-running API route `GET /api/workflows/performance/stream`. This may hit timeouts on Vercel Pro/Hobby plans (10s/60s). We assume this is acceptable for a "showcase" or that the 1M nodes will execute fast enough (simulated delay is small).
-   **Streaming Format**: We will use a simple text stream (NDJSON or custom line-based) to push updates.

## Proposed Changes
### Core
#### [NEW] [route.ts](file:///src/app/api/workflows/performance/stream/route.ts)
-   Implement a GET handler that:
    -   Generates the 1M node workflow (reusing logic).
    -   Instantiates `TaskRunner` on the server.
    -   Streams events (`taskStart`, `taskEnd`, etc.) to the response stream.

### Frontend
#### [MODIFY] [page.tsx](file:///src/app/performance-showcase/page.tsx)
-   Replace `TaskRunnerBuilder` client-side logic with a `fetch` call to the new streaming API.
-   Parse the stream and update the UI counters.

## Verification Plan
### Automated Tests
-   We can add an integration test for the API route ensuring it returns a stream and eventually completes.
### Manual Verification
-   Run the showcase page.
-   Click "Run 1 Million Tasks".
-   Observe the counters updating in real-time.
-   Verify the browser doesn't freeze.
-   Verify the "Server" logs (terminal) show activity if applicable.
