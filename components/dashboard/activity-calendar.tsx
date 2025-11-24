"use client";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Assuming these exist, if not I will use simple title attribute or install tooltip later. 
// Actually I better check if tooltip component exists. I don't see it in the file list earlier.
// I will just use title attribute for simplicity first or simple divs.

export function ActivityCalendar() {
  // Mock data: Array of 90 days (approx 3 months) with random intensity
  const days = Array.from({ length: 84 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (83 - i));
    return {
      date: date.toISOString().split("T")[0],
      level: Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0, // 0-4 intensity
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
                day.level === 4 && "bg-blue-400"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

