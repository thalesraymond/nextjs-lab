export const dynamic = "force-dynamic";

import clientPromise, { databaseName } from "@/lib/mongodb"
import type { ReleaseDocument } from "@/lib/types"
import { ReleaseTable, type ReleaseRow } from "./release-table"

const DB_NAME = databaseName
const COLLECTION = "release"

async function getReleases(): Promise<ReleaseRow[]> {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const releases = await db
    .collection<ReleaseDocument>(COLLECTION)
    .find({})
    .sort({ dateLimit: -1 })
    .toArray()

  return releases.map((r) => ({
    _id: r._id!.toString(),
    platform: r.platform,
    version: r.version,
    dateLimit: r.dateLimit,
    gmud: r.gmud,
    packages: r.packages ?? [],
  }))
}

export default async function Calendar() {
  const releases = await getReleases()

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-6">
      <ReleaseTable releases={releases} />
    </div>
  )
}
