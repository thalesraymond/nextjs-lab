# Feature Specification: Backoffice Achievements Management

**Feature Branch**: `001-achievements-crud`  
**Created**: 2026-03-12  
**Status**: Draft  
**Input**: User description: "Right now our @app/game/ is fully mocked, before changing that we need to add a way in the @app/backoffice/ to create, visualize and edit achievements. we need a simple crud of achievements with name, icon and description (rules and target for actually achieve the achievement is out of scope here)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create Achievement (Priority: P1)

As a Backoffice Admin, I want to create new achievements with a name, icon, and description so that I can expand the game's reward system.

**Why this priority**: Fundamental requirement for populating the achievement system. Without creation, no data exists to manage or display.

**Independent Test**: Can be fully tested by filling out the achievement creation form and verifying the record appears in the system.

**Acceptance Scenarios**:

1. **Given** the achievement creation form, **When** I provide a unique name, valid icon, and description and submit, **Then** a new achievement record is created.
2. **Given** the achievement creation form, **When** I submit with missing mandatory fields (name/description), **Then** the system prevents submission and shows validation errors.

---

### User Story 2 - Visualize Achievement List & Details (Priority: P1)

As a Backoffice Admin, I want to see a list of all current achievements and view details for any specific one so that I can review the current library of rewards.

**Why this priority**: Essential for auditing and selecting achievements for modification.

**Independent Test**: Can be tested by navigating to the achievements list and ensuring all previously created achievements are visible with their correct details.

**Acceptance Scenarios**:

1. **Given** existing achievements in the system, **When** I navigate to the backoffice achievements page, **Then** I see a searchable/filterable list of all achievements.
2. **Given** an achievement in the list, **When** I click on it, **Then** I am shown a detailed view containing its full description and icon.

---

### User Story 3 - Edit Achievement (Priority: P2)

As a Backoffice Admin, I want to edit existing achievement details so that I can correct typos or update branding/messaging.

**Why this priority**: Important for maintenance and flexibility, though less critical than initial creation and visibility for an MVP.

**Independent Test**: Can be tested by modifying a name or description and verifying the change persists in the list and detail views.

**Acceptance Scenarios**:

1. **Given** an existing achievement, **When** I update its description and save, **Then** the new description is immediately reflected in the system.

---

### User Story 4 - Delete Achievement (Priority: P3)

As a Backoffice Admin, I want to delete achievements that are no longer relevant or were created in error.

**Why this priority**: Necessary for cleanup, but carries high risk if achievements are already linked to user progress (out of scope for now).

**Independent Test**: Can be tested by deleting a record and verifying it no longer appears in any lists.

**Acceptance Scenarios**:

1. **Given** an existing achievement, **When** I select the delete option and confirm, **Then** the achievement is removed from the system.

### Edge Cases

- **Duplicate Names**: What happens when an admin tries to create an achievement with a name that already exists? (Standard: prevent with error).
- **Icon Format**: How are icons selected/stored? (Assumption: Selected from a predefined set of Lucide icons or a URL reference).
- **Orphaned References**: If an achievement is deleted, what happens to the (currently mocked) game logic that might reference it? (Assumption: Deletion is restricted if references exist, but since game is mocked, simple deletion is fine for now).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a user interface in the backoffice for listing all achievements.
- **FR-002**: Admins MUST be able to create an achievement by providing a unique Name, a Description, and selecting an Icon.
- **FR-003**: The system MUST validate that Name and Description are not empty before saving.
- **FR-004**: Admins MUST be able to update the Name, Description, and Icon of an existing achievement.
- **FR-005**: Admins MUST be able to delete an achievement after a confirmation prompt.
- **FR-006**: The achievement list MUST be searchable by Name.
- **FR-007**: Icons MUST be selected from a predefined list of project-approved icons to ensure visual consistency across the achievement system.

### Key Entities

- **Achievement**: Represents a gamified milestone.
  - `id`: Unique identifier.
  - `name`: Display name (unique).
  - `icon`: Identifier for the visual representation.
  - `description`: Text explaining the achievement.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An admin can create a new achievement in under 30 seconds.
- **SC-002**: The achievements list loads in under 1 second for up to 100 items.
- **SC-003**: 100% of CRUD operations (Create, Read, Update, Delete) are reflected in the database and UI without manual refresh.
- **SC-004**: Users report that the interface is consistent with the existing "gamey" backoffice aesthetic.
