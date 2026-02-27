import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VitalsStats } from "../data";

export function UserFeedback({ stats }: { stats: VitalsStats }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50">
        <CardTitle>User Feedback</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-amber-400">★</span>
          <span className="font-bold">{stats.ratingAverage.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({stats.ratingCount.toLocaleString()})</span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col max-h-[400px] overflow-y-auto custom-scrollbar">
          {stats.recentComments.map((comment) => (
            <div key={comment.id} className="p-4 border-b border-border/30 last:border-0 hover:bg-accent/20 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-sm">{comment.user}</span>
                <span className="text-xs text-muted-foreground">{comment.date}</span>
              </div>
              <div className="flex gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-xs ${i < comment.rating ? "text-amber-400" : "text-muted"}`}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-300">
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
