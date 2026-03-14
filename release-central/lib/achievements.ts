import { ObjectId } from 'mongodb';
import clientPromise, { databaseName } from './mongodb';
import { AchievementDocument } from './types';

export async function getAchievementsCollection() {
  const client = await clientPromise;
  const db = client.db(databaseName);
  return db.collection<AchievementDocument>('achievements');
}

export async function getAchievements(query: string = '') {
  const collection = await getAchievementsCollection();
  
  const filter = query 
    ? { name: { $regex: query, $options: 'i' } } 
    : {};

  return collection.find(filter).sort({ createdAt: -1 }).toArray();
}

export async function getAchievementById(id: string) {
  const collection = await getAchievementsCollection();
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createAchievement(achievement: Omit<AchievementDocument, '_id' | 'createdAt' | 'updatedAt'>) {
  const collection = await getAchievementsCollection();
  const now = new Date();
  
  const newAchievement = {
    ...achievement,
    createdAt: now,
    updatedAt: now,
  };
  
  const result = await collection.insertOne(newAchievement);
  return { ...newAchievement, _id: result.insertedId };
}

export async function updateAchievement(id: string, updates: Partial<Omit<AchievementDocument, '_id' | 'createdAt' | 'updatedAt'>>) {
  const collection = await getAchievementsCollection();
  
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date() } },
    { returnDocument: 'after' }
  );
  
  return result;
}

export async function deleteAchievement(id: string) {
  const collection = await getAchievementsCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
