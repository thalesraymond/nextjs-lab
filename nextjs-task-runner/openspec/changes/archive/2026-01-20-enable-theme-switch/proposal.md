# Proposal: Enable Dark/Light Mode Switch

## Goal
Implement a robust dark/light mode switching mechanism to enhance user experience and accessibility. This ensures the application can adapt to user system preferences or explicit overrides.

## User Review Required
> [!NOTE]
> This change introduces `next-themes` as a dependency.
> We will adhere to Tailwind CSS v4 conventions for dark mode (using CSS variables).

## Proposed Changes
### Frontend
#### [NEW] [theme-provider.tsx](file:///home/thales/projects/nextjs-lab/nextjs-task-runner/src/components/theme-provider.tsx)
#### [NEW] [mode-toggle.tsx](file:///home/thales/projects/nextjs-lab/nextjs-task-runner/src/components/mode-toggle.tsx)
#### [MODIFY] [layout.tsx](file:///home/thales/projects/nextjs-lab/nextjs-task-runner/src/app/layout.tsx)

## Verification Plan
### Automated Tests
- No new unit tests planned for the provider itself as it wraps `next-themes`.
- `vitest` will be run to ensure no regressions.

### Manual Verification
1. Open the application.
2. Locate the theme toggle button.
3. Switch to Dark Mode -> Verify background becomes dark and text light.
4. Switch to Light Mode -> Verify background becomes light and text dark.
5. Switch to System -> Verify it matches the OS preference.
