# seeding-script Specification

## Purpose
TBD - created by archiving change slice-workflow-domain. Update Purpose after archive.
## Requirements
### Requirement: Workflow Seeding
The system MUST provide a script to generate dummy workflow data for testing and development purposes.

#### Scenario: Seed Random Workflows
- **Given** an empty or existing database (or purely in-memory validation for this slice)
- **When** `scripts/seed-workflows.ts` is executed
- **Then** it must generate at least 10 valid dummy Workflows.
- **And** each workflow must have between 3 to 5 Tasks.
- **And** the output should be logged to console (for now, as DB connection might not be fully active in CI).

