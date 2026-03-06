"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Hash, Users, GitPullRequest, Scale, ExternalLink, ToggleRight, ToggleLeft, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GmudDetail, Release } from "../data"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ReleaseDetailContentProps {
  release: Release
  gmuds: GmudDetail[]
}

export function ReleaseDetailContent({ release, gmuds }: ReleaseDetailContentProps) {
  const router = useRouter()
  const [selectedSquad, setSelectedSquad] = useState<string | null>(null)

  const stats = useMemo(() => {
    const uniqueSquads = new Set(gmuds.map((g) => g.squad)).size
    const legalDemands = gmuds.filter((g) => g.isLegalDemand).length
    const totalPrs = gmuds.length
    return { total: gmuds.length, uniqueSquads, totalPrs, legalDemands }
  }, [gmuds])

  const uniqueSquads = useMemo(() => {
    return Array.from(new Set(gmuds.map((g) => g.squad))).sort()
  }, [gmuds])

  const filteredGmuds = useMemo(() => {
    if (!selectedSquad) return gmuds
    return gmuds.filter((g) => g.squad === selectedSquad)
  }, [gmuds, selectedSquad])

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
            {release.gmud && (
              <span className="text-xs font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground">
                {release.gmud}
              </span>
            )}
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
            <div className={cn("absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-10", card.bgColor)} />
          </div>
        ))}
      </div>

      {/* GMUD Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            GMUDs nesta Release
          </h2>
          {uniqueSquads.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <button
                onClick={() => setSelectedSquad(null)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200",
                  selectedSquad === null
                    ? "bg-primary/20 border-primary/40 text-primary shadow-[0_0_8px_-2px_var(--color-primary)]"
                    : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                )}
              >
                Todas
              </button>
              {uniqueSquads.map((squad) => (
                <button
                  key={squad}
                  onClick={() => setSelectedSquad(squad)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200",
                    selectedSquad === squad
                      ? "bg-primary/20 border-primary/40 text-primary shadow-[0_0_8px_-2px_var(--color-primary)]"
                      : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                  )}
                >
                  {squad}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-primary/20 bg-card/40 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] overflow-hidden">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="hover:bg-transparent border-b-primary/20">
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">GMUD</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">PR</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">Título</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">Squad</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold text-center">Feature Toggle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGmuds.length > 0 ? (
                filteredGmuds.map((gmud) => (
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
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <Users className="w-3 h-3" />
                        {gmud.squad}
                      </span>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    Nenhuma GMUD registrada para esta release.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
