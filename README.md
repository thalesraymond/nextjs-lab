# Next.js Lab Monorepo

Welcome to the **Next.js Lab Monorepo**! 🚀

This repository serves as a centralized sandbox for exploring Next.js features, architectural patterns, UI components, and integrating third-party libraries. Each folder is structured as a standalone Next.js application with a specific focus, allowing for rapid experimentation and learning.

---

## 📂 Projects Overview

Here is a breakdown of the distinct applications housed within this monorepo:

### 1. `nextjs-dashboard`
- **Purpose**: A comprehensive financial dashboard application originally following the official Next.js App Router Course. It serves as an exploration of fundamental Next.js App Router capabilities such as Server Components, nested routing, and database streaming.
- **Key Technologies**: Next.js App Router, Tailwind CSS, PostgreSQL, NextAuth.js v5 (Authentication), Zod (Data Validation), and Heroicons.

### 2. `nextjs-task-runner`
- **Purpose**: A task execution and visualization sandbox. By incorporating database functionality and visual diagramming libraries, it tests out different interaction models, persistent data management for executing tasks, and complex state changes.
- **Key Technologies**: Next.js, Tailwind CSS, MongoDB (via Mongoose), Mermaid.js (for runtime diagrams/charts), Lucide React (Icons), and Vitest (Testing suite).

### 3. `release-central`
- **Purpose**: A visually distinct dashboard designed for organizing, tracking, and ranking software releases. Customized with a modern, "gamey" dark UI aesthetic inspired by Steam, this application features a release calendar, squad ranking panels, vitals tracking, and feature toggles overview.
- **Key Technologies**: Next.js, Tailwind CSS, Recharts (Data Visualizations), Radix UI Primitives (Accessible Modals, Separators, Tooltips), Date-fns (Date Parsing), and Lucide React.

---

## 🚀 Getting Started

To run any of the applications locally, navigate into its respective directory to start developing or exploring. Be sure to install dependencies tailored to each project's context.

Example for running the `release-central` app:
```bash
# 1. Navigate to the desired app directory
cd release-central

# 2. Install dependencies (e.g., using pnpm, npm, or yarn)
pnpm install

# 3. Start the development server
pnpm dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🛠️ Development Philosophy

- **Isolation**: Each project contains its own `package.json` and manages dependencies independently.
- **Exploration first**: Code may be experimental. The primary objective is educational application, learning Next.js patterns, UI libraries, and back-end integration seamlessly.
- **Modern Standards**: Uses robust tooling setups across apps such as `eslint`, `pretter`, and `turbopack` configurations designed for Next.js.
