import { ObjectId } from "mongodb"
import Link from "next/link"
import { ArrowLeft, Hash } from "lucide-react"
import clientPromise from "@/lib/mongodb"
import type { ReleaseDocument } from "@/lib/types"
import { getGmudsByReleaseId } from "../data"
import { ReleaseDetailContent } from "./release-detail-content"

const DB_NAME = "release-central"
const COLLECTION = "release"

interface PageProps {
  params: Promise<{ id: string }>
}

async function getReleaseById(id: string) {
  if (!ObjectId.isValid(id)) return null

  const client = await clientPromise
  const db = client.db(DB_NAME)
  const release = await db
    .collection<ReleaseDocument>(COLLECTION)
    .findOne({ _id: new ObjectId(id) })

  if (!release) return null

  return {
    _id: release._id!.toString(),
    platform: release.platform,
    version: release.version,
    dateLimit: release.dateLimit,
    gmud: release.gmud,
    packageCount: release.packageCount,
    legalDemands: release.legalDemands,
  }
}

export default async function ReleaseDetailsPage({ params }: PageProps) {
  const { id } = await params
  const release = await getReleaseById(id)
  const gmuds = getGmudsByReleaseId(id)

  if (!release) {
    return (
      <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center py-24 space-y-6">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center ring-1 ring-destructive/30">
            <Hash className="w-10 h-10 text-red-400" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Release não encontrada</h1>
            <p className="text-muted-foreground">
              O ID <span className="font-mono text-primary">#{id}</span> não corresponde a nenhuma release.
            </p>
          </div>
          <Link
            href="/calendar"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao calendário
          </Link>
        </div>
      </div>
    )
  }

  return <ReleaseDetailContent release={release} gmuds={gmuds} />
}
