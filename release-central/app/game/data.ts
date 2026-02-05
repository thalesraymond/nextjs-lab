import { generateGameStats } from "./utils/mock-generator";
import { GameStats } from "./types";

// Generate mock data with a reasonable amount of activity for visualization
export const mockGameStats: GameStats = generateGameStats({
  squadsCount: 4,
  deliveriesPerSquad: 50,
  eventsPerSquad: 20,
  daysRange: 30,
});
