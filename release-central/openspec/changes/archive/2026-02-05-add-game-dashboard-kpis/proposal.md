# Change: Add Game Dashboard KPIs

## Why
The game dashboard currently lacks high-level metrics to give users a quick overview of performance. Adding a KPI header will provide immediate visibility into key statistics like total score, average score, total deliveries, and event summaries.

## What Changes
- Add a new "Game Dashboard" capability.
- Implement a KPI header on `@app/game/page.tsx`.
- Display "Pontuação Total", "Pontuação Média", "Total de Entregas", and "Soma total por eventos".
- Use the provided JSON structure as the data source schema.
- adherence to "shadcn ui" design system.

## Impact
- **Specs**: New `game-dashboard` capability.
- **Code**: Modify `app/game/page.tsx` to include the KPI header. Potentially add new UI components (like Card) if not present.
