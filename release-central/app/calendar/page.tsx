"use client"

import { useState } from "react"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"

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

type Platform = "android" | "ios"

interface Release {
  id: number
  platform: Platform
  version: string
  dateLimit: string
  gmud: string
  packageCount: number
  legalDemands: number
}

const mockData: Release[] = [
  {
    id: 1,
    platform: "android",
    version: "3.5.0",
    dateLimit: "2024-02-15",
    gmud: "CHG0001234",
    packageCount: 12,
    legalDemands: 2,
  }, 
  {
    id: 2,
    platform: "ios",
    version: "3.5.0",
    dateLimit: "2024-02-16",
    gmud: "CHG0001235",
    packageCount: 10,
    legalDemands: 3,
  },
  {
    id: 3,
    platform: "android",
    version: "3.5.1",
    dateLimit: "2024-03-01",
    gmud: "CHG0002001",
    packageCount: 5,
    legalDemands: 0,
  },
  {
    id: 4,
    platform: "ios",
    version: "3.5.1",
    dateLimit: "2024-03-02",
    gmud: "CHG0002002",
    packageCount: 6,
    legalDemands: 1,
  },
  {
    id: 5,
    platform: "android",
    version: "3.6.0",
    dateLimit: "2024-03-15",
    gmud: "CHG0003456",
    packageCount: 20,
    legalDemands: 5,
  },
]

type SortColumn = "platform" | "version" | "dateLimit" | "gmud" | "packageCount" | "legalDemands" | null
type SortDirection = "asc" | "desc"

export default function Calendar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<SortColumn>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const filteredData = useMemo(() => mockData.filter(
    (release) =>
      release.gmud.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.version.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm])

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
            placeholder="Search by GMUD or version..."
            className="w-full bg-black/40 pl-9 border-primary/20 focus-visible:ring-primary/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-primary/20 bg-card/40 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] overflow-hidden">
        <Table>
          <TableCaption className="pb-4 text-xs text-primary/60">System Schedule v3.14</TableCaption>
          <TableHeader className="bg-black/40">
            <TableRow className="hover:bg-transparent border-b-primary/20">
              <TableHead className="text-primary tracking-wider uppercase text-xs font-bold cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort("platform")}>
                <div className="flex items-center">Plataforma {renderSortIcon("platform")}</div>
              </TableHead>
              <TableHead className="text-primary tracking-wider uppercase text-xs font-bold cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort("version")}>
                <div className="flex items-center">Versão {renderSortIcon("version")}</div>
              </TableHead>
              <TableHead className="text-primary tracking-wider uppercase text-xs font-bold cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort("dateLimit")}>
                <div className="flex items-center">Data Limite {renderSortIcon("dateLimit")}</div>
              </TableHead>
              <TableHead className="text-primary tracking-wider uppercase text-xs font-bold cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort("gmud")}>
                <div className="flex items-center">GMUD {renderSortIcon("gmud")}</div>
              </TableHead>
              <TableHead className="text-primary tracking-wider uppercase text-xs font-bold text-right cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort("packageCount")}>
                <div className="flex items-center justify-end">Pacotes {renderSortIcon("packageCount")}</div>
              </TableHead>
              <TableHead className="text-primary tracking-wider uppercase text-xs font-bold text-right cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort("legalDemands")}>
                <div className="flex items-center justify-end">Demandas {renderSortIcon("legalDemands")}</div>
              </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length > 0 ? (
            sortedData.map((release) => (
              <TableRow key={release.id} className="group transition-colors border-b-border/30 hover:bg-white/5 cursor-default">
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
                    <CopyButton text={release.gmud} className="p-0.5 hover:bg-primary/20 text-primary/80" title="Copy GMUD" />
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
