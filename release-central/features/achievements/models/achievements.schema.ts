import { z } from 'zod';
import type { ObjectId } from 'mongodb';

// ─── Shared Zod Schemas ──────────────────────────────────────────────────────
// These schemas are the single source of truth for achievement validation.
// They are used by BOTH client-side forms AND server-side actions.

export const PREDEFINED_ICONS = [
  "Trophy", "Star", "Sword", "Shield", "Crown",
  "Gem", "Heart", "Zap", "Target", "Flame",
] as const;

export const AchievementFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be at most 500 characters"),
  icon: z.enum(PREDEFINED_ICONS, {
    message: "Please select a valid icon",
  }),
});

export type AchievementFormData = z.infer<typeof AchievementFormSchema>;

// Full document shape (includes DB-managed fields).
// Defined manually (not via z.infer) so _id can be ObjectId | string.
export interface AchievementDocument extends AchievementFormData {
  _id?: ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}
