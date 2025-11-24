"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";

function AuthCodeErrorContent() {
  const searchParams = useSearchParams();
  const queryError = searchParams.get("error");
  const queryDescription = searchParams.get("error_description");

  // クエリパラメータを優先しつつ、ハッシュに値があればそちらも参照する
  let error = queryError;
  let description = queryDescription;

  if (typeof window !== "undefined" && window.location.hash) {
    const hashParams = new URLSearchParams(window.location.hash.substring(1)); // remove #
    const hashError = hashParams.get("error");
    const hashDesc = hashParams.get("error_description");

    if (hashError) {
      error = hashError;
      description = hashDesc;
    }
  }

  return (
    <Card className="w-full max-w-md relative z-10 border-red-500/20 glass">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-500">Authentication Error</CardTitle>
          <CardDescription>
            ログイン処理中にエラーが発生しました
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10 text-sm font-mono text-red-400 break-all">
            <p className="font-bold">{error || "Unknown Error"}</p>
            <p className="mt-1">{description || "No description provided"}</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Link href="/login" className="w-full">
                <Button className="w-full" variant="outline">
                    ログイン画面に戻る
                </Button>
            </Link>
            <Link href="/" className="w-full">
                <Button className="w-full" variant="ghost">
                    トップページへ
                </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
  );
}

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-500/10 rounded-full blur-[120px]" />
      </div>
      
      <Suspense fallback={
        <div className="text-white">Loading error details...</div>
      }>
        <AuthCodeErrorContent />
      </Suspense>
    </div>
  );
}
