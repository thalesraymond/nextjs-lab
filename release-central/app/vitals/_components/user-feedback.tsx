"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { VitalsStats } from "../data";

export function UserFeedback({ stats }: { stats: VitalsStats }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredComments = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return stats.recentComments.filter(
      (comment) =>
        comment.user.toLowerCase().includes(searchLower) ||
        comment.comment.toLowerCase().includes(searchLower)
    );
  }, [stats.recentComments, searchTerm]);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50 space-y-0">
        <CardTitle>User Feedback</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-amber-400">★</span>
          <span className="font-bold">{stats.ratingAverage.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({stats.ratingCount.toLocaleString()})</span>
        </div>
      </CardHeader>

      <div className="p-3 border-b border-border/30 bg-black/20">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            aria-label="Filter feedback..."
            placeholder="Filter feedback..."
            className="w-full bg-black/40 pl-9 border-primary/20 focus-visible:ring-primary/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <CardContent className="p-0 flex-1 overflow-hidden">
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          {filteredComments.length > 0 ? (
            filteredComments.map((comment) => (
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
            ))
          ) : (
            <div className="flex items-center justify-center p-8 text-center text-muted-foreground text-sm">
              No feedback found matching &quot;{searchTerm}&quot;.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
