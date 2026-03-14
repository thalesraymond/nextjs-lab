import { ObjectId } from 'mongodb';
import clientPromise, { databaseName } from '@/lib/mongodb';
import type { AchievementsRepository } from './achievements.repo';
import type { AchievementDocument, AchievementFormData } from '../models/achievements.schema';

// ─── Real MongoDB Implementation ─────────────────────────────────────────────

async function getCollection() {
  const client = await clientPromise;
  const db = client.db(databaseName);
  return db.collection<AchievementDocument>('achievements');
}

export class AchievementsRepoImpl implements AchievementsRepository {
  async getAll(query: string = ''): Promise<AchievementDocument[]> {
    const collection = await getCollection();
    const filter = query
      ? { name: { $regex: query, $options: 'i' } }
      : {};
    return collection.find(filter).sort({ createdAt: -1 }).toArray();
  }

  async getById(id: string): Promise<AchievementDocument | null> {
    const collection = await getCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async create(data: AchievementFormData): Promise<AchievementDocument> {
    const collection = await getCollection();
    const now = new Date();
    const doc = { ...data, createdAt: now, updatedAt: now };
    const result = await collection.insertOne(doc);
    return { ...doc, _id: result.insertedId };
  }

  async update(id: string, data: Partial<AchievementFormData>): Promise<AchievementDocument | null> {
    const collection = await getCollection();
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } },
      { returnDocument: 'after' },
    );
    return result;
  }

  async remove(id: string): Promise<boolean> {
    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}
