import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number | React.ReactNode;
  description?: string;
  className?: string;
}

export function KPICard({ title, value, description, className }: KPICardProps) {
  return (
    <Card className={cn("overflow-hidden border-primary/20 bg-card/40 backdrop-blur-md shadow-[0_0_15px_-5px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_-5px_var(--color-primary)]", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold tracking-wider text-primary/80 uppercase">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-extrabold tracking-tighter text-white drop-shadow-md">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
