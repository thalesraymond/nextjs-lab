"use client";

import { useState, useMemo, useCallback } from "react";
import { SquadScore } from "../types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronUp, ChevronDown, Minus, Search } from "lucide-react";
import { SquadDetailsSheet } from "./squad-details-sheet";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SortColumn = "position" | "squad" | "release_train" | "community" | "total_points" | "total_deliveries" | "tier" | "historical_position";
type SortDirection = "asc" | "desc";

interface SquadRankingsTableProps {
  squads: SquadScore[];
}

export function SquadRankingsTable({ squads }: SquadRankingsTableProps) {
  const [selectedSquad, setSelectedSquad] = useState<SquadScore | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

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

  // ⚡ Bolt: Cache filtered squads to prevent O(N) recalculation on every render (e.g. when opening the details sheet).
  // Also hoisted searchTerm.toLowerCase() outside the loop to avoid redundant string conversions.
  const filteredSquads = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return squads.filter((squad) => (
      squad.squad.toLowerCase().includes(searchLower) ||
      squad.release_train.toLowerCase().includes(searchLower) ||
      squad.community.toLowerCase().includes(searchLower)
    ));
  }, [squads, searchTerm]);

  const sortedSquads = useMemo(() => {
    if (!sortColumn) return filteredSquads;

    return [...filteredSquads].sort((a, b) => {
      let aValue: string | number = a[sortColumn];
      let bValue: string | number = b[sortColumn];

      // For "Evolução" (evolution), sort by delta
      if (sortColumn === "historical_position") {
        aValue = a.historical_position - a.position;
        bValue = b.historical_position - b.position;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredSquads, sortColumn, sortDirection]);

  const handleSort = useCallback((column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }, [sortColumn]);

  const renderSortIcon = useCallback((column: SortColumn) => {
    if (sortColumn !== column) return <span className="w-4" />;
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />;
  }, [sortColumn, sortDirection]);

  const renderSortableHeader = (column: SortColumn, label: string, className?: string) => (
    <TableHead
      className={cn(
        "cursor-pointer hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset",
        className
      )}
      onClick={() => handleSort(column)}
      tabIndex={0}
      aria-label={`Sort by ${label}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSort(column);
        }
      }}
      aria-sort={sortColumn === column ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}
    >
      <div className={cn("flex items-center", className?.includes("text-right") && "justify-end", className?.includes("text-center") && "justify-center")}>
        {label} {renderSortIcon(column)}
      </div>
    </TableHead>
  );

  return (
    <>
      <div className="border rounded-lg bg-card/50 backdrop-blur shadow-sm">
        <div className="p-4 border-b flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-bold">Resumo das Squads</h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              aria-label="Buscar por Squad, Train ou Comunidade..."
              placeholder="Squad, Train ou Comunidade..."
              className="w-full bg-black/40 pl-9 border-primary/20 focus-visible:ring-primary/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {renderSortableHeader("position", "Posição", "w-16 text-center")}
                {renderSortableHeader("historical_position", "Evolução", "w-24 text-center")}
                {renderSortableHeader("squad", "Squad")}
                {renderSortableHeader("release_train", "Release Train")}
                {renderSortableHeader("community", "Comunidade")}
                {renderSortableHeader("total_points", "Pontos", "text-right")}
                {renderSortableHeader("total_deliveries", "Entregas", "text-right")}
                {renderSortableHeader("tier", "Tier", "text-center")}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedSquads.length > 0 ? (
                sortedSquads.map((squad) => (
                  <TableRow
                    key={squad.squad}
                    className="cursor-pointer hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset"
                    tabIndex={0}
                    onClick={() => setSelectedSquad(squad)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedSquad(squad);
                      }
                    }}
                    aria-label={`Ver detalhes da squad ${squad.squad}`}
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                    Nenhuma squad encontrada buscando por &quot;{searchTerm}&quot;.
                  </TableCell>
                </TableRow>
              )}
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
