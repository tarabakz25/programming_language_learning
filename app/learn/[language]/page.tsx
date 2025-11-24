import { getSections, getLanguages } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  const sections = await getSections(language);
  const languages = await getLanguages();

  if (!languages.includes(language)) {
    notFound();
  }

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
            {sections.map((section) => (
              <Link
                key={section}
                href={`/learn/${language}/${section}`}
              >
                <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="capitalize">
                      {section.replace(/-/g, " ")}
                    </CardTitle>
                    <CardDescription>
                      このセクションを学習する
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

