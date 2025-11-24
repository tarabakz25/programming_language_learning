import Link from "next/link";
import { getLanguages } from "@/lib/content";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "@/components/auth/user-profile";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const languages = await getLanguages();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">マイページ</h1>
          <UserProfile />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">
              学習コース一覧
            </h2>
            <p className="text-muted-foreground">
              興味のある言語を選択して学習を始めましょう
            </p>
          </div>

          {languages.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>利用可能な言語がありません</CardTitle>
                <CardDescription>
                  コンテンツを追加してください
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {languages.map((language) => (
                <Link key={language} href={`/learn/${language}`}>
                  <Card className="hover:bg-accent transition-colors cursor-pointer h-full border-blue-500/20 hover:border-blue-500/50">
                    <CardHeader>
                      <CardTitle className="capitalize">{language}</CardTitle>
                      <CardDescription>
                        学習を続ける
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
