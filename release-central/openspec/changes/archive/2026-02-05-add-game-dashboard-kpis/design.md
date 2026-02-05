## Context
The user wants to display KPI metrics on the Game Dashboard page. The data is provided in a specific JSON format. We need to parse this data (or mock it for now based on the schema) and display it using the project's design system (Shadcn UI).

## Goals
- Display 4 key metrics: Total Score, Average Score, Total Deliveries, Event Sums.
- Use a clean, "big number" design for the top row of the dashboard.
- Ensure the implementation is responsive and matches existing UI styles.

## Decisions
- **Data Source**: For this iteration, we will likely hardcode the mock data or create a simple utility to return it, anticipating a future API integration. The proposal focuses on the UI.
- **Components**: We will use standard Shadcn UI `Card` components (to be added if missing) to containerize each KPI.
- **Layout**: A grid layout (likely 4 columns on large screens) will be used for the header.

## Data Model
Based on provided JSON:
```typescript
interface DeliveryItem {
  issue_number: number;
  gmud: string;
  removido: boolean;
  updated_at: string;
}

interface ScoreEvents {
  production_incident: number;
  crash_incident: number;
  code_review: number;
  revert: number;
}

interface SquadScore {
  squad: string;
  release_train: string;
  community: string;
  delivery_items: DeliveryItem[];
  score_events: ScoreEvents[];
}

interface GameStats {
  pontuacao_total: number;
  pontuacao_media: number;
  squads_scores: SquadScore[];
  score_events: ScoreEvents[]; // Note: Array in JSON, likely single item or aggregated history
}
```

## Calculations
- **Total de Entregas**: Calculated by summing the length of `delivery_items` arrays across all `squads_scores` (if not provided directly in root).
- **Soma total por eventos**: Display the values from the root `score_events` object (likely the first item if it's an array).

## Risks
- None significant. Purely additive UI change.
