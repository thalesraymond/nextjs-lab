import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import type { ReleaseDocument } from '@/lib/types';

const DB_NAME = 'release-central';
const COLLECTION = 'release';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid release ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const release = await db
      .collection<ReleaseDocument>(COLLECTION)
      .findOne({ _id: new ObjectId(id) });

    if (!release) {
      return NextResponse.json(
        { error: 'Release not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(release);
  } catch (error) {
    console.error('Failed to fetch release:', error);
    return NextResponse.json(
      { error: 'Failed to fetch release' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid release ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const allowedFields = ['platform', 'version', 'dateLimit', 'gmud'] as const;
    const updates: Partial<Pick<ReleaseDocument, 'platform' | 'version' | 'dateLimit' | 'gmud'>> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === 'platform' && !['android', 'ios'].includes(body[field])) {
          return NextResponse.json(
            { error: 'Platform must be "android" or "ios"' },
            { status: 400 }
          );
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (updates as any)[field] = typeof body[field] === 'string' ? body[field].trim() : body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db
      .collection<ReleaseDocument>(COLLECTION)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updates },
        { returnDocument: 'after' }
      );

    if (!result) {
      return NextResponse.json(
        { error: 'Release not found' },
        { status: 404 }
      );
    }

    revalidatePath('/calendar');

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to update release:', error);
    return NextResponse.json(
      { error: 'Failed to update release' },
      { status: 500 }
    );
  }
}
