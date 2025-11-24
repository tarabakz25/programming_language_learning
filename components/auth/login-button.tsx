"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Github, Chrome } from "lucide-react";

export function LoginButton() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
        <Chrome className="mr-2 h-4 w-4" />
        Googleでログイン
      </Button>
      <Button onClick={handleGithubLogin} variant="outline" className="w-full">
        <Github className="mr-2 h-4 w-4" />
        GitHubでログイン
      </Button>
    </div>
  );
}

