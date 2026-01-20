# Proposal: Visualize Execution State in Workflow Graph

## Goal
Enhance the workflow execution graph to visually reflect the real-time state of each task (running, success, failure) during execution.

## Context
Currently, the `WorkflowPage` displays a static dependency graph generated before execution. It also logs execution events to a text console. Users have to correlate the logs with the graph manually to understand progress.

## Solution
We will leverage the existing `taskStart` and `taskEnd` events from the `@calmo/task-runner` to update the local component state. This state will drive dynamic updates to the Mermaid graph definition, applying specific CSS classes to nodes based on their status.

## Review Required
- **Mermaid Performance**: Re-rendering the graph on every step might cause flickering. We should verify if the `WorkflowGraph` component handles updates smoothly.
