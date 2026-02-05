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

### Requirement: Timeline Visualization
The Game Dashboard SHALL display a chart visualization of deliveries and events over time.

#### Scenario: Delivery Volume
- **WHEN** viewing the timeline chart
- **THEN** it MUST display the volume of deliveries per day (aggregated from all squads).
- **AND** the X-axis SHOULD represent time (dates).

#### Scenario: Event Correlation
- **WHEN** viewing the timeline chart
- **THEN** it SHOULD indicate the presence of game events (incidents, reviews, etc.) on specific days, allowing the user to correlate deliveries with events.

### Requirement: Data Simulation
The system SHALL provide a mechanism to generate variable volumes of mock data for testing.

#### Scenario: High Volume Testing
- **WHEN** the mock generator is configured for high volume
- **THEN** the dashboard (KPIs and Chart) MUST render without crashing.

