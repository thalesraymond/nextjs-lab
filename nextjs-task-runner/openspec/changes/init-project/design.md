# Design: Project Initialization

## Architecture: Vertical Slice Architecture
The application will follow a Vertical Slice Architecture.
- **Features**: Core business logic will reside in `src/features/<FeatureName>`.
- **Shared**: Common utilities and UI components in `src/components` and `src/lib`.

## Directory Structure
```
.
├── app/                  # Next.js App Router
├── src/
│   ├── features/         # Vertical Slices
│   ├── components/       # Shared UI components (Shadcn)
│   ├── lib/              # Shared utilities
│   ├── types/            # Shared types
├── openspec/             # Project specifications
├── docker-compose.yml    # Infrastructure
└── vitest.config.ts      # Test configuration
```

## Infrastructure
- **MongoDB**: Runs in a Docker container.
- **Seeding**: A startup script will seed the database with initial data for the lab environment.
