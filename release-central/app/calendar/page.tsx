"use client"

import { useCallback, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronDown, ChevronUp, Layers, Package, Scale, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AndroidLogo } from "@/components/icons/android-logo"
import { AppleLogo } from "@/components/icons/apple-logo"
import { CopyButton } from "@/components/ui/copy-button"
import { mockReleases } from "./data"

type SortColumn = "platform" | "version" | "dateLimit" | "gmud" | "packageCount" | "legalDemands" | null
type SortDirection = "asc" | "desc"

export default function Calendar() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<SortColumn>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  // ⚡ Bolt: Hoisted searchTerm.toLowerCase() outside the filter loop to prevent
  // redundant string conversions on every iteration, reducing CPU overhead during search.
  const filteredData = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return mockReleases.filter(
      (release) =>
        release.gmud.toLowerCase().includes(searchLower) ||
        release.version.toLowerCase().includes(searchLower)
    );
  }, [searchTerm])

  const summaryStats = useMemo(() => {
    const totalPackages = filteredData.reduce((sum, r) => sum + r.packageCount, 0)
    const totalDemands = filteredData.reduce((sum, r) => sum + r.legalDemands, 0)
    const sortedDates = filteredData
      .map((r) => r.dateLimit)
      .sort()
    const nearestDate = sortedDates[0] ?? null
    return {
      count: filteredData.length,
      totalPackages,
      totalDemands,
      nearestDate,
    }
  }, [filteredData])

  const sortedData = useMemo(() => [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  }), [filteredData, sortColumn, sortDirection])

  const handleSort = useCallback((column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }, [sortColumn])

  const renderSortIcon = useCallback((column: SortColumn) => {
    if (sortColumn !== column) return <span className="w-4" /> // placeholder for alignment
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
  }, [sortColumn, sortDirection])

  const renderSortableHeader = (column: SortColumn, label: string, align: "left" | "right" = "left") => (
    <TableHead
      className={cn(
        "text-primary tracking-wider uppercase text-xs font-bold cursor-pointer hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset",
        align === "right" && "text-right"
      )}
      onClick={() => handleSort(column)}
      tabIndex={0}
      aria-label={`Sort by ${label}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleSort(column)
        }
      }}
      aria-sort={sortColumn === column ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}
    >
      <div className={cn("flex items-center", align === "right" && "justify-end")}>
        {label} {renderSortIcon(column)}
      </div>
    </TableHead>
  )

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
            Release Log
          </h1>
          <p className="text-muted-foreground mt-2">Upcoming missions and deployments.</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            aria-label="Search by GMUD or version..."
            placeholder="GMUD or version..."
            className="w-full bg-black/40 pl-9 border-primary/20 focus-visible:ring-primary/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Summary Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Releases", value: summaryStats.count, icon: Layers, color: "text-blue-400", bgColor: "bg-blue-500/10", ringColor: "ring-blue-500/20" },
          { label: "Pacotes", value: summaryStats.totalPackages, icon: Package, color: "text-violet-400", bgColor: "bg-violet-500/10", ringColor: "ring-violet-500/20" },
          { label: "Demandas Legais", value: summaryStats.totalDemands, icon: Scale, color: "text-amber-400", bgColor: "bg-amber-500/10", ringColor: "ring-amber-500/20" },
          { label: "Próx. Data Limite", value: summaryStats.nearestDate ?? "—", icon: Clock, color: "text-emerald-400", bgColor: "bg-emerald-500/10", ringColor: "ring-emerald-500/20" },
        ].map((card) => (
          <div
            key={card.label}
            className={cn(
              "relative overflow-hidden rounded-xl border border-primary/10 bg-card/40 backdrop-blur-md p-4 space-y-2",
              "hover:border-primary/25 transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {card.label}
              </span>
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center ring-1", card.bgColor, card.ringColor)}>
                <card.icon className={cn("w-3.5 h-3.5", card.color)} />
              </div>
            </div>
            <div className={cn("text-2xl font-extrabold tracking-tight", card.color)}>
              {card.value}
            </div>
            <div className={cn("absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-10", card.bgColor)} />
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-primary/20 bg-card/40 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] overflow-hidden">
        <Table>
          <TableCaption className="pb-4 text-xs text-primary/60">System Schedule v3.14</TableCaption>
          <TableHeader className="bg-black/40">
            <TableRow className="hover:bg-transparent border-b-primary/20">
              {renderSortableHeader("platform", "Plataforma")}
              {renderSortableHeader("version", "Versão")}
              {renderSortableHeader("dateLimit", "Data Limite")}
              {renderSortableHeader("gmud", "GMUD")}
              {renderSortableHeader("packageCount", "Pacotes", "right")}
              {renderSortableHeader("legalDemands", "Demandas", "right")}
            </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length > 0 ? (
            sortedData.map((release) => (
              <TableRow
                key={release.id}
                className="group transition-colors border-b-border/30 hover:bg-white/5 cursor-pointer"
                onClick={() => router.push(`/calendar/${release.id}`)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    router.push(`/calendar/${release.id}`)
                  }
                }}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    {release.platform === "android" ? (
                      <AndroidLogo className="h-5 w-5 text-green-500 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                    ) : (
                      <AppleLogo className="h-5 w-5 text-gray-200 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" />
                    )}
                    <span className="capitalize tracking-wide">{release.platform}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm group-hover:text-white transition-colors">v{release.version}</TableCell>
                <TableCell className="text-muted-foreground group-hover:text-gray-300 transition-colors">{release.dateLimit}</TableCell>
                <TableCell className="font-mono text-xs">
                  <div className="flex items-center gap-1.5 inline-flex bg-primary/10 px-2 py-1 rounded border border-primary/20 text-primary/80">
                    <span>{release.gmud}</span>
                    <span onClick={(e) => e.stopPropagation()}>
                      <CopyButton
                        text={release.gmud}
                        className="p-0.5 hover:bg-primary/20 text-primary/80"
                        title="Copy GMUD"
                      />
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold text-gray-300">{release.packageCount}</TableCell>
                <TableCell className="text-right">
                  {release.legalDemands > 0 ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-destructive/20 text-red-400 font-bold text-xs ring-1 ring-destructive/50">
                      {release.legalDemands}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No releases found matching &quot;{searchTerm}&quot;.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        </Table>
        </div>
    </div>
  )
}
