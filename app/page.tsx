import Link from "next/link";
import { getLanguages } from "@/lib/content";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "@/components/auth/user-profile";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const languages = await getLanguages();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px]" />
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-white/10 glass">
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">flow_learning</h1>
          </div>
          <UserProfile />
        </div>
      </header>

      <main className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-500 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
            Start your journey
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Master Programming with <br />
            <span className="text-gradient">Seamless Flow</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            直感的なフローと実践的なハンズオンで、
            <br className="hidden md:block" />
            新しいプログラミング言語を効率的に習得しましょう。
          </p>

          <div className="flex gap-4">
             <Button size="lg" className="rounded-full px-8 text-base bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25">
               学習を始める
             </Button>
             <Button variant="outline" size="lg" className="rounded-full px-8 text-base glass hover:bg-white/10">
               詳しく見る
             </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-2xl font-bold">Available Languages</h3>
             <span className="text-muted-foreground text-sm">{languages.length} languages ready</span>
          </div>

          {languages.length === 0 ? (
            <Card className="glass border-dashed">
              <CardHeader className="text-center py-12">
                <CardTitle>No languages available yet</CardTitle>
                <CardDescription>
                  コンテンツが追加されるのをお待ちください
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {languages.map((language) => (
                <Link key={language} href={`/learn/${language}`} className="group block">
                  <Card className="h-full glass transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 border-white/10 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader>
                      <CardTitle className="capitalize text-2xl flex items-center justify-between">
                        {language}
                        <span className="text-muted-foreground/20 group-hover:text-blue-500/50 transition-colors text-4xl font-mono">
                          {"/>"}
                        </span>
                      </CardTitle>
                      <CardDescription className="text-base pt-2">
                        {language}の基礎から応用まで、フローに沿って学習します。
                      </CardDescription>
                    </CardHeader>
                    <div className="px-6 pb-6 pt-0 mt-auto">
                       <div className="text-sm font-medium text-blue-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 transition-transform">
                          Start Learning <span>→</span>
                       </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <footer className="border-t border-white/10 mt-20 bg-muted/30">
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-70">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
               <span className="text-white text-xs font-bold">F</span>
            </div>
            <span className="font-bold">flow_learning</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 flow_learning. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
