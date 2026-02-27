import { mockGameStats } from "./data";
import { KPIHeader } from "./_components/kpi-header";
import { TimelineChart } from "./_components/timeline-chart";
import { AchievementsList } from "./_components/achievements-list";

export default function GamePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
          Rankings Dashboard
        </h2>
      </div>
      <div className="space-y-4">
        <KPIHeader stats={mockGameStats} />
        <TimelineChart stats={mockGameStats} />
        <AchievementsList achievements={mockGameStats.achievements} />
      </div>
    </div>
  );
}
