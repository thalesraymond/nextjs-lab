import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VitalsStats } from "../data";

export function VersionList({ stats }: { stats: VitalsStats }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Recent Versions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="w-[100px]">Version</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Released</TableHead>
              <TableHead className="text-right">Adoption</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.recentVersions.map((v) => (
              <TableRow key={v.version} className="border-border/50 hover:bg-accent/30">
                <TableCell className="font-medium">{v.version}</TableCell>
                <TableCell>
                  <span className={`px-2 py-0.5 rounded-full text-xs border ${
                    v.status === 'active' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : v.status === 'rolling'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'bg-muted text-muted-foreground border-border'
                  }`}>
                    {v.status}
                  </span>
                </TableCell>
                <TableCell>{v.releaseDate}</TableCell>
                <TableCell className="text-right">{v.adoption}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
