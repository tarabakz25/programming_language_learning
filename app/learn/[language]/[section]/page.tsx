import { getContent, getSections, getLanguages } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXContent } from "@/lib/mdx";
import { DocsLayout } from "@/components/layout/docs-layout";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getSectionProgressForLanguage } from "@/lib/progress";
import { SectionProgressButton } from "@/components/section-progress-button";

export async function generateStaticParams() {
  const languages = await getLanguages();
  const params: { language: string; section: string }[] = [];

  for (const language of languages) {
    const sections = await getSections(language);
    for (const section of sections) {
      params.push({ language, section });
    }
  }

  return params;
}

export default async function SectionPage({
  params,
}: {
  params: { language: string; section: string };
}) {
  const { language, section } = params;
  const languages = await getLanguages();
  if (!languages.includes(language)) {
    notFound();
  }

  let content;
  try {
    // セクション slug と MDX ファイル名が一致している場合のみコンテンツを表示する
    content = await getContent(language, section);
  } catch {
    notFound();
  }

  const sections = await getSections(language);

  // Get user progress if logged in
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let currentStatus: "not_started" | "in_progress" | "completed" = "not_started";
  if (user) {
    const progressMap = await getSectionProgressForLanguage(user.id, language);
    currentStatus = (progressMap[section] as typeof currentStatus) || "not_started";
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link
            href={`/learn/${language}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← {language} のセクション一覧に戻る
          </Link>
        </div>
      </header>
      <DocsLayout language={language} sections={sections}>
        <div className="mb-6 flex justify-end">
          {user ? (
            <SectionProgressButton
              language={language}
              section={section}
              initialStatus={currentStatus}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              進捗を保存するにはログインしてください
            </p>
          )}
        </div>
        <MDXContent source={content.source} />
      </DocsLayout>
    </div>
  );
}

