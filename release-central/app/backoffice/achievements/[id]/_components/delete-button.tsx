"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteAchievement } from "@/lib/achievements.actions";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id, name }: { id: string; name: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (window.confirm(`Are you sure you want to delete the achievement "${name}"?`)) {
      setIsDeleting(true);
      const result = await deleteAchievement(id);
      
      if (result.success) {
        router.push("/backoffice/achievements");
      } else {
        alert(result.error || "Failed to delete achievement");
        setIsDeleting(false);
      }
    }
  }

  return (
    <Button 
      variant="destructive" 
      onClick={handleDelete} 
      disabled={isDeleting}
      className="gap-2"
    >
      <Trash2 className="w-4 h-4" />
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
}
