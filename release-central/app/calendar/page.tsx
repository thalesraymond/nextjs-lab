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
  
  export default function Calendar() {
    return (
      <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
            Release Log
          </h1>
          <p className="text-muted-foreground mt-2">Upcoming missions and deployments.</p>
        </div>
        
        <div className="rounded-xl border border-primary/20 bg-card/40 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] overflow-hidden">
        <Table>
          <TableCaption className="pb-4 text-xs text-primary/60">System Schedule v3.14</TableCaption>
          <TableHeader className="bg-black/40">
            <TableRow className="hover:bg-transparent border-b-primary/20">
              <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">Plataforma</TableHead>
              <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">Versão</TableHead>
              <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">Data Limite</TableHead>
              <TableHead className="text-primary tracking-wider uppercase text-xs font-bold">GMUD</TableHead>
              <TableHead className="text-primary tracking-wider uppercase text-xs font-bold text-right">Pacotes</TableHead>
              <TableHead className="text-primary tracking-wider uppercase text-xs font-bold text-right">Demandas</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((release) => (
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
          ))}
        </TableBody>
        </Table>
        </div>
    </div>
  )
}
