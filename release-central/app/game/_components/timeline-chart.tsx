"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GameStats } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineChartProps {
  stats: GameStats;
}

interface ChartDataPoint {
  date: string;
  deliveries: number;
  events: {
    production_incident: number;
    crash_incident: number;
    code_review: number;
    revert: number;
    [key: string]: number;
  };
}

export function TimelineChart({ stats }: TimelineChartProps) {
  const chartData = useMemo(() => {
    const dataMap = new Map<string, ChartDataPoint>();

    // Helper to get or create data point
    const getDataPoint = (dateStr: string) => {
      if (!dataMap.has(dateStr)) {
        dataMap.set(dateStr, {
          date: dateStr,
          deliveries: 0,
          events: {
            production_incident: 0,
            crash_incident: 0,
            code_review: 0,
            revert: 0,
          },
        });
      }
      return dataMap.get(dateStr)!;
    };

    // Aggregate Deliveries
    stats.squads_scores.forEach((squad) => {
      squad.delivery_items.forEach((item) => {
        const date = new Date(item.updated_at).toISOString().split("T")[0];
        const point = getDataPoint(date);
        point.deliveries += 1;
      });
    });

    // Aggregate Events
    stats.squads_scores.forEach((squad) => {
      squad.events.forEach((event) => {
        const date = new Date(event.date).toISOString().split("T")[0];
        const point = getDataPoint(date);
        if (point.events[event.type] !== undefined) {
          point.events[event.type] += 1;
        } else {
          // generic fallback if type is unknown
          point.events[event.type] = 1;
        }
      });
    });

    // Convert map to array and sort by date
    return Array.from(dataMap.values()).sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  }, [stats]);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Timeline de Entregas</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                content={(props: any) => {
                  const { active, payload, label } = props;
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as ChartDataPoint;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Date
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {label}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Deliveries
                            </span>
                            <span className="font-bold">
                              {data.deliveries}
                            </span>
                          </div>
                          <div className="col-span-2 mt-2 border-t pt-2">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Events
                            </span>
                            <div className="flex flex-col gap-1 text-xs">
                                <div className="flex justify-between gap-4">
                                  <span>Incidents:</span>
                                  <span className="font-mono">{data.events.production_incident}</span>
                                </div>
                                <div className="flex justify-between gap-4">
                                  <span>Crashes:</span>
                                  <span className="font-mono">{data.events.crash_incident}</span>
                                </div>
                                <div className="flex justify-between gap-4">
                                  <span>Reviews:</span>
                                  <span className="font-mono">{data.events.code_review}</span>
                                </div>
                                <div className="flex justify-between gap-4">
                                  <span>Reverts:</span>
                                  <span className="font-mono">{data.events.revert}</span>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="deliveries"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
