# API Contract: Achievements

## Endpoints (Internal API / Server Actions)

### GET `/api/achievements`
Returns a list of all achievements.

**Query Parameters**:
- `q`: Search string (filters by name)

**Response (200 OK)**:
```json
[
  {
    "id": "65f1a...",
    "name": "First Release",
    "icon": "Rocket",
    "description": "Successfully deployed your first version."
  }
]
```

### POST `/api/achievements` (or Server Action `createAchievement`)
Creates a new achievement.

**Payload**:
```json
{
  "name": "Top Squad",
  "icon": "Trophy",
  "description": "Reach the #1 spot in the rankings."
}
```

### PATCH `/api/achievements/[id]` (or Server Action `updateAchievement`)
Updates an existing achievement.

### DELETE `/api/achievements/[id]` (or Server Action `deleteAchievement`)
Removes an achievement.
