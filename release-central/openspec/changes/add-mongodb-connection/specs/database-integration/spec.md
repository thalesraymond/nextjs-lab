## ADDED Requirements
### Requirement: MongoDB Database Connection
The system SHALL provide a reliable connection to a MongoDB database using the `MONGODB_URI` environment variable. The connection MUST be cached during development to prevent connection pool exhaustion across Next.js Hot Module Reloads.

#### Scenario: Application connects to MongoDB
- **WHEN** a data fetching utility requests a database connection
- **THEN** it successfully returns a connected MongoClient instance

#### Scenario: Development connection caching
- **WHEN** the application is running in development mode and hot reloads
- **THEN** it reuses the existing globally cached MongoClient connection rather than opening a new one
