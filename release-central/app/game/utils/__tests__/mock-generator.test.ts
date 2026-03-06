import { generateGameStats } from "../mock-generator";

describe("generateGameStats", () => {
  it("returns a valid GameStats structure with defaults", () => {
    const stats = generateGameStats();
    expect(stats).toHaveProperty("pontuacao_total");
    expect(stats).toHaveProperty("pontuacao_media");
    expect(stats).toHaveProperty("squads_scores");
    expect(stats).toHaveProperty("score_events");
    expect(stats).toHaveProperty("achievements");
  });

  it("generates the requested number of squads", () => {
    const stats = generateGameStats({ squadsCount: 5 });
    expect(stats.squads_scores).toHaveLength(5);
  });

  it("assigns positions in ascending order (1-based)", () => {
    const stats = generateGameStats({ squadsCount: 10 });
    const positions = stats.squads_scores.map((s) => s.position);
    expect(positions).toEqual(Array.from({ length: 10 }, (_, i) => i + 1));
  });

  it("sorts squads by total_points descending", () => {
    const stats = generateGameStats({ squadsCount: 10 });
    for (let i = 0; i < stats.squads_scores.length - 1; i++) {
      expect(stats.squads_scores[i].total_points).toBeGreaterThanOrEqual(
        stats.squads_scores[i + 1].total_points
      );
    }
  });

  it("assigns tier 1 to top 15% of squads", () => {
    const stats = generateGameStats({ squadsCount: 20 });
    // Top 15% of 20 = positions 1-3
    const tier1Squads = stats.squads_scores.filter((s) => s.tier === 1);
    tier1Squads.forEach((s) => {
      expect(s.position / 20).toBeLessThanOrEqual(0.15);
    });
  });

  it("generates correct number of delivery items per squad", () => {
    const stats = generateGameStats({ squadsCount: 3, deliveriesPerSquad: 7 });
    stats.squads_scores.forEach((squad) => {
      expect(squad.delivery_items).toHaveLength(7);
      expect(squad.total_deliveries).toBe(7);
    });
  });

  it("generates 4 achievements", () => {
    const stats = generateGameStats();
    expect(stats.achievements).toHaveLength(4);
    stats.achievements.forEach((a) => {
      expect(a.name).toBeTruthy();
      expect(a.percentage).toBeGreaterThanOrEqual(0);
      expect(a.percentage).toBeLessThanOrEqual(100);
    });
  });

  it("aggregates global score events from all squads", () => {
    const stats = generateGameStats({ squadsCount: 3 });
    const globalEvents = stats.score_events[0];
    expect(globalEvents.production_incident).toBeGreaterThanOrEqual(0);
    expect(globalEvents.code_review).toBeGreaterThanOrEqual(0);
  });
});
