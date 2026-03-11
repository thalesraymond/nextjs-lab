"use client"

import { useCallback, useEffect, useState } from "react"
import { CheckCircle, AlertCircle, Plus, Pencil, X, Save, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { AndroidLogo } from "@/components/icons/android-logo"
import { AppleLogo } from "@/components/icons/apple-logo"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Platform = "android" | "ios" | ""

interface ReleaseItem {
  _id: string
  platform: "android" | "ios"
  version: string
  dateLimit: string
  gmud: string
  packages: { isLegalDemand: boolean }[]
}

interface FormData {
  platform: Platform
  version: string
  dateLimit: string
  gmud: string
}

interface FormErrors {
  platform?: string
  version?: string
  dateLimit?: string
}

export default function BackofficePage() {
  // --- Create form state ---
  const [formData, setFormData] = useState<FormData>({
    platform: "",
    version: "",
    dateLimit: "",
    gmud: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // --- Release list state ---
  const [releases, setReleases] = useState<ReleaseItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // --- Edit state ---
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<FormData>({ platform: "", version: "", dateLimit: "", gmud: "" })
  const [editErrors, setEditErrors] = useState<FormErrors>({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<{ id: string; status: "success" | "error"; message?: string } | null>(null)

  // --- Fetch releases ---
  const fetchReleases = useCallback(async () => {
    try {
      const res = await fetch("/api/releases")
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setReleases(data)
    } catch {
      console.error("Failed to fetch releases")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReleases()
  }, [fetchReleases])

  // --- Create form logic ---
  function validate(data: FormData): FormErrors {
    const newErrors: FormErrors = {}
    if (!data.platform) newErrors.platform = "Selecione uma plataforma"
    if (!data.version.trim()) newErrors.version = "Versão é obrigatória"
    if (!data.dateLimit) newErrors.dateLimit = "Data limite é obrigatória"
    return newErrors
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitStatus("idle")
    setErrorMessage("")

    const validationErrors = validate(formData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/releases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: formData.platform,
          version: formData.version.trim(),
          dateLimit: formData.dateLimit,
          gmud: formData.gmud.trim() || "",
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Falha ao criar release")
      }

      setSubmitStatus("success")
      setFormData({ platform: "", version: "", dateLimit: "", gmud: "" })
      setErrors({})
      fetchReleases()

      setTimeout(() => setSubmitStatus("idle"), 4000)
    } catch (err) {
      setSubmitStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "Erro inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field as keyof FormErrors]
        return next
      })
    }
  }

  // --- Edit logic ---
  function startEditing(release: ReleaseItem) {
    setEditingId(release._id)
    setEditData({
      platform: release.platform,
      version: release.version,
      dateLimit: release.dateLimit,
      gmud: release.gmud,
    })
    setEditErrors({})
    setSaveStatus(null)
  }

  function cancelEditing() {
    setEditingId(null)
    setEditData({ platform: "", version: "", dateLimit: "", gmud: "" })
    setEditErrors({})
  }

  function updateEditField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setEditData((prev) => ({ ...prev, [field]: value }))
    if (editErrors[field as keyof FormErrors]) {
      setEditErrors((prev) => {
        const next = { ...prev }
        delete next[field as keyof FormErrors]
        return next
      })
    }
  }

  async function handleSave() {
    if (!editingId) return

    const validationErrors = validate(editData)
    setEditErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSaving(true)
    setSaveStatus(null)

    try {
      const response = await fetch(`/api/releases/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: editData.platform,
          version: editData.version.trim(),
          dateLimit: editData.dateLimit,
          gmud: editData.gmud.trim(),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Falha ao atualizar")
      }

      setSaveStatus({ id: editingId, status: "success" })
      setEditingId(null)
      fetchReleases()

      setTimeout(() => setSaveStatus(null), 3000)
    } catch (err) {
      setSaveStatus({
        id: editingId,
        status: "error",
        message: err instanceof Error ? err.message : "Erro inesperado",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // --- Platform toggle button (reused in create form) ---
  function PlatformButton({ platform, selected, onClick, hasError }: {
    platform: "android" | "ios"
    selected: boolean
    onClick: () => void
    hasError: boolean
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center gap-3 py-4 rounded-xl border transition-all duration-300 cursor-pointer",
          selected
            ? "border-primary/50 bg-primary/10 shadow-[0_0_15px_-3px_var(--color-primary)] ring-1 ring-primary/30"
            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
          hasError && "border-red-500/50"
        )}
        aria-label={`Selecionar plataforma ${platform}`}
      >
        {platform === "android" ? (
          <AndroidLogo className={cn("h-6 w-6", selected ? "text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "text-green-500/60")} />
        ) : (
          <AppleLogo className={cn("h-6 w-6", selected ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : "text-gray-400")} />
        )}
        <span className={cn("capitalize font-semibold tracking-wide", selected ? "text-foreground" : "text-muted-foreground")}>
          {platform}
        </span>
        {selected && (
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary shadow-[0_0_6px_var(--color-primary)]" />
        )}
      </button>
    )
  }

  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
          Backoffice
        </h1>
        <p className="text-muted-foreground mt-2">
          Gerencie as releases do calendário.
        </p>
      </div>

      {/* ═══════════════ CREATE FORM ═══════════════ */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight text-foreground">Nova Release</h2>
        <div className="rounded-xl border border-primary/20 bg-card/40 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Platform */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Plataforma *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(["android", "ios"] as const).map((p) => (
                  <PlatformButton
                    key={p}
                    platform={p}
                    selected={formData.platform === p}
                    onClick={() => updateField("platform", p)}
                    hasError={!!errors.platform}
                  />
                ))}
              </div>
              {errors.platform && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.platform}
                </p>
              )}
            </div>

            {/* Version + Deadline row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="version" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Versão *
                </label>
                <Input
                  id="version"
                  type="text"
                  placeholder="ex: 3.5.0"
                  value={formData.version}
                  onChange={(e) => updateField("version", e.target.value)}
                  className={cn(
                    "bg-black/40 border-primary/20 focus-visible:ring-primary/30",
                    errors.version && "border-red-500/50 focus-visible:ring-red-500/30"
                  )}
                />
                {errors.version && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.version}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="dateLimit" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Data Limite *
                </label>
                <Input
                  id="dateLimit"
                  type="date"
                  value={formData.dateLimit}
                  onChange={(e) => updateField("dateLimit", e.target.value)}
                  className={cn(
                    "bg-black/40 border-primary/20 focus-visible:ring-primary/30",
                    errors.dateLimit && "border-red-500/50 focus-visible:ring-red-500/30"
                  )}
                />
                {errors.dateLimit && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.dateLimit}
                  </p>
                )}
              </div>
            </div>

            {/* GMUD */}
            <div className="space-y-2">
              <label htmlFor="gmud" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                GMUD <span className="text-muted-foreground/60">(opcional)</span>
              </label>
              <Input
                id="gmud"
                type="text"
                placeholder="ex: CHG0001234"
                value={formData.gmud}
                onChange={(e) => updateField("gmud", e.target.value)}
                className="bg-black/40 border-primary/20 focus-visible:ring-primary/30"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold tracking-wide transition-all duration-300 cursor-pointer",
                "bg-gradient-to-r from-primary to-blue-500 text-white",
                "hover:shadow-[0_0_25px_-3px_var(--color-primary)] hover:scale-[1.01]",
                "active:scale-[0.99]",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
              )}
              aria-label="Criar Release"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Criar Release
                </>
              )}
            </button>

            {submitStatus === "success" && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <p className="font-semibold text-sm">Release criada com sucesso!</p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="font-semibold text-sm">{errorMessage}</p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ═══════════════ RELEASE LIST ═══════════════ */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight text-foreground">
          Releases Cadastradas
        </h2>

        <div className="rounded-xl border border-primary/20 bg-card/40 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] overflow-hidden">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="hover:bg-transparent border-b-primary/20">
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">Plataforma</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">Versão</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">Data Limite</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">GMUD</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold text-right">Pacotes</TableHead>
                <TableHead className="text-primary tracking-wider uppercase text-xs font-bold text-center w-24">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Carregando...
                    </div>
                  </TableCell>
                </TableRow>
              ) : releases.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Nenhuma release cadastrada.
                  </TableCell>
                </TableRow>
              ) : (
                releases.map((release) => {
                  const isEditing = editingId === release._id
                  const justSaved = saveStatus?.id === release._id

                  return (
                    <TableRow
                      key={release._id}
                      className={cn(
                        "group transition-colors border-b-border/30",
                        isEditing ? "bg-primary/5" : "hover:bg-white/5",
                        justSaved && saveStatus?.status === "success" && "bg-emerald-500/5"
                      )}
                    >
                      {/* Platform */}
                      <TableCell className="font-medium">
                        {isEditing ? (
                          <div className="flex gap-2">
                            {(["android", "ios"] as const).map((p) => (
                              <button
                                key={p}
                                type="button"
                                onClick={() => updateEditField("platform", p)}
                                className={cn(
                                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer",
                                  editData.platform === p
                                    ? "border-primary/50 bg-primary/10 text-foreground"
                                    : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
                                )}
                                aria-label={`Mudar plataforma para ${p}`}
                              >
                                {p === "android" ? (
                                  <AndroidLogo className="h-3.5 w-3.5 text-green-500" />
                                ) : (
                                  <AppleLogo className="h-3.5 w-3.5 text-gray-300" />
                                )}
                                <span className="capitalize">{p}</span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {release.platform === "android" ? (
                              <AndroidLogo className="h-4 w-4 text-green-500" />
                            ) : (
                              <AppleLogo className="h-4 w-4 text-gray-200" />
                            )}
                            <span className="capitalize text-sm">{release.platform}</span>
                          </div>
                        )}
                      </TableCell>

                      {/* Version */}
                      <TableCell>
                        {isEditing ? (
                          <Input
                            value={editData.version}
                            onChange={(e) => updateEditField("version", e.target.value)}
                            className={cn(
                              "h-8 text-sm bg-black/40 border-primary/20",
                              editErrors.version && "border-red-500/50"
                            )}
                          />
                        ) : (
                          <span className="font-mono text-sm">v{release.version}</span>
                        )}
                      </TableCell>

                      {/* Deadline */}
                      <TableCell>
                        {isEditing ? (
                          <Input
                            type="date"
                            value={editData.dateLimit}
                            onChange={(e) => updateEditField("dateLimit", e.target.value)}
                            className={cn(
                              "h-8 text-sm bg-black/40 border-primary/20",
                              editErrors.dateLimit && "border-red-500/50"
                            )}
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">{release.dateLimit}</span>
                        )}
                      </TableCell>

                      {/* GMUD */}
                      <TableCell>
                        {isEditing ? (
                          <Input
                            value={editData.gmud}
                            onChange={(e) => updateEditField("gmud", e.target.value)}
                            placeholder="CHG..."
                            className="h-8 text-sm bg-black/40 border-primary/20"
                          />
                        ) : release.gmud ? (
                          <span className="font-mono text-xs px-2 py-1 rounded bg-primary/10 border border-primary/20 text-primary/80">
                            {release.gmud}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/50 text-xs">—</span>
                        )}
                      </TableCell>

                      {/* Package Count (read-only) */}
                      <TableCell className="text-right font-bold text-gray-300 text-sm">
                        {(release.packages ?? []).length}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-center">
                        {isEditing ? (
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={handleSave}
                              disabled={isSaving}
                              className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer disabled:opacity-50"
                              title="Salvar"
                              aria-label="Salvar"
                            >
                              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={cancelEditing}
                              disabled={isSaving}
                              className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer disabled:opacity-50"
                              title="Cancelar"
                              aria-label="Cancelar"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEditing(release)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:bg-white/10 hover:text-primary transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                            title="Editar"
                            aria-label="Editar"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {justSaved && saveStatus?.status === "success" && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>

        {saveStatus?.status === "error" && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {saveStatus.message}
          </div>
        )}
      </section>
    </div>
  )
}
