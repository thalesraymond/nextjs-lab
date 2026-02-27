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
    <Card className="col-span-4 border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white tracking-tight">Global Achievements</CardTitle>
        <CardDescription className="text-primary/70 font-medium">
          Percent of teams that have earned these achievements in the current season.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {sortedAchievements.map((achievement) => {
            const Icon = ICON_MAP[achievement.iconName] || Trophy;
            return (
              <div key={achievement.id} className="flex items-center group p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,0,0,0)] group-hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4 space-y-1 flex-1">
                  <p className="text-base font-bold text-gray-100 leading-none group-hover:text-white transition-colors">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
                <div className="ml-4 flex items-center gap-3">
                  <div className="w-32 h-2.5 bg-black/40 rounded-full overflow-hidden hidden sm:block border border-white/5 shadow-inner">
                    <div 
                      className="h-full bg-primary shadow-[0_0_10px_var(--color-primary)]" 
                      style={{ width: `${achievement.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-black w-12 text-right text-primary">
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
