import type { AchievementDocument } from "@/features/achievements/models/achievements.schema";
import AchievementListItem from "./achievement-list-item";

export default function AchievementList({ achievements }: { achievements: AchievementDocument[] }) {
  if (!achievements || achievements.length === 0) {
    return (
      <div className="text-center py-12 p-8 border border-dashed rounded-lg bg-card/30">
        <h3 className="text-lg font-medium text-muted-foreground mb-1">No achievements found</h3>
        <p className="text-sm text-muted-foreground">Try adjusting your search or create a new achievement to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((achievement) => (
        <AchievementListItem key={String(achievement._id)} achievement={achievement} />
      ))}
    </div>
  );
}
