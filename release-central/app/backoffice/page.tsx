import Link from "next/link"
import { Calendar, List, ArrowRight } from "lucide-react"

const sections = [
  {
    title: "Calendar",
    description: "Crie e gerencie releases do calendário. Adicione novas versões, edite informações e acompanhe prazos.",
    href: "/backoffice/calendar",
    icon: Calendar,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
  },
  {
    title: "Release Items",
    description: "Navegue por todos os itens de release, aplique filtros e gerencie flags de qualidade dos pacotes.",
    href: "/backoffice/release-items",
    icon: List,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20 hover:border-purple-500/40",
  },
]

export default function BackofficeHomePage() {
  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
          Backoffice
        </h1>
        <p className="text-muted-foreground mt-2">
          Painel administrativo do Release Central. Escolha uma seção abaixo.
        </p>
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className={`group relative flex flex-col gap-4 rounded-xl border bg-card/40 backdrop-blur-md p-6 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.6)] hover:scale-[1.02] ${section.borderColor}`}
          >
            {/* Gradient background glow */}
            <div
              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
            />

            <div className="relative flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-black/30 border border-white/10 ${section.iconColor}`}>
                <section.icon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                {section.title}
              </h2>
            </div>

            <p className="relative text-sm text-muted-foreground leading-relaxed">
              {section.description}
            </p>

            <div className="relative flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mt-auto">
              Acessar
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
