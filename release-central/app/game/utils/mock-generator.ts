import { GameEvent, GameStats, SquadScore, DeliveryItem, ScoreEvents, Achievement } from "../types";

interface GenerateParams {
  squadsCount?: number;
  deliveriesPerSquad?: number;
  eventsPerSquad?: number;
  daysRange?: number;
}

const EVENT_TYPES = ["production_incident", "crash_incident", "code_review", "revert"];
const GMUD_PREFIX = "CHG";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(daysRange: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - randomInt(0, daysRange));
  return date;
}

function generateDeliveryItems(count: number, daysRange: number): DeliveryItem[] {
  return Array.from({ length: count }).map(() => ({
    issue_number: randomInt(1000, 9999),
    gmud: `${GMUD_PREFIX}${randomInt(100000, 999999)}`,
    removido: Math.random() < 0.1,
    updated_at: randomDate(daysRange).toISOString(),
  }));
}

function generateGameEvents(count: number, daysRange: number): GameEvent[] {
  return Array.from({ length: count }).map(() => ({
    type: EVENT_TYPES[randomInt(0, EVENT_TYPES.length - 1)],
    date: randomDate(daysRange).toISOString(),
    incident_number: Math.random() > 0.5 ? `INC${randomInt(1000, 9999)}` : undefined,
    issue_number: Math.random() > 0.5 ? randomInt(1000, 9999) : undefined,
  }));
}

function generateScoreEvents(): ScoreEvents {
  return {
    production_incident: randomInt(0, 5),
    crash_incident: randomInt(0, 10),
    code_review: randomInt(10, 50),
    revert: randomInt(0, 2),
  };
}

function generateAchievements(): Achievement[] {
  return [
    {
      id: "1",
      name: "Bug Hunter",
      description: "Resolved more than 10 production incidents in a single season.",
      iconName: "Bug",
      percentage: randomInt(60, 95),
    },
    {
      id: "2",
      name: "Clean Code Architect",
      description: "Completed 50+ code reviews with zero reverts requested.",
      iconName: "Code",
      percentage: randomInt(30, 60),
    },
    {
      id: "3",
      name: "Speed Demon",
      description: "Merged a critical fix within 1 hour of incident report.",
      iconName: "Zap",
      percentage: randomInt(10, 30),
    },
    {
      id: "4",
      name: "Zero Downtime Legend",
      description: "Maintained 100% uptime during major release train.",
      iconName: "ShieldCheck",
      percentage: randomInt(1, 15),
    },
  ];
}

export function generateGameStats({
  squadsCount = 2,
  deliveriesPerSquad = 10,
  eventsPerSquad = 5,
  daysRange = 30,
}: GenerateParams = {}): GameStats {
  const squads_scores: SquadScore[] = Array.from({ length: squadsCount }).map((_, i) => ({
    squad: `Squad ${String.fromCharCode(65 + i)}`,
    release_train: `Release Train ${String.fromCharCode(65 + i)}`,
    community: `Community ${String.fromCharCode(65 + i)}`,
    delivery_items: generateDeliveryItems(deliveriesPerSquad, daysRange),
    score_events: [generateScoreEvents()],
    events: generateGameEvents(eventsPerSquad, daysRange),
  }));

  const globalEvents = squads_scores.reduce(
    (acc, squad) => {
      const squadEvents = squad.score_events[0];
      return {
        production_incident: acc.production_incident + squadEvents.production_incident,
        crash_incident: acc.crash_incident + squadEvents.crash_incident,
        code_review: acc.code_review + squadEvents.code_review,
        revert: acc.revert + squadEvents.revert,
      };
    },
    { production_incident: 0, crash_incident: 0, code_review: 0, revert: 0 }
  );

  return {
    pontuacao_total: randomInt(500000, 2000000),
    pontuacao_media: randomInt(10000, 50000),
    squads_scores,
    score_events: [globalEvents],
    achievements: generateAchievements(),
  };
}
