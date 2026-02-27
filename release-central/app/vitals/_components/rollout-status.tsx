import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VitalsStats } from "../data";

export function RolloutStatus({ stats }: { stats: VitalsStats }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-xl">Current Rollout: {stats.currentVersion}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground uppercase tracking-wider font-semibold">Stage</span>
          <span className="capitalize px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {stats.rolloutStage}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">Adoption Progress</span>
            <span className="font-bold text-white">{stats.rolloutPercentage}%</span>
          </div>
          <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000 ease-in-out" 
              style={{ width: `${stats.rolloutPercentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
