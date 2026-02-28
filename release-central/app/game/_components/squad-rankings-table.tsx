"use client";

import { useState } from "react";
import { SquadScore } from "../types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronUp, ChevronDown, Minus } from "lucide-react";
import { SquadDetailsSheet } from "./squad-details-sheet";

interface SquadRankingsTableProps {
  squads: SquadScore[];
}

export function SquadRankingsTable({ squads }: SquadRankingsTableProps) {
  const [selectedSquad, setSelectedSquad] = useState<SquadScore | null>(null);

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1:
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"; // Ouro
      case 2:
        return "bg-slate-300/10 text-slate-300 border-slate-300/20"; // Prata
      case 3:
        return "bg-orange-700/10 text-orange-700 border-orange-700/20"; // Bronze
      case 4:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"; // Basic
      case 5:
        return "bg-muted text-muted-foreground border-border"; // Rest
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const renderDelta = (current: number, historical: number) => {
    const delta = historical - current; // Smaller position means higher rank
    if (delta > 0) {
      return (
        <div className="flex items-center text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full w-fit">
          <ChevronUp className="w-4 h-4 mr-1" />
          <span className="text-xs font-medium">{delta}</span>
        </div>
      );
    } else if (delta < 0) {
      return (
        <div className="flex items-center text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full w-fit">
          <ChevronDown className="w-4 h-4 mr-1" />
          <span className="text-xs font-medium">{Math.abs(delta)}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center text-muted-foreground bg-muted px-2 py-0.5 rounded-full w-fit">
        <Minus className="w-4 h-4 mr-1" />
        <span className="text-xs font-medium">0</span>
      </div>
    );
  };

  return (
    <>
      <div className="border rounded-lg bg-card/50 backdrop-blur shadow-sm">
        <div className="p-4 border-b">
          <h3 className="text-xl font-bold">Resumo das Squads</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">Posição</TableHead>
                <TableHead className="w-24 text-center">Evolução</TableHead>
                <TableHead>Squad</TableHead>
                <TableHead>Release Train</TableHead>
                <TableHead>Comunidade</TableHead>
                <TableHead className="text-right">Pontos</TableHead>
                <TableHead className="text-right">Entregas</TableHead>
                <TableHead className="text-center">Tier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {squads.map((squad) => (
                <TableRow 
                  key={squad.squad} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedSquad(squad)}
                >
                  <TableCell className="text-center font-bold text-lg">{squad.position}º</TableCell>
                  <TableCell className="flex justify-center">
                    {renderDelta(squad.position, squad.historical_position)}
                  </TableCell>
                  <TableCell className="font-semibold">{squad.squad}</TableCell>
                  <TableCell className="text-muted-foreground">{squad.release_train}</TableCell>
                  <TableCell className="text-muted-foreground">{squad.community}</TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    {squad.total_points.toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right">{squad.total_deliveries}</TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getTierColor(squad.tier)}`}>
                      Tier {squad.tier}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <SquadDetailsSheet 
        squad={selectedSquad} 
        isOpen={!!selectedSquad} 
        onOpenChange={(open) => !open && setSelectedSquad(null)} 
      />
    </>
  );
}
