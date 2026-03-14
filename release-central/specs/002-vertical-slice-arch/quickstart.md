# Quickstart: Vertical Slice Architecture

This guide explains how to create a new Vertical Slice within the Next.js App Router application.

## 1. Directory Structure

When creating a new feature (e.g., `user-profiles`), create a new directory inside `features/`:

```bash
mkdir -p features/user-profiles/{actions,api,models,repositories,__tests__}
```

## 2. Models & Validation (Zod)

Define your shared validation schemas in `features/user-profiles/models/user-profile.schema.ts`:

```typescript
import { z } from 'zod';

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3),
  bio: z.string().optional(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
```

## 3. Repository Layer

Define the abstract interface in `features/user-profiles/repositories/user-profile.repo.ts`:

```typescript
import { UserProfile } from '../models/user-profile.schema';

export interface UserProfileRepository {
  getProfile(id: string): Promise<UserProfile | null>;
  // ... other methods
}
```

Implement both real and mock versions in adjacent files (`user-profile.repo.impl.ts` and `user-profile.repo.mock.ts`).

Export the correct instance in `features/user-profiles/repositories/index.ts`:

```typescript
import { UserProfileRepoImpl } from './user-profile.repo.impl';
import { UserProfileRepoMock } from './user-profile.repo.mock';
import type { UserProfileRepository } from './user-profile.repo';

const useMocks = process.env.USE_MOCKS === 'true';

export const userProfileRepository: UserProfileRepository = useMocks 
  ? new UserProfileRepoMock() 
  : new UserProfileRepoImpl();
```

## 4. Server Actions (Backend Logic)

Consume the repository in your server actions in `features/user-profiles/actions/get-profile.action.ts`:

```typescript
'use server';
import { userProfileRepository } from '../repositories';

export async function getProfile(id: string) {
  return await userProfileRepository.getProfile(id);
}
```

## 5. Next.js Frontend (UI)

Import the action and the schema from the Next.js `app/` directory:

```tsx
// app/profile/[id]/page.tsx
import { getProfile } from '@/features/user-profiles/actions/get-profile.action';
// ... UI rendering logic
```
