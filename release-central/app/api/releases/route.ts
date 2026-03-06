import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { ReleaseDocument } from '@/lib/types';

const DB_NAME = 'release-central';
const COLLECTION = 'release';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const releases = await db
      .collection<ReleaseDocument>(COLLECTION)
      .find({})
      .sort({ dateLimit: -1 })
      .toArray();

    return NextResponse.json(releases);
  } catch (error) {
    console.error('Failed to fetch releases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch releases' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { platform, version, dateLimit, gmud } = body;

    if (!platform || !['android', 'ios'].includes(platform)) {
      return NextResponse.json(
        { error: 'Platform must be "android" or "ios"' },
        { status: 400 }
      );
    }

    if (!version || typeof version !== 'string') {
      return NextResponse.json(
        { error: 'Version is required' },
        { status: 400 }
      );
    }

    if (!dateLimit || typeof dateLimit !== 'string') {
      return NextResponse.json(
        { error: 'Deadline (dateLimit) is required' },
        { status: 400 }
      );
    }

    const release: Omit<ReleaseDocument, '_id'> = {
      platform,
      version: version.trim(),
      dateLimit,
      gmud: gmud?.trim() || '',
      packageCount: 0,
      legalDemands: 0,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection<ReleaseDocument>(COLLECTION).insertOne(release as ReleaseDocument);

    return NextResponse.json(
      { ...release, _id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create release:', error);
    return NextResponse.json(
      { error: 'Failed to create release' },
      { status: 500 }
    );
  }
}
