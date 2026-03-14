"use server";

import { createAchievement as createDb, updateAchievement as updateDb, deleteAchievement as deleteDb } from "./achievements";
import { revalidatePath } from "next/cache";

export async function createAchievement(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const icon = formData.get("icon") as string;

  if (!name || !description || !icon) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    const result = await createDb({ name, description, icon });
    revalidatePath("/backoffice/achievements");
    return { 
      success: true, 
      data: { ...result, _id: result._id?.toString() } 
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create achievement" };
  }
}

export async function updateAchievement(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const icon = formData.get("icon") as string;

  if (!name || !description || !icon) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    const result = await updateDb(id, { name, description, icon });
    revalidatePath("/backoffice/achievements");
    revalidatePath(`/backoffice/achievements/${id}`);
    return { 
      success: true, 
      data: result ? { ...result, _id: result._id?.toString() } : null 
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update achievement" };
  }
}

export async function deleteAchievement(id: string) {
  try {
    await deleteDb(id);
    revalidatePath("/backoffice/achievements");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete achievement" };
  }
}
