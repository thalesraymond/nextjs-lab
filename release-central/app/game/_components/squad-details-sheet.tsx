import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { SquadScore } from "../types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SquadDetailsSheetProps {
  squad: SquadScore | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SquadDetailsSheet({ squad, isOpen, onOpenChange }: SquadDetailsSheetProps) {
  if (!squad) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">{squad.squad}</SheetTitle>
          <SheetDescription>
            {squad.release_train} • {squad.community}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="border bg-card p-4 rounded-lg flex flex-col items-center justify-center">
              <span className="text-sm text-muted-foreground">Pontos</span>
              <span className="text-2xl font-bold text-primary">{squad.total_points.toLocaleString("pt-BR")}</span>
            </div>
            <div className="border bg-card p-4 rounded-lg flex flex-col items-center justify-center">
              <span className="text-sm text-muted-foreground">Entregas</span>
              <span className="text-2xl font-bold">{squad.total_deliveries}</span>
            </div>
            <div className="border bg-card p-4 rounded-lg flex flex-col items-center justify-center">
              <span className="text-sm text-muted-foreground">Eventos</span>
              <span className="text-2xl font-bold">{squad.total_events}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Entregas Recentes ({squad.delivery_items.length})</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {squad.delivery_items.map((item, idx) => (
                <div key={idx} className="p-3 border rounded-md bg-muted/30 flex justify-between items-center text-sm">
                  <div className="font-medium">{item.gmud}</div>
                  <div className="text-muted-foreground">Issue #{item.issue_number}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Histórico de Eventos ({squad.events.length})</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {squad.events.map((event, idx) => (
                <div key={idx} className="p-3 border rounded-md bg-muted/30 flex flex-col text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-destructive capitalize">{event.type.replace("_", " ")}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(event.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                    </span>
                  </div>
                  {event.incident_number && <div className="text-muted-foreground text-xs">Incidente: {event.incident_number}</div>}
                  {event.issue_number && <div className="text-muted-foreground text-xs">Issue: #{event.issue_number}</div>}
                </div>
              ))}
              {squad.events.length === 0 && (
                <div className="text-center text-muted-foreground text-sm p-4 border rounded-md border-dashed">
                  Nenhum evento registrado.
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
