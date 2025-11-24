"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">読み込み中...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {user.user_metadata?.full_name || user.email}
        </span>
        <span className="text-xs text-muted-foreground">{user.email}</span>
      </div>
      <Button onClick={handleLogout} variant="outline" size="sm">
        ログアウト
      </Button>
    </div>
  );
}

