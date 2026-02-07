import { Achievement } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bug, Code, Zap, ShieldCheck, Trophy, LucideIcon } from "lucide-react";

interface AchievementsListProps {
  achievements: Achievement[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  Bug,
  Code,
  Zap,
  ShieldCheck,
  Trophy,
};

export function AchievementsList({ achievements }: AchievementsListProps) {
  const sortedAchievements = [...achievements].sort((a, b) => b.percentage - a.percentage);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Global Achievements</CardTitle>
        <CardDescription>
          Percent of teams that have earned these achievements in the current season.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {sortedAchievements.map((achievement) => {
            const Icon = ICON_MAP[achievement.iconName] || Trophy;
            return (
              <div key={achievement.id} className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="ml-4 space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden hidden sm:block">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${achievement.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold w-12 text-right">
                    {achievement.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
