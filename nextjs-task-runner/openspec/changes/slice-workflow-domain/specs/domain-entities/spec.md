# Domain Entities Spec

## ADDED Requirements

### Requirement: Domain Model Definitions
The system MUST define the core entities `Workflow` and `Task` that serve as the foundation for the workflow feature.

#### Scenario: Workflow Entity Definition
- **Given** the system needs to represent a Workflow
- **When** the `Workflow` entity is defined
- **Then** it must have `id`, `name`, `status`, `tasks` list, `createdAt`, and `updatedAt`.
- **And** `status` must be one of `PENDING`, `RUNNING`, `COMPLETED`, `FAILED`.

#### Scenario: Task Entity Definition
- **Given** the system needs to represent a Task
- **When** the `Task` entity is defined
- **Then** it must have `id`, `name`, `kind`, `status`, and `config`.
- **And** `status` must be one of `PENDING`, `RUNNING`, `COMPLETED`, `FAILED`, `SKIPPED`.
