# Design: Real-time Graph Visualization

## Architecture
- **Component**: `src/app/workflow/page.tsx`
- **State**: Introduce a `taskStatuses` state map: `Record<string, 'pending' | 'running' | 'success' | 'failure'>`.
- **Event Handling**:
    - `taskStart`: Set status to `'running'`.
    - `taskEnd`: Set status to `'success'` or `'failure'`.

## Graph Styling
We will append Mermaid `class` definitions to the base graph string.

### Class Definitions
```mermaid
classDef default fill:#fff,stroke:#333,stroke-width:1px;
classDef running fill:#3b82f6,stroke:#1d4ed8,color:#fff,stroke-width:2px;
classDef success fill:#22c55e,stroke:#15803d,color:#fff,stroke-width:2px;
classDef failure fill:#ef4444,stroke:#b91c1c,color:#fff,stroke-width:2px;
```

### Dynamic Updates
On every state change, we will rebuild the graph definition string:
1. Start with the base static structure (nodes and edges).
2. Append the `classDef` block.
3. Iterate over `taskStatuses` and append `class [TaskName] [Status];` lines.

## Considerations
- **Flicker**: If Mermaid re-renders the whole canvas, it might flicker. We assume `react-mermaid` (or whatever underlying lib) handles diffing or we accept minor redraws for this MVP.
