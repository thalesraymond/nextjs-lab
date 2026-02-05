# game-dashboard Specification

## Purpose
TBD - created by archiving change add-game-dashboard-kpis. Update Purpose after archive.
## Requirements
### Requirement: Game Dashboard KPI Header
The Game Dashboard SHALL display a high-level summary of game metrics at the top of the page.

#### Scenario: Displaying Key Metrics
- **WHEN** the user visits the Game Dashboard
- **THEN** the top row MUST display "Pontuação Total" (Total Score).
- **AND** "Pontuação Média" (Average Score).
- **AND** "Total de Entregas" (Total Deliveries).
- **AND** "Soma total por eventos" (Total Sum by Events).

#### Scenario: Data Formatting
- **WHEN** displaying the metrics
- **THEN** large numbers (like scores) SHOULD be formatted for readability (e.g., locale string).

#### Scenario: Event Breakdown
- **WHEN** displaying "Soma total por eventos"
- **THEN** it SHOULD show the aggregated counts for `production_incident`, `crash_incident`, `code_review`, and `revert` from the global `score_events`.

