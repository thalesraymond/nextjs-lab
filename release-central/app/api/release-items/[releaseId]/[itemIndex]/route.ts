import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise, { databaseName } from '@/lib/mongodb';
import type { ReleaseDocument, ReleaseItemFlags } from '@/lib/types';

const DB_NAME = databaseName;
const COLLECTION = 'release';

interface RouteParams {
  params: Promise<{ releaseId: string; itemIndex: string }>;
}

const FLAG_KEYS: (keyof ReleaseItemFlags)[] = [
  'causedProductionIncident',
  'causedRegressionCrash',
  'codeReviewDiscussions',
  'prWasReverted',
];

const DEFAULT_FLAGS: ReleaseItemFlags = {
  causedProductionIncident: false,
  causedRegressionCrash: false,
  codeReviewDiscussions: false,
  prWasReverted: false,
};

function normalizeFlags(flags?: Partial<ReleaseItemFlags>): ReleaseItemFlags {
  return { ...DEFAULT_FLAGS, ...flags };
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { releaseId, itemIndex: itemIndexStr } = await params;

    if (!ObjectId.isValid(releaseId)) {
      return NextResponse.json(
        { error: 'Invalid release ID' },
        { status: 400 }
      );
    }

    const itemIndex = parseInt(itemIndexStr, 10);
    if (isNaN(itemIndex) || itemIndex < 0) {
      return NextResponse.json(
        { error: 'Invalid item index' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { flags } = body;

    if (!flags || typeof flags !== 'object') {
      return NextResponse.json(
        { error: 'flags object is required' },
        { status: 400 }
      );
    }

    // Build the $set update for only valid flag fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updates: Record<string, any> = {};
    for (const key of FLAG_KEYS) {
      if (typeof flags[key] === 'boolean') {
        updates[`packages.${itemIndex}.flags.${key}`] = flags[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid flag fields provided' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    // Verify the release exists and the index is in range
    const release = await db
      .collection<ReleaseDocument>(COLLECTION)
      .findOne({ _id: new ObjectId(releaseId) });

    if (!release) {
      return NextResponse.json(
        { error: 'Release not found' },
        { status: 404 }
      );
    }

    if (itemIndex >= release.packages.length) {
      return NextResponse.json(
        { error: `Item index ${itemIndex} out of range (release has ${release.packages.length} items)` },
        { status: 400 }
      );
    }

    // Apply the update
    await db
      .collection<ReleaseDocument>(COLLECTION)
      .updateOne(
        { _id: new ObjectId(releaseId) },
        { $set: updates }
      );

    // Fetch the updated item
    const updated = await db
      .collection<ReleaseDocument>(COLLECTION)
      .findOne({ _id: new ObjectId(releaseId) });

    const pkg = updated!.packages[itemIndex];

    return NextResponse.json({
      releaseId,
      itemIndex,
      package: { ...pkg, flags: normalizeFlags(pkg.flags) },
    });
  } catch (error) {
    console.error('Failed to update release item flags:', error);
    return NextResponse.json(
      { error: 'Failed to update release item flags' },
      { status: 500 }
    );
  }
}

