import { GameStats } from "./types";

export const mockGameStats: GameStats = {
  pontuacao_total: 1_123_433,
  pontuacao_media: 23_483,
  squads_scores: [
    {
      squad: "squad A",
      release_train: "release train A",
      community: "community A",
      delivery_items: [
        {
          issue_number: 1,
          gmud: "CHG1234567",
          removido: false,
          updated_at: "2022-01-01T00:00:00.000Z",
        },
        {
          issue_number: 2,
          gmud: "CHG1234568",
          removido: false,
          updated_at: "2022-01-02T00:00:00.000Z",
        },
      ],
      score_events: [
        {
          production_incident: 1,
          crash_incident: 2,
          code_review: 3,
          revert: 0,
        },
      ],
    },
    {
      squad: "squad B",
      release_train: "release train B",
      community: "community B",
      delivery_items: [
        {
          issue_number: 3,
          gmud: "CHG1234569",
          removido: false,
          updated_at: "2022-01-03T00:00:00.000Z",
        },
        {
          issue_number: 4,
          gmud: "CHG1234560",
          removido: false,
          updated_at: "2022-01-04T00:00:00.000Z",
        },
      ],
      score_events: [
        {
          production_incident: 1,
          crash_incident: 2,
          code_review: 3,
          revert: 0,
        },
      ],
    },
  ],
  score_events: [
    {
      production_incident: 1,
      crash_incident: 2,
      code_review: 3,
      revert: 0,
    },
  ],
};
