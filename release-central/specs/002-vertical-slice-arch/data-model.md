# Phase 1: Data Model & Contracts

Because this is an architectural standardization feature rather than a specific product feature, this document defines the *structural data model* (the template) that all future vertical slices must follow.

## Entities (Architectural Template)

### 1. Validation Schema (`[feature].schema.ts`)
- Defines the Zod schemas for the domain entity and its DTOs (Data Transfer Objects).
- **Rules**: Must be fully isomorphic (usable on client and server).
- **Example**:
  ```typescript
  import { z } from 'zod';
  export const UserSchema = z.object({ id: z.string(), name: z.string() });
  ```

### 2. Domain Model (`[feature].types.ts`)
- TypeScript interfaces representing the core business entities. Usually inferred from the Zod schemas.
- **Example**:
  ```typescript
  export type User = z.infer<typeof UserSchema>;
  ```

### 3. Repository Interface (`[feature].repo.ts`)
- Defines the contract for data access operations.
- **Example**:
  ```typescript
  export interface UserRepository {
    getById(id: string): Promise<User | null>;
    save(user: User): Promise<void>;
  }
  ```

### 4. Real Implementation (`[feature].repo.impl.ts`)
- The concrete implementation connecting to the database/external API.
- Implements the Repository Interface.

### 5. Mock Implementation (`[feature].repo.mock.ts`)
- The concrete mock implementation returning in-memory or static data.
- Implements the Repository Interface.

### 6. Repository Factory (`index.ts` within the repository folder)
- Responsible for inspecting the environment and returning either the real or mock implementation.

## Contracts

No external API contracts are defined for this structural task. The "contracts" are the internal TypeScript interfaces defined in the repository layer.
