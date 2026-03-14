"use server";

import { revalidatePath } from "next/cache";
import { achievementsRepository } from "../repositories";
import { AchievementFormSchema } from "../models/achievements.schema";

// ─── Server Actions (Vertical Slice) ────────────────────────────────────────
// These are the public API for the achievements feature.
// They validate with Zod and delegate to the repository.

export async function getAchievements(query: string = '') {
  return achievementsRepository.getAll(query);
}

export async function getAchievementById(id: string) {
  return achievementsRepository.getById(id);
}

export async function createAchievement(formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    icon: formData.get("icon") as string,
  };

  const parsed = AchievementFormSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Validation failed";
    return { success: false, error: firstError };
  }

  try {
    const result = await achievementsRepository.create(parsed.data);
    revalidatePath("/backoffice/achievements");
    return {
      success: true,
      data: { ...result, _id: result._id?.toString() },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create achievement",
    };
  }
}

export async function updateAchievement(id: string, formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    icon: formData.get("icon") as string,
  };

  const parsed = AchievementFormSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Validation failed";
    return { success: false, error: firstError };
  }

  try {
    const result = await achievementsRepository.update(id, parsed.data);
    revalidatePath("/backoffice/achievements");
    revalidatePath(`/backoffice/achievements/${id}`);
    return {
      success: true,
      data: result ? { ...result, _id: result._id?.toString() } : null,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update achievement",
    };
  }
}

export async function deleteAchievement(id: string) {
  try {
    await achievementsRepository.remove(id);
    revalidatePath("/backoffice/achievements");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete achievement",
    };
  }
}
