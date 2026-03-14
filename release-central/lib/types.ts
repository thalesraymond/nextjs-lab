import { ObjectId } from 'mongodb';

export interface ReleaseItemFlags {
  causedProductionIncident: boolean;
  causedRegressionCrash: boolean;
  codeReviewDiscussions: boolean;
  prWasReverted: boolean;
}

export interface PackageItem {
  gmudNumber: string;
  prNumber: string;
  prUrl: string;
  title: string;
  squad: string;
  hasFeatureToggle: boolean;
  isLegalDemand: boolean;
  flags: ReleaseItemFlags;
}

export interface ReleaseDocument {
  _id?: ObjectId;
  platform: 'android' | 'ios';
  version: string;
  dateLimit: string;
  gmud: string;
  packages: PackageItem[];
  createdAt: Date;
}

export interface UserDocument {
  _id?: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  admin: boolean;
  createdAt: Date;
}

export interface AchievementDocument {
  _id?: ObjectId | string;
  name: string;
  icon: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
