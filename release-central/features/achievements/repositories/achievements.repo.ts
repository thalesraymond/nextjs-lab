import type { AchievementDocument, AchievementFormData } from '../models/achievements.schema';

// ─── Repository Interface ────────────────────────────────────────────────────
// All data access for achievements goes through this contract.
// Implementations live in `.impl.ts` (real DB) and `.mock.ts` (static data).

export interface AchievementsRepository {
  getAll(query?: string): Promise<AchievementDocument[]>;
  getById(id: string): Promise<AchievementDocument | null>;
  create(data: AchievementFormData): Promise<AchievementDocument>;
  update(id: string, data: Partial<AchievementFormData>): Promise<AchievementDocument | null>;
  remove(id: string): Promise<boolean>;
}
