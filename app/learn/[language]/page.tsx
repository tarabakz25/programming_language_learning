import { getSectionMetas, getLanguages } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { getSectionProgressForLanguage } from "@/lib/progress";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";

export async function generateStaticParams() {
  const languages = await getLanguages();
  return languages.map((language) => ({
    language,
  }));
}

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  const sectionMetas = await getSectionMetas(language);
  const languages = await getLanguages();

  if (!languages.includes(language)) {
    notFound();
  }

  // Get user progress if logged in
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let progressMap: Record<string, "not_started" | "in_progress" | "completed"> = {};
  if (user) {
    progressMap = await getSectionProgressForLanguage(user.id, language);
  }

  const getStatusBadge = (sectionSlug: string) => {
    const status = progressMap[sectionSlug] || "not_started";
    switch (status) {
      case "completed":
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="w-3 h-3" />
            完了
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="warning" className="gap-1">
            <PlayCircle className="w-3 h-3" />
            進行中
          </Badge>
        );
      default:
        return (
          <Badge variant="muted" className="gap-1">
            <Circle className="w-3 h-3" />
            未着手
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← ホームに戻る
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 capitalize">
            {language} を学ぶ
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            セクションを選択して学習を開始してください
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {sectionMetas.map((section) => (
              <Link
                key={section.slug}
                href={`/learn/${language}/${section.slug}`}
              >
                <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="flex-1">
                        {section.title}
                      </CardTitle>
                      {getStatusBadge(section.slug)}
                    </div>
                    <CardDescription>
                      {section.description || "このセクションを学習する"}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

