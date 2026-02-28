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

### Requirement: Global Achievements Overview
The system MUST display a global overview of achievements earned by teams in the current season.

#### Scenario: User views global achievements
Given the user is on the Game Dashboard
When the page loads
Then an "Achievements" section is displayed below the timeline
And the section lists global achievements
And each achievement shows its name, description, and the percentage of teams that earned it
And the list is sorted by percentage in descending order (most common first)

### Requirement: Squad Rankings Panel
The Game Dashboard SHALL display a panel containing a list of squads and their rankings.

#### Scenario: Displaying the Squad Rankings
- **WHEN** the user views the Squad Rankings panel
- **THEN** it MUST display a list of squads.
- **AND** each squad entry MUST include Position, Position Delta (with icons for up, down, or equal and the number of positions changed), Squad Name, Release Train Name, Community Name, Total Points, Total Deliveries, and Tier (1 to 5).
- **AND** the tier MUST be calculated based on the following rules: Tier 1 (Top 15%), Tier 2 (Next 20%), Tier 3 (Next 30%), Tier 4 (Next 20%), Tier 5 (Bottom 15%).
- **AND** all labels and texts MUST be in Portuguese (pt-br).

### Requirement: Squad Details View
The system SHALL provide a detailed view for a specific squad when selected from the rankings panel.

#### Scenario: Opening Squad Details
- **WHEN** the user clicks on a squad in the rankings list
- **THEN** a side panel or popup MUST open.
- **AND** it MUST display the squad's Total Deliveries, Total Events, and Total Score.
- **AND** it MUST display a list of Delivery Items (showing number and title).
- **AND** it MUST display a list of Events (showing name).
- **AND** all labels and texts MUST be in Portuguese (pt-br).

