import type { AchievementDocument } from "@/features/achievements/models/achievements.schema";
import { Card, CardContent } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import Link from "next/link";

export default function AchievementListItem({ achievement }: { achievement: AchievementDocument }) {
  // Grab the icon from Lucide, default to HelpCircle if not found
  const IconComponent = ((LucideIcons as Record<string, unknown>)[achievement.icon] as React.ElementType) || LucideIcons.HelpCircle;

  return (
    <Link href={`/backoffice/achievements/${achievement._id}`}>
      <Card className="hover:border-primary/50 cursor-pointer transition-colors bg-card/50 text-card-foreground shadow-sm">
        <CardContent className="p-4 flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg shrink-0">
            <IconComponent className="w-8 h-8 text-primary" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate leading-none mb-2">{achievement.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{achievement.description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
