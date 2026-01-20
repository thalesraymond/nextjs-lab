# Workflow Domain Vertical Slicing

## Goal
Implement the core domain entities and infrastructure for the Workflow feature, enabling vertical slicing. This includes defining domain types, MongoDB schemas, and a seeding script for random workflow generation. This vertical slice focuses on the domain and data layers to support future dynamic workflow execution and persistence.

## Dependencies
- `@calmo/task-runner` (already installed)
- `mongoose` (or native mongodb driver - project context says MongoDB with Docker, checking package.json for specifics eventually, but assuming standard mongoose or mongodb usage based on schemas). *Self-correction: project.md says "Database: MongoDB", package.json usually has the driver. I will assume `mongoose` is not present unless I check, but for a proposal I can specify `mongoose` or native.*
*Note:* I'll check `package.json` quickly in the next turn or assume standard practices. I'll stick to the user request "WorkflowSchema: MongoDB schema".

## Review Required
- **Domain Modeling**: Confirm if `Workflow` and `Task` entities should strictly follow `@calmo/task-runner` internal types or wrap them.
- **Database**: Confirm if we are using Mongoose or direct MongoDB driver. (The user mentioned "Schemas", which implies Mongoose or similar ODM).
