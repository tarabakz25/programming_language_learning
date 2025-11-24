import { getContent, getSections, getLanguages } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXContent } from "@/lib/mdx";
import { DocsLayout } from "@/components/layout/docs-layout";
import Link from "next/link";

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
  params: Promise<{ language: string; section: string }>;
}) {
  const { language, section } = await params;
  const languages = await getLanguages();
  if (!languages.includes(language)) {
    notFound();
  }

  let content;
  try {
    content = await getContent(language, section);
  } catch {
    notFound();
  }

  const sections = await getSections(language);

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
        <MDXContent source={content.source} />
      </DocsLayout>
    </div>
  );
}

