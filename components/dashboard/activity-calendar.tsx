"use client";

import { cn } from "@/lib/utils";

export function ActivityCalendar() {
  // Mock data: Fixed pattern to avoid hydration mismatch and impurities
  const days = Array.from({ length: 84 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (83 - i));
    // Create a deterministic pseudo-random pattern based on the date
    const dayNum = date.getDate();
    const monthNum = date.getMonth();
    const pseudoRandom = (dayNum * 7 + monthNum * 13) % 10;
    
    return {
      date: date.toISOString().split("T")[0],
      level: pseudoRandom > 6 ? Math.floor((pseudoRandom - 6) / 1) : 0, // Deterministic mock data
    };
  });

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex flex-col gap-2 min-w-max">
        <h3 className="text-sm font-medium text-muted-foreground">Learning Activity (Last 3 Months)</h3>
        <div className="grid grid-rows-7 grid-flow-col gap-1">
          {days.map((day) => (
            <div
              key={day.date}
              title={`${day.date}: ${day.level > 0 ? 'Studied' : 'No activity'}`}
              className={cn(
                "w-3 h-3 rounded-[2px] transition-colors",
                day.level === 0 && "bg-muted/50",
                day.level === 1 && "bg-blue-900/40",
                day.level === 2 && "bg-blue-700/60",
                day.level === 3 && "bg-blue-500/80",
                day.level >= 4 && "bg-blue-400"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
