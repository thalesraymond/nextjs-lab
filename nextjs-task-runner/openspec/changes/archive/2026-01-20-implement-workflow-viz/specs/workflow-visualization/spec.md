# Spec Delta: Workflow Visualization

## ADDED Requirements

### Requirement: Sidebar Navigation
The application MUST have a global sidebar navigation.

#### Scenario: Visibility
User sees "Home" and "Workflow" links.

#### Scenario: Persistence
Sidebar persists across page navigation.

### Requirement: Workflow Dashboard
The `/workflow` page MUST visualize the task execution.

#### Scenario: Navigation
User visits `/workflow`.

#### Scenario: Results
Page displays a list/table of task execution results.

#### Scenario: Diagram
Page renders a Mermaid diagram representing the workflow dependency graph.

### Requirement: Task Runner Integration
The dashboard MUST use `@calmo/task-runner` to orchestrate the demo tasks.

#### Scenario: Execution
The hardcoded CI/CD tasks are executed successfully.

#### Scenario: Retry Check
Retry strategy is applied (e.g. for `UnitTests` if it were to fail, though mock is success).
