# Quickstart: Achievements CRUD

## Development Setup

1. **Environment**: Ensure `MONGODB_URI` is set in your `.env.local`.
2. **Navigation**: Access the feature via `/backoffice/achievements`.

## Implementation Path

1. **Schema**: Define `Achievement` in `lib/types.ts`.
2. **API/Actions**: Implement CRUD logic in `app/api/achievements/route.ts` or Server Actions.
3. **UI - List**: Create `app/backoffice/achievements/page.tsx`.
4. **UI - Form**: Create `app/backoffice/achievements/_components/achievement-form.tsx`.
5. **Testing**: Run `pnpm test app/backoffice/achievements` to verify.

## Verification Steps

- [ ] Create an achievement called "Test Achievement".
- [ ] Search for "Test" in the list.
- [ ] Edit the description.
- [ ] Delete the achievement.
