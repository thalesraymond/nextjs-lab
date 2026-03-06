# Proposal: Add CI Workflow

## Overview
Introduce a GitHub Actions Continuous Integration (CI) workflow to automatically run tests and linting.

## Why
With a mature project containing lint configurations and test suites, a CI pipeline is essential to ensure code quality and prevent regressions on every push and pull request.

## Proposed Changes
- Create `.github/workflows/ci.yml` with steps to:
  - Checkout repository
  - Install `pnpm`
  - Setup Node.js v22
  - Install dependencies
  - Run build, lint, and tests
