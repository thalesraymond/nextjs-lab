# Data Model: Achievements

## Entity: Achievement

Represents a gamified milestone that can be managed via the backoffice.

| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| `_id` | `ObjectId` | Auto-generated | MongoDB unique identifier |
| `name` | `string` | Required, Unique, Min 3 chars | Display name of the achievement |
| `icon` | `string` | Required | Lucide icon name (e.g., "Trophy", "Star") |
| `description` | `string` | Required, Max 500 chars | Narrative description of the achievement |
| `createdAt` | `Date` | Auto | Timestamp of creation |
| `updatedAt` | `Date` | Auto | Timestamp of last update |

## Relationships
- **Currently Independent**: In this phase, achievements are standalone records.
- **Future Integration**: Will be linked to "UserAchievements" or "SquadProgress" in subsequent features.

## State Transitions
- **Draft/Published**: (Optional/Future) Currently all achievements are active upon creation.
