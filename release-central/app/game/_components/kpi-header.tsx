import { useMemo } from "react";
import { GameStats } from "../types";
import { KPICard } from "./kpi-card";

interface KPIHeaderProps {
  stats: GameStats;
}

export function KPIHeader({ stats }: KPIHeaderProps) {
  // ⚡ Bolt: Cache total deliveries computation to prevent redundant O(N) array
  // iteration across all squads on every render.
  const totalDeliveries = useMemo(() => {
    return stats.squads_scores.reduce(
      (acc, squad) => acc + squad.delivery_items.length,
      0
    );
  }, [stats.squads_scores]);

  // Get Global Events (assuming first item in array as per design doc)
  const globalEvents = stats.score_events[0] || {
    production_incident: 0,
    crash_incident: 0,
    code_review: 0,
    revert: 0,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Pontuação Total"
        value={stats.pontuacao_total.toLocaleString()}
      />
      <KPICard
        title="Pontuação Média"
        value={stats.pontuacao_media.toLocaleString()}
      />
      <KPICard
        title="Total de Entregas"
        value={totalDeliveries.toLocaleString()}
      />
      <KPICard
        title="Soma total por eventos"
        value={
          <div className="flex flex-col gap-1 text-sm font-normal">
            <div className="flex justify-between">
              <span>Incidents:</span>
              <span className="font-bold">{globalEvents.production_incident}</span>
            </div>
            <div className="flex justify-between">
              <span>Crashes:</span>
              <span className="font-bold">{globalEvents.crash_incident}</span>
            </div>
            <div className="flex justify-between">
              <span>Code Reviews:</span>
              <span className="font-bold">{globalEvents.code_review}</span>
            </div>
            <div className="flex justify-between">
              <span>Reverts:</span>
              <span className="font-bold">{globalEvents.revert}</span>
            </div>
          </div>
        }
      />
    </div>
  );
}
