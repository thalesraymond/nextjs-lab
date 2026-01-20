# huge-workflow Specification

## Purpose
TBD - created by archiving change performance-showcase. Update Purpose after archive.
## Requirements
### Requirement: 1 Million Nodes Support
The generator MUST be capable of creating a valid workflow structure with 1 million distinct tasks.
#### Scenario: 1 Million Nodes
- GIVEN the workflow generator
- WHEN `generateHugeWorkflow(1000000)` is called
- THEN it should return an array of 1 million task steps

### Requirement: Performance Simulation
The generator MUST introduce specific latency characteristics to simulate a realistic heavy workload.
#### Scenario: Long Running Tasks
- WHEN the workflow is generated
- THEN approximately 5% of tasks should have a compiled-in delay of 5 seconds
- AND the remaining 95% should have a delay of 20ms

### Requirement: Graph Structure
The generator MUST ensure the resulting workflow is a valid Directed Acyclic Graph (DAG).
#### Scenario: Dependency Chain
- WHEN the workflow is generated
- THEN tasks should have valid dependencies (DAG structure) ensuring no cycles
- AND dependencies should be sparse (0-3 dependencies per node)

