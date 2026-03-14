import type { AchievementsRepository } from './achievements.repo';
import { AchievementsRepoImpl } from './achievements.repo.impl';
import { AchievementsRepoMock } from './achievements.repo.mock';

// ─── Repository Factory ─────────────────────────────────────────────────────
// Toggle between real and mock implementations via environment variable.
// Set USE_MOCKS=true in .env to use mock data during development.

const useMocks = process.env.USE_MOCKS === 'true';

export const achievementsRepository: AchievementsRepository = useMocks
  ? new AchievementsRepoMock()
  : new AchievementsRepoImpl();

export type { AchievementsRepository } from './achievements.repo';
