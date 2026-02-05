import { mockGameStats } from "./data";
import { KPIHeader } from "./_components/kpi-header";

export default function GamePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Game Dashboard</h2>
      </div>
      <div className="space-y-4">
        <KPIHeader stats={mockGameStats} />
      </div>
    </div>
  );
}
