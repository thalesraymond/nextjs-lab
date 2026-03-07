import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { databaseName } from '@/lib/mongodb';
import type { ReleaseDocument } from '@/lib/types';

const DB_NAME = databaseName;
const COLLECTION = 'release';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const platform = searchParams.get('platform');
    const releaseId = searchParams.get('releaseId');
    const search = searchParams.get('search');

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    // Build match stage for release-level filters
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const releaseMatch: Record<string, any> = {};

    if (platform && ['android', 'ios'].includes(platform)) {
      releaseMatch.platform = platform;
    }

    if (dateFrom || dateTo) {
      releaseMatch.dateLimit = {};
      if (dateFrom) releaseMatch.dateLimit.$gte = dateFrom;
      if (dateTo) releaseMatch.dateLimit.$lte = dateTo;
    }

    if (releaseId) {
      const { ObjectId } = await import('mongodb');
      if (ObjectId.isValid(releaseId)) {
        releaseMatch._id = new ObjectId(releaseId);
      }
    }

    // Build pipeline
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pipeline: any[] = [];

    // Filter releases first
    if (Object.keys(releaseMatch).length > 0) {
      pipeline.push({ $match: releaseMatch });
    }

    // Unwind packages with index
    pipeline.push({
      $unwind: {
        path: '$packages',
        includeArrayIndex: 'itemIndex',
      },
    });

    // Text search on unwound package fields
    if (search && search.trim()) {
      const escapedSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      pipeline.push({
        $match: {
          $or: [
            { 'packages.title': { $regex: escapedSearch, $options: 'i' } },
            { 'packages.squad': { $regex: escapedSearch, $options: 'i' } },
            { 'packages.prNumber': { $regex: escapedSearch, $options: 'i' } },
            { 'packages.gmudNumber': { $regex: escapedSearch, $options: 'i' } },
          ],
        },
      });
    }

    // Count total matching items (using a facet for efficiency)
    pipeline.push({
      $facet: {
        metadata: [{ $count: 'total' }],
        items: [
          { $sort: { dateLimit: -1, itemIndex: 1 } },
          { $skip: (page - 1) * limit },
          { $limit: limit },
          {
            $project: {
              releaseId: '$_id',
              itemIndex: 1,
              platform: 1,
              version: 1,
              dateLimit: 1,
              gmud: 1,
              package: '$packages',
            },
          },
        ],
      },
    });

    const [result] = await db
      .collection<ReleaseDocument>(COLLECTION)
      .aggregate(pipeline)
      .toArray();

    const total = result.metadata[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    // Normalize flags for pre-migration items that may lack the flags field
    const DEFAULT_FLAGS = {
      causedProductionIncident: false,
      causedRegressionCrash: false,
      codeReviewDiscussions: false,
      prWasReverted: false,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const normalizedItems = result.items.map((item: any) => ({
      ...item,
      package: {
        ...item.package,
        flags: { ...DEFAULT_FLAGS, ...(item.package.flags || {}) },
      },
    }));

    return NextResponse.json({
      items: normalizedItems,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error('Failed to fetch release items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch release items' },
      { status: 500 }
    );
  }
}
