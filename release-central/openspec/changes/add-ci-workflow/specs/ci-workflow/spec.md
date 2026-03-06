# CI Workflow

## ADDED Requirements

### Requirement: The repository must have a CI workflow that runs on GitHub Actions
The repository SHALL execute an automated CI pipeline on GitHub Actions to validate code quality.

#### Scenario: Code is pushed to the repository or a PR is opened
- Given a push or pull request event
- When GitHub Actions is triggered
- Then the workflow should execute the predefined steps including checkout, dependency installation via pnpm, build, lint, and test scripts.
