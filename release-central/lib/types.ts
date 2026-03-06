import { ObjectId } from 'mongodb';

export interface ReleaseDocument {
  _id?: ObjectId;
  platform: 'android' | 'ios';
  version: string;
  dateLimit: string;
  gmud: string;
  packageCount: number;
  legalDemands: number;
  createdAt: Date;
}
