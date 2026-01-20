# persistence-schema Specification

## Purpose
TBD - created by archiving change slice-workflow-domain. Update Purpose after archive.
## Requirements
### Requirement: Mongoose Schema Definitions
The system MUST define the MongoDB schemas using Mongoose to persist Workflows and Tasks.

#### Scenario: Workflow Schema
- **Given** a MongoDB database
- **When** the `WorkflowSchema` is defined
- **Then** it must map to the `workflows` collection.
- **And** it must enforce required fields matching the Domain Entity.
- **And** it should embed `tasks` as a sub-document array.

