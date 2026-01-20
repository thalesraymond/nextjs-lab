# Tasks: Initialize Project

- [ ] Initialize Next.js Project <!-- id: 1 -->
    - Run `npx create-next-app@latest . --typescript --tailwind --eslint`
    - Verify strict mode in `tsconfig.json`
- [ ] Configure UI & Styling <!-- id: 2 -->
    - Initialize Shadcn UI: `npx shadcn-ui@latest init`
    - Verify `components.json` configuration
- [ ] Setup Infrastructure <!-- id: 3 -->
    - Create `docker-compose.yml` for MongoDB
    - Create `db-seed` script/directory
- [ ] Configure Testing <!-- id: 4 -->
    - Install `vitest` and `@testing-library/react`
    - Create `vitest.config.ts`
    - Create `tsconfig.test.ts`
- [ ] Structure Codebase <!-- id: 5 -->
    - Create `src/features` directory
    - Clean up default `app/page.tsx`
