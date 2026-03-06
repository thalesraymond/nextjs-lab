"use client"

import { use, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Hash, Users, GitPullRequest, Scale, ExternalLink, ToggleRight, ToggleLeft } from "lucide-react"
import { getReleaseById, getGmudsByReleaseId } from "../data"
import { cn } from "@/lib/utils"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ReleaseDetailsPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const releaseId = Number(id)
  const release = getReleaseById(releaseId)
  const gmuds = getGmudsByReleaseId(releaseId)

  const stats = useMemo(() => {
    const uniqueSquads = new Set(gmuds.map((g) => g.squad)).size
    const legalDemands = gmuds.filter((g) => g.isLegalDemand).length
    const totalPrs = gmuds.length
    return { total: gmuds.length, uniqueSquads, totalPrs, legalDemands }
  }, [gmuds])

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

  const kpiCards = [
    {
      label: "Total de GMUDs",
      value: stats.total,
      icon: Hash,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      ringColor: "ring-blue-500/20",
    },
    {
      label: "Squads Envolvidas",
      value: stats.uniqueSquads,
      icon: Users,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      ringColor: "ring-emerald-500/20",
    },
    {
      label: "Total de PRs",
      value: stats.totalPrs,
      icon: GitPullRequest,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      ringColor: "ring-violet-500/20",
    },
    {
      label: "Demandas Legais",
      value: stats.legalDemands,
      icon: Scale,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      ringColor: "ring-amber-500/20",
    },
  ]

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <button
          onClick={() => router.push("/calendar")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Voltar ao calendário
        </button>

        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          <h1 className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
            Release v{release.version}
          </h1>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-mono px-2 py-1 rounded bg-primary/10 border border-primary/20 text-primary/80 uppercase tracking-wider">
              {release.platform}
            </span>
            <span className="text-xs font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground">
              {release.gmud}
            </span>
            <span className="text-xs text-muted-foreground">
              Limite: {release.dateLimit}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <div
            key={card.label}
            className={cn(
              "relative overflow-hidden rounded-xl border border-primary/10 bg-card/40 backdrop-blur-md p-5 space-y-3",
              "hover:border-primary/25 transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {card.label}
              </span>
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center ring-1", card.bgColor, card.ringColor)}>
                <card.icon className={cn("w-4 h-4", card.color)} />
              </div>
            </div>
            <div className={cn("text-3xl font-extrabold tracking-tight", card.color)}>
              {card.value}
            </div>
            {/* Decorative gradient blob */}
            <div className={cn("absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-10", card.bgColor)} />
          </div>
        ))}
      </div>

      {/* GMUD Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight text-foreground">
          GMUDs nesta Release
        </h2>

        <div className="rounded-xl border border-primary/20 bg-card/40 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] overflow-hidden">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="hover:bg-transparent border-b-primary/20">
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">GMUD</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">PR</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">Título</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold text-center">Feature Toggle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gmuds.map((gmud) => (
                <TableRow
                  key={gmud.gmudNumber}
                  className="group transition-colors border-b-border/30 hover:bg-white/5"
                >
                  <TableCell className="font-mono text-sm text-foreground">
                    {gmud.gmudNumber}
                  </TableCell>
                  <TableCell>
                    <a
                      href={gmud.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-blue-300 transition-colors font-mono"
                    >
                      {gmud.prNumber}
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground group-hover:text-gray-300 transition-colors max-w-xs truncate">
                    {gmud.title}
                  </TableCell>
                  <TableCell className="text-center">
                    {gmud.hasFeatureToggle ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                        <ToggleRight className="w-4 h-4" />
                        Sim
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <ToggleLeft className="w-4 h-4" />
                        Não
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
