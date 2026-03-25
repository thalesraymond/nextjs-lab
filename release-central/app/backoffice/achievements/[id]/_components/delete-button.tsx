"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, AlertCircle } from "lucide-react";
import { deleteAchievement } from "@/lib/achievements.actions";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const resetConfirmation = () => {
    setIsConfirming(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  async function handleDelete() {
    if (!isConfirming) {
      setIsConfirming(true);
      timeoutRef.current = setTimeout(resetConfirmation, 3000);
      return;
    }

    resetConfirmation();
    setIsDeleting(true);
    const result = await deleteAchievement(id);

    if (result.success) {
      router.push("/backoffice/achievements");
    } else {
      alert(result.error || "Failed to delete achievement");
      setIsDeleting(false);
    }
  }

  return (
    <Button 
      variant="destructive" 
      onClick={handleDelete} 
      onBlur={resetConfirmation}
      disabled={isDeleting}
      className="gap-2 min-w-[120px] transition-all duration-300"
      aria-live="polite"
    >
      {isConfirming ? <AlertCircle className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
      {isDeleting ? "Deleting..." : isConfirming ? "Confirm Delete?" : "Delete"}
    </Button>
  );
}
