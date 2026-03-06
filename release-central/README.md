# Release Central 🎮

Welcome to **Release Central**, a dedicated dashboard within the Next.js Lab monorepo for organizing, tracking, and ranking software releases.

Designed with a modern, "gamey" dark UI aesthetic inspired by Steam, Release Central aims to make release management intuitive and visually engaging.

## ✨ Features

- **Release Calendar**: Keep track of all upcoming and past releases.
- **Squad Rankings**: View and compare the delivery tiers and performance of different squads.
- **Vitals Tracking**: Monitor the health and specific metrics of different application versions.
- **Feature Toggles**: Quickly overview the status of feature toggles across releases.
- **Release Details**: Deep-dive into specific releases (GMUDs), related squads, and PRs.

## 🛠️ Tech Stack

This project leverages the following core technologies:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI Primitives](https://www.radix-ui.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Utilities**: [Date-fns](https://date-fns.org/)
- **Testing**: [Jest](https://jestjs.io/) / [React Testing Library](https://testing-library.com/)

## 🚀 Getting Started

Make sure you're in the right directory and have dependencies installed:

```bash
cd release-central
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🧪 Testing

To run the testing suite:

```bash
pnpm test
```

## 📂 Project Structure

- `/app` - Next.js App Router pages, routing components, and layouts.
- `/components` - Reusable UI elements and page components.
- `/lib` - Utility functions, type definitions, and shared logic.
- `/hooks` - Custom React hooks.
- `/openspec` - Design proposals, changes, and architecture specs to document the project's evolution.
