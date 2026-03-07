"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle,
  Bug,
  MessageSquare,
  Undo2,
  CheckCircle,
  X,
  Package,
  ExternalLink,
  Shield,
  ToggleRight,
  Scale,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { AndroidLogo } from "@/components/icons/android-logo"
import { AppleLogo } from "@/components/icons/apple-logo"

// --- Types ---
interface ReleaseItemFlags {
  causedProductionIncident: boolean
  causedRegressionCrash: boolean
  codeReviewDiscussions: boolean
  prWasReverted: boolean
}

interface PackageItem {
  gmudNumber: string
  prNumber: string
  prUrl: string
  title: string
  squad: string
  hasFeatureToggle: boolean
  isLegalDemand: boolean
  flags: ReleaseItemFlags
}

interface ReleaseItemResponse {
  releaseId: string
  itemIndex: number
  platform: "android" | "ios"
  version: string
  dateLimit: string
  gmud: string
  package: PackageItem
}

interface PaginatedResponse {
  items: ReleaseItemResponse[]
  total: number
  page: number
  limit: number
  totalPages: number
}

interface ReleaseOption {
  _id: string
  platform: "android" | "ios"
  version: string
  dateLimit: string
}

const FLAG_CONFIG = [
  {
    key: "causedProductionIncident" as const,
    label: "Incidente em Produção",
    icon: AlertTriangle,
    color: "text-red-400",
    bgColor: "bg-red-500/10 border-red-500/20",
  },
  {
    key: "causedRegressionCrash" as const,
    label: "Regressão / Crash",
    icon: Bug,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10 border-orange-500/20",
  },
  {
    key: "codeReviewDiscussions" as const,
    label: "Discussões de Code Review",
    icon: MessageSquare,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/20",
  },
  {
    key: "prWasReverted" as const,
    label: "PR Revertida",
    icon: Undo2,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/20",
  },
]

