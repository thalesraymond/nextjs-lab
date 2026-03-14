import type { AchievementsRepository } from './achievements.repo';
import type { AchievementDocument, AchievementFormData } from '../models/achievements.schema';

// ─── Mock In-Memory Implementation ──────────────────────────────────────────

const SEED_DATA: AchievementDocument[] = [
  {
    _id: 'mock-1',
    name: 'First Blood',
    description: 'Complete your first release',
    icon: 'Sword',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    _id: 'mock-2',
    name: 'Speed Demon',
    description: 'Deploy 3 releases in one day',
    icon: 'Zap',
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2025-02-01'),
  },
  {
    _id: 'mock-3',
    name: 'Guardian',
    description: 'Zero incidents for 30 consecutive days',
    icon: 'Shield',
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date('2025-03-01'),
  },
];

let store = [...SEED_DATA];
let nextId = 4;

export class AchievementsRepoMock implements AchievementsRepository {
  async getAll(query: string = ''): Promise<AchievementDocument[]> {
    if (!query) return [...store].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return store
      .filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getById(id: string): Promise<AchievementDocument | null> {
    return store.find((a) => String(a._id) === id) ?? null;
  }

  async create(data: AchievementFormData): Promise<AchievementDocument> {
    const now = new Date();
    const doc: AchievementDocument = {
      _id: `mock-${nextId++}`,
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    store.push(doc);
    return doc;
  }

  async update(id: string, data: Partial<AchievementFormData>): Promise<AchievementDocument | null> {
    const idx = store.findIndex((a) => String(a._id) === id);
    if (idx === -1) return null;
    store[idx] = { ...store[idx], ...data, updatedAt: new Date() };
    return store[idx];
  }

  async remove(id: string): Promise<boolean> {
    const before = store.length;
    store = store.filter((a) => String(a._id) !== id);
    return store.length < before;
  }
}
