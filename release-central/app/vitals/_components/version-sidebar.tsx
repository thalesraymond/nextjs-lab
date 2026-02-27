import Link from "next/link";
import { cn } from "@/lib/utils";

export function VersionSidebar({ currentVersion, versions }: { currentVersion: string, versions: string[] }) {
  return (
    <div className="w-56 flex-shrink-0 border-r border-border/50 pr-6 mr-6 flex flex-col gap-2 relative z-10 hidden md:flex">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Select Version</h3>
      <div className="flex flex-col gap-2">
        {versions.map((v) => {
          const isActive = currentVersion === v;
          return (
            <Link
              key={v}
              href={`/vitals?version=${v}`}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                isActive
                  ? "bg-primary/20 text-blue-300 border-primary/50 shadow-[0_0_15px_-3px_var(--color-primary)]"
                  : "bg-transparent text-muted-foreground border-transparent hover:bg-accent/30 hover:text-white"
              )}
            >
              <div className="flex items-center gap-2">
                <span className={cn("w-2 h-2 rounded-full", isActive ? "bg-primary animate-pulse" : "bg-transparent")} />
                {v}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