export default function ReleaseItemsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Filters from URL
  const currentPage = parseInt(searchParams.get("page") || "1", 10)
  const currentSearch = searchParams.get("search") || ""
  const currentPlatform = searchParams.get("platform") || ""
  const currentReleaseId = searchParams.get("releaseId") || ""
  const currentDateFrom = searchParams.get("dateFrom") || ""
  const currentDateTo = searchParams.get("dateTo") || ""

  // State
  const [data, setData] = useState<PaginatedResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [releases, setReleases] = useState<ReleaseOption[]>([])
  const [selectedItem, setSelectedItem] = useState<ReleaseItemResponse | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [savingFlag, setSavingFlag] = useState<string | null>(null)
  const [flagSuccess, setFlagSuccess] = useState<string | null>(null)

  // Debounced search (local input state)
  const [searchInput, setSearchInput] = useState(currentSearch)

  // Fetch releases for filter dropdown
  useEffect(() => {
    fetch("/api/releases")
      .then((res) => res.json())
      .then((data) => setReleases(data))
      .catch(() => console.error("Failed to fetch releases"))
  }, [])

  // Fetch release items
  const fetchItems = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      params.set("page", String(currentPage))
      params.set("limit", "20")
      if (currentSearch) params.set("search", currentSearch)
      if (currentPlatform) params.set("platform", currentPlatform)
      if (currentReleaseId) params.set("releaseId", currentReleaseId)
      if (currentDateFrom) params.set("dateFrom", currentDateFrom)
      if (currentDateTo) params.set("dateTo", currentDateTo)

      const res = await fetch(`/api/release-items?${params.toString()}`)
      if (!res.ok) throw new Error("Failed to fetch")
      const json = await res.json()
      setData(json)
    } catch {
      console.error("Failed to fetch release items")
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, currentSearch, currentPlatform, currentReleaseId, currentDateFrom, currentDateTo])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      updateParam("search", searchInput)
    }, 400)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  // URL param helpers
  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    // Reset to page 1 when filters change
    if (key !== "page") {
      params.delete("page")
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  function clearFilters() {
    setSearchInput("")
    router.push("?", { scroll: false })
  }

  // Flag toggle
  async function toggleFlag(item: ReleaseItemResponse, flagKey: keyof ReleaseItemFlags) {
    setSavingFlag(flagKey)
    setFlagSuccess(null)
    try {
      const res = await fetch(`/api/release-items/${item.releaseId}/${item.itemIndex}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flags: { [flagKey]: !item.package.flags[flagKey] },
        }),
      })
      if (!res.ok) throw new Error("Failed to update flag")

      const updated = await res.json()
      // Update the selected item locally
      setSelectedItem((prev) =>
        prev ? { ...prev, package: updated.package } : null
      )
      // Also update in the list
      setData((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.releaseId === item.releaseId && i.itemIndex === item.itemIndex
              ? { ...i, package: updated.package }
              : i
          ),
        }
      })
      setFlagSuccess(flagKey)
      setTimeout(() => setFlagSuccess(null), 2000)
    } catch {
      console.error("Failed to update flag")
    } finally {
      setSavingFlag(null)
    }
  }

  const hasActiveFilters = currentSearch || currentPlatform || currentReleaseId || currentDateFrom || currentDateTo

  function getActiveFlagCount(item: ReleaseItemResponse): number {
    if (!item.package.flags) return 0
    return Object.values(item.package.flags).filter(Boolean).length
  }

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
          Release Items
        </h1>
        <p className="text-muted-foreground mt-2">
          Navegue e gerencie todos os itens de release.
        </p>
      </div>

      {/* ═══════════════ FILTERS ═══════════════ */}
      <section className="rounded-xl border border-primary/20 bg-card/40 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="sm:col-span-2 lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="release-items-search"
              placeholder="Buscar por título, squad, PR, GMUD..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 bg-black/40 border-primary/20 focus-visible:ring-primary/30"
            />
          </div>

          {/* Platform */}
          <Select
            value={currentPlatform || "all"}
            onValueChange={(v) => updateParam("platform", v === "all" ? "" : v)}
          >
            <SelectTrigger id="release-items-platform" className="bg-black/40 border-primary/20 focus:ring-primary/30">
              <SelectValue placeholder="Plataforma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas plataformas</SelectItem>
              <SelectItem value="android">Android</SelectItem>
              <SelectItem value="ios">iOS</SelectItem>
            </SelectContent>
          </Select>

          {/* Release */}
          <Select
            value={currentReleaseId || "all"}
            onValueChange={(v) => updateParam("releaseId", v === "all" ? "" : v)}
          >
            <SelectTrigger id="release-items-release" className="bg-black/40 border-primary/20 focus:ring-primary/30">
              <SelectValue placeholder="Release" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas releases</SelectItem>
              {releases.map((r) => (
                <SelectItem key={r._id} value={r._id}>
                  {r.platform === "android" ? "🤖" : "🍎"} v{r.version} — {r.dateLimit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Limpar filtros
            </button>
          )}
        </div>

        {/* Date range row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="space-y-1.5">
            <label htmlFor="dateFrom" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Data de
            </label>
            <Input
              id="dateFrom"
              type="date"
              value={currentDateFrom}
              onChange={(e) => updateParam("dateFrom", e.target.value)}
              className="bg-black/40 border-primary/20 focus-visible:ring-primary/30"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="dateTo" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Data até
            </label>
            <Input
              id="dateTo"
              type="date"
              value={currentDateTo}
              onChange={(e) => updateParam("dateTo", e.target.value)}
              className="bg-black/40 border-primary/20 focus-visible:ring-primary/30"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ TABLE ═══════════════ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Itens de Release
          </h2>
          {data && (
            <span className="text-sm text-muted-foreground">
              {data.total} {data.total === 1 ? "item" : "itens"} encontrados
            </span>
          )}
        </div>

        <div className="rounded-xl border border-primary/20 bg-card/40 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] overflow-hidden">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="hover:bg-transparent border-b-primary/20">
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">Título</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">Squad</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">Plataforma</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">Versão</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">PR</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">GMUD</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold text-center">Flags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Carregando...
                    </div>
                  </TableCell>
                </TableRow>
              ) : !data || data.items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="w-8 h-8 text-muted-foreground/40" />
                      Nenhum item encontrado.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.items.map((item) => {
                  const flagCount = getActiveFlagCount(item)
                  return (
                    <TableRow
                      key={`${item.releaseId}-${item.itemIndex}`}
                      onClick={() => {
                        setSelectedItem(item)
                        setSheetOpen(true)
                      }}
                      className="group transition-colors border-b-border/30 hover:bg-white/5 cursor-pointer"
                    >
                      <TableCell className="font-medium text-sm max-w-[240px] truncate">
                        {item.package.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs border-primary/20 bg-primary/5 text-primary/80">
                          {item.package.squad}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          {item.platform === "android" ? (
                            <AndroidLogo className="h-4 w-4 text-green-500" />
                          ) : (
                            <AppleLogo className="h-4 w-4 text-gray-200" />
                          )}
                          <span className="capitalize text-sm text-muted-foreground">{item.platform}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">v{item.version}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs text-muted-foreground">{item.package.prNumber}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs text-muted-foreground">{item.package.gmudNumber}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        {flagCount > 0 ? (
                          <Badge className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20">
                            {flagCount}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => updateParam("page", String(currentPage - 1))}
              disabled={currentPage <= 1}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer",
                currentPage <= 1
                  ? "border-white/5 bg-white/5 text-muted-foreground/40 cursor-not-allowed"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Página</span>
              <span className="font-bold text-foreground">{data.page}</span>
              <span>de</span>
              <span className="font-bold text-foreground">{data.totalPages}</span>
            </div>

            <button
              onClick={() => updateParam("page", String(currentPage + 1))}
              disabled={currentPage >= data.totalPages}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer",
                currentPage >= data.totalPages
                  ? "border-white/5 bg-white/5 text-muted-foreground/40 cursor-not-allowed"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              )}
            >
              Próxima
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* ═══════════════ DETAIL SHEET ═══════════════ */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-card border-l border-primary/20">
          {selectedItem && (
            <>
              <SheetHeader className="space-y-3 pb-6 border-b border-border/30">
                <SheetTitle className="text-xl font-bold tracking-tight text-foreground leading-tight">
                  {selectedItem.package.title}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Detalhes do item de release
                </SheetDescription>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs border-primary/20 bg-primary/5 text-primary/80">
                    {selectedItem.package.squad}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-border/30">
                    <span className="flex items-center gap-1">
                      {selectedItem.platform === "android" ? (
                        <AndroidLogo className="h-3 w-3 text-green-500" />
                      ) : (
                        <AppleLogo className="h-3 w-3 text-gray-200" />
                      )}
                      v{selectedItem.version}
                    </span>
                  </Badge>
                  <Badge variant="outline" className="text-xs border-border/30 text-muted-foreground">
                    {selectedItem.dateLimit}
                  </Badge>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Info grid */}
                <div className="grid grid-cols-2 gap-4">
                  <DetailField
                    icon={<Package className="w-4 h-4 text-primary/60" />}
                    label="PR"
                    value={
                      <a
                        href={selectedItem.package.prUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm text-primary hover:underline flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {selectedItem.package.prNumber}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    }
                  />
                  <DetailField
                    icon={<Shield className="w-4 h-4 text-primary/60" />}
                    label="GMUD"
                    value={<span className="font-mono text-sm">{selectedItem.package.gmudNumber}</span>}
                  />
                  <DetailField
                    icon={<ToggleRight className="w-4 h-4 text-primary/60" />}
                    label="Feature Toggle"
                    value={
                      selectedItem.package.hasFeatureToggle ? (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">Sim</Badge>
                      ) : (
                        <span className="text-muted-foreground/60 text-sm">Não</span>
                      )
                    }
                  />
                  <DetailField
                    icon={<Scale className="w-4 h-4 text-primary/60" />}
                    label="Demanda Legal"
                    value={
                      selectedItem.package.isLegalDemand ? (
                        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs">Sim</Badge>
                      ) : (
                        <span className="text-muted-foreground/60 text-sm">Não</span>
                      )
                    }
                  />
                </div>

                {/* Release info */}
                {selectedItem.gmud && (
                  <div className="rounded-lg bg-black/20 border border-border/20 p-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">GMUD da Release</p>
                    <p className="font-mono text-sm text-primary/80">{selectedItem.gmud}</p>
                  </div>
                )}

                {/* Flags section */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary/60" />
                    Flags de Qualidade
                  </h3>

                  <div className="space-y-2">
                    {FLAG_CONFIG.map(({ key, label, icon: Icon, color, bgColor }) => {
                      const isChecked = selectedItem.package.flags?.[key] ?? false
                      const isSaving = savingFlag === key
                      const justSaved = flagSuccess === key

                      return (
                        <div
                          key={key}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg border transition-all",
                            isChecked ? bgColor : "border-border/20 bg-black/20 hover:bg-black/30"
                          )}
                        >
                          <Checkbox
                            id={`flag-${key}`}
                            checked={isChecked}
                            onCheckedChange={() => toggleFlag(selectedItem, key)}
                            disabled={isSaving}
                            className="border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <Label
                            htmlFor={`flag-${key}`}
                            className={cn(
                              "flex items-center gap-2 text-sm font-medium cursor-pointer flex-1",
                              isChecked ? color : "text-muted-foreground"
                            )}
                          >
                            {isSaving ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Icon className="w-4 h-4" />
                            )}
                            {label}
                          </Label>
                          {justSaved && (
                            <CheckCircle className="w-4 h-4 text-emerald-400 animate-in fade-in-0" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

// Small helper component for the detail view
function DetailField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wider">
        {icon}
        {label}
      </div>
      <div>{value}</div>
    </div>
  )
}
