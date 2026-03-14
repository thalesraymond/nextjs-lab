"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { AchievementDocument } from "@/lib/types";
import { createAchievement, updateAchievement } from "@/lib/achievements.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as LucideIcons from "lucide-react";

// Predefined set of gamey icons
const PREDEFINED_ICONS = [
  "Trophy", "Star", "Sword", "Shield", "Crown", 
  "Gem", "Heart", "Zap", "Target", "Flame"
] as const;

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Saving..." : isEditing ? "Save Changes" : "Create Achievement"}
    </Button>
  );
}

export default function AchievementForm({ 
  achievement,
  onSuccess 
}: { 
  achievement?: AchievementDocument;
  onSuccess?: () => void;
}) {
  const [error, setError] = useState<string | null>(null);

  async function actionCallback(formData: FormData) {
    setError(null);
    let result;
    
    if (achievement?._id) {
      result = await updateAchievement(String(achievement._id), formData);
    } else {
      result = await createAchievement(formData);
    }

    if (result.success) {
      onSuccess?.();
    } else {
      setError(result.error || "An unknown error occurred.");
    }
  }

  return (
    <form action={actionCallback} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="name">Achievement Name</Label>
        <Input 
          id="name" 
          name="name" 
          defaultValue={achievement?.name || ""} 
          placeholder="e.g. First Blood" 
          required 
          minLength={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="icon">Icon Selection</Label>
        <Select name="icon" defaultValue={achievement?.icon || "Trophy"} required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an icon" />
          </SelectTrigger>
          <SelectContent>
            {PREDEFINED_ICONS.map((iconName) => {
              const IconComp = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
              return (
                <SelectItem key={iconName} value={iconName}>
                  <div className="flex items-center gap-2">
                    {IconComp && <IconComp className="w-4 h-4 text-primary" />}
                    <span>{iconName}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          defaultValue={achievement?.description || ""} 
          placeholder="Narrative description of this achievement..." 
          required 
          maxLength={500}
        />
      </div>

      <SubmitButton isEditing={!!achievement} />
    </form>
  );
}
