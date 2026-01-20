# Design: Server-Side Execution Streaming

## Architecture
We move the execution execution from the Browser Main Thread to the Server (Node.js).

### Communication Channel
We use HTTP Streaming (Chunked Transfer Encoding) via Next.js App Router API Routes.

**Protocol:**
-   Client initiates `GET /api/workflows/performance/stream`
-   Server keeps connection open.
-   Server writes chunks of data as events occur.
-   Format: JSON Lines (NDJSON). Each line is a JSON object representing an event batch.

### Batching
Sending 1 Million updates individually over HTTP will likely choke the network or CPU due to serialization/parsing overhead.
**Optimization:** We must batch events on the server before flushing to the stream.
-   The `TaskRunner` emits events rapidly.
-   We buffer these events and flush every X ms (e.g., 50ms) or every Y events (e.g., 1000).
-   This ensures the UI gets periodic updates without being flooded.

### Server Implementation
-   `NextRequest` / `NextResponse`
-   Use `TransformStream` or a simple async iterator approach if compatible with `NextResponse`.
-   The `generateHugeWorkflow` function is already pure TS, so it can be imported on the server.

### Client Implementation
-   `fetch()` with `ReadableStream`.
-   `TextDecoder` to decode chunks.
-   Split chunks by newline.
-   Parse JSON.
-   Update `useRef` counters.
-   `requestAnimationFrame` loop updates the UI (existing logic).
