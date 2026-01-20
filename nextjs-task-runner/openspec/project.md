# Project Context

## Purpose
This project is a lab environment designed to create and execute dynamic workflows. It serves as a workflow executor powered by the `@calmo/task-runner` module. The core idea is to define dynamic workflows, execute them using the runner, and display a high-quality interactive graph of the workflow, including steps and task/workflow statuses.

## Tech Stack
- **Framework**: Next.js
- **Styling**: Tailwind CSS (Mandatory for all CSS)
- **UI Components**: Shadcn UI (Avoid custom components at all costs)
- **Testing**: Vitest (Unit Test Tool)
- **Database**: MongoDB (with local Dockerfile and database seed for easy setup)
- **Package Manager**: pnpm

## Project Conventions

### Code Style
- **Type Safety**: Fully type-safe. `any` type is NOT allowed anywhere.
- **Quotes**: Always use double quotes `"` in code.
- **Testing**:
    - Vitest does not check types by default.
    - Must project a `tsconfig.test.ts` to be used for type checking before running tests.

### Architecture Patterns
- **Architecture**: Vertical Slice Architecture.

### Git Workflow
- **Strategy**: Trunk-based development.

## Domain Context
The system revolves around "Workflows" and "Tasks".
- **Dynamic Workflows**: Users can define workflows dynamically.
- **Execution**: The `@calmo/task-runner` module handles the execution logic.
- **Visualization**: A high-priority feature is a high-quality graph visualization of the workflow execution flow.

## Important Constraints
- **Lab Environment**: This is primarily a lab and NOT intended for production use.
- **Strict UI**: Use `shadcn/ui` and `tailwind`. Do not reinvent the wheel for UI components.

## External Dependencies
- `@calmo/task-runner`: Core engine for executing tasks.
