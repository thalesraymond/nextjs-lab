import Link from "next/link";
import { Gamepad, Calendar, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8 lg:p-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] -z-10 pointer-events-none" />

      <main className="flex flex-col items-center justify-center gap-12 text-center relative z-10 w-full max-w-4xl">
        
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="inline-block rounded-full bg-border/50 px-3 py-1 text-sm font-semibold tracking-wider text-primary border border-primary/20 backdrop-blur-sm mb-4">
            MASTER CONTROL PANEL
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 drop-shadow-sm">
            Release Central
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            Gamified deployment ranking and unified release scheduling.
            Keep the code moving, push to production, earn your score.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
          <Link
            href="/game"
            className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-xl border border-primary/30 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-card hover:border-primary hover:shadow-[0_0_30px_-5px_var(--color-primary)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Gamepad className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <div className="space-y-1 relative z-10">
              <h2 className="text-2xl font-bold tracking-tight text-white">Rankings</h2>
              <p className="text-sm text-muted-foreground group-hover:text-gray-300 transition-colors">
                View squad performance and achievements
              </p>
            </div>
          </Link>

          <Link
            href="/calendar"
            className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-card/80 hover:border-border hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Calendar className="w-12 h-12 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300 relative z-10" />
            <div className="space-y-1 relative z-10">
              <h2 className="text-2xl font-bold tracking-tight text-gray-100 group-hover:text-white transition-colors">Calendar</h2>
              <p className="text-sm text-muted-foreground group-hover:text-gray-300 transition-colors">
                Track upcoming releases and GMUDs
              </p>
            </div>
          </Link>
          <Link
            href="/vitals"
            className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-card/80 hover:border-emerald-500/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Activity className="w-12 h-12 text-emerald-400 group-hover:scale-110 transition-all duration-300 relative z-10" />
            <div className="space-y-1 relative z-10">
              <h2 className="text-2xl font-bold tracking-tight text-gray-100 group-hover:text-white transition-colors">Vitals</h2>
              <p className="text-sm text-muted-foreground group-hover:text-gray-300 transition-colors">
                Cockpit view of rollout health
              </p>
            </div>
          </Link>
        </div>

      </main>
    </div>
  );
}
