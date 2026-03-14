"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AchievementForm from "./achievement-form";

export default function CreateAchievementDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Achievement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Achievement</DialogTitle>
          <DialogDescription>
            Add a new milestone to the game. It will be available immediately.
          </DialogDescription>
        </DialogHeader>
        <AchievementForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
