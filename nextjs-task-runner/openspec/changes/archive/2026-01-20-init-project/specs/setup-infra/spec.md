# Spec: Setup Infrastructure

## ADDED Requirements

### Requirement: MongoDB Container
A local MongoDB instance MUST be available via Docker Compose.

#### Scenario: Start Database
- GIVEN `docker-compose.yml` exists
- WHEN I run `docker-compose up -d`
- THEN a mongodb container should be running on port 27017

### Requirement: Database Seeding
The database MUST be seedable for lab experiments.

#### Scenario: Seed Data
- GIVEN the database is running
- WHEN I run the seed script
- THEN the database should contain initial sample workflows
