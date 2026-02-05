export interface DeliveryItem {
  issue_number: number;
  gmud: string;
  removido: boolean;
  updated_at: string;
}

export interface ScoreEvents {
  production_incident: number;
  crash_incident: number;
  code_review: number;
  revert: number;
}

export interface SquadScore {
  squad: string;
  release_train: string;
  community: string;
  delivery_items: DeliveryItem[];
  score_events: ScoreEvents[];
  events: GameEvent[];
}

export interface GameStats {
  pontuacao_total: number;
  pontuacao_media: number;
  squads_scores: SquadScore[];
  score_events: ScoreEvents[];
}

export interface GameEvent {
  type: string;
  date: string;
  incident_number?: string;
  issue_number?: number;
}
