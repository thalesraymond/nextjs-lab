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
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Calendário de Releases</h1>
        <Table>
          <TableCaption>A lista de releases agendadas.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Plataforma</TableHead>
              <TableHead>Versão</TableHead>
              <TableHead>Data Limite</TableHead>
              <TableHead>GMUD</TableHead>
            <TableHead>Quantidade de Pacotes</TableHead>
            <TableHead>Demandas Legais</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((release) => (
            <TableRow key={release.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {release.platform === "android" ? (
                    <AndroidLogo className="h-5 w-5 text-green-600" />
                  ) : (
                    <AppleLogo className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                  )}
                  <span className="capitalize">{release.platform}</span>
                </div>
              </TableCell>
              <TableCell>{release.version}</TableCell>
              <TableCell>{release.dateLimit}</TableCell>
              <TableCell className="font-mono">{release.gmud}</TableCell>
              <TableCell>{release.packageCount}</TableCell>
              <TableCell>{release.legalDemands}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
