import { ObjectId } from 'mongodb';

export interface PackageItem {
  gmudNumber: string;
  prNumber: string;
  prUrl: string;
  title: string;
  squad: string;
  hasFeatureToggle: boolean;
  isLegalDemand: boolean;
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
