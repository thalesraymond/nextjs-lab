# Capability: Server Side Execution

## ADDED Requirements

### Requirement: Server-Side Workflow Execution
The system MUST support executing workflows on the server-side to leverage server performance and reduce client-side load.

#### Scenario: Running a huge workflow
Given the Performance Showcase page is open
When the user clicks "Run 1 Million Tasks"
Then the application initiates a server-side execution
And the browser main thread remains responsive (does not freeze)

### Requirement: Real-Time Streaming Progress
The system SHALL stream execution progress from the server to the client in real-time.

#### Scenario: Receiving progress updates
Given a workflow is running on the server
When a task starts or completes
Then the server sends a progress event to the client
And the client updates the UI counters (Pending, Running, Success, Failure) within 100ms
