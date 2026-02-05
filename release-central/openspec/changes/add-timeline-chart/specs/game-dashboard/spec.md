## ADDED Requirements

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
