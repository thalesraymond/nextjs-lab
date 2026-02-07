# Design: Achievements Overview

## Data Model Changes

### `Achievement` Interface
We will add a new interface `Achievement` to `app/game/types.ts`:

```typescript
export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconName: string; // e.g., "Trophy", "Star", "Zap" (mapped to Lucide icons)
  percentage: number; // 0 to 100
}
```

### `GameStats` Update
The `GameStats` interface will include a new field:
```typescript
achievements: Achievement[];
```

## Mock Data Generation
The `generateGameStats` function in `app/game/utils/mock-generator.ts` will be updated to generate a fixed set of mock achievements with random percentages.
Example achievements:
- "Bug Hunter" (High percentage)
- "Clean Code" (Medium percentage)
- "Speed Demon" (Low percentage)
- "Zero Downtime" (Rare)

## UI Component: `AchievementsList`
- **Location**: `app/game/_components/achievements-list.tsx`
- **Layout**: A vertical list or a responsive grid.
- **Content per Item**:
    - **Icon**: A visual representation (using `lucide-react` icons).
    - **Text**: Name (bold) and Description (muted).
    - **Statistic**: A percentage bar or text (e.g., "75% of teams") aligned to the right.
- **Sorting**: The component will ensure achievements are displayed in descending order of `percentage`.

## Integration
In `app/game/page.tsx`:
```tsx
<div className="space-y-4">
  <KPIHeader stats={mockGameStats} />
  <TimelineChart stats={mockGameStats} />
  <AchievementsList achievements={mockGameStats.achievements} /> {/* New */}
</div>
```
