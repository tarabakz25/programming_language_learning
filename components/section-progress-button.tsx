"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import type { SectionStatus } from "@/lib/progress";

interface SectionProgressButtonProps {
  language: string;
  section: string;
  initialStatus?: SectionStatus;
}

export function SectionProgressButton({
  language,
  section,
  initialStatus = "not_started",
}: SectionProgressButtonProps) {
  const [status, setStatus] = useState<SectionStatus>(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          section,
          status: "completed" as SectionStatus,
        }),
      });

      if (response.ok) {
        setStatus("completed");
      } else {
        console.error("Failed to update progress");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          section,
          status: "in_progress" as SectionStatus,
        }),
      });

      if (response.ok) {
        setStatus("in_progress");
      } else {
        console.error("Failed to update progress");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "completed") {
    return (
      <Button disabled className="gap-2">
        <CheckCircle2 className="w-4 h-4" />
        学習完了
      </Button>
    );
  }

  if (status === "in_progress") {
    return (
      <Button onClick={handleComplete} disabled={isLoading} className="gap-2">
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            更新中...
          </>
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4" />
            学習を完了する
          </>
        )}
      </Button>
    );
  }

  return (
    <Button onClick={handleStart} disabled={isLoading} variant="outline" className="gap-2">
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          開始中...
        </>
      ) : (
        "学習を開始する"
      )}
    </Button>
  );
}

