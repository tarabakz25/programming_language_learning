import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getLanguages } from "@/lib/content";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ActivityCalendar } from "@/components/dashboard/activity-calendar";
import { Button } from "@/components/ui/button";
import { PlayCircle, BookOpen, CheckCircle } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const languages = await getLanguages();

  // Mock progress data
  const getProgress = (lang: string) => {
    // Deterministic mock based on string length for demo consistency
    return (lang.length * 10) % 100;
  };

  return (
    <div className="min-h-screen bg-background relative pb-20">
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <header className="border-b border-white/10 glass sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold tracking-tight">flow_learning</span>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-sm text-muted-foreground hidden md:block">
                {user.email}
             </span>
             {/* Simple logout link logic would go here or reuse UserProfile */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 relative z-10 space-y-10">
        
        {/* Welcome & Stats */}
        <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome back!
                </h1>
                <p className="text-muted-foreground">
                    You&apos;re on a 3-day streak. Keep it up!
                </p>
                <div className="mt-6 p-6 rounded-2xl border border-white/5 bg-black/20 backdrop-blur-sm">
                    <ActivityCalendar />
                </div>
            </div>
            
            {/* Quick Stats Card */}
            <Card className="glass border-white/10 flex flex-col justify-center">
                <CardHeader>
                    <CardTitle className="text-lg">Weekly Goal</CardTitle>
                    <CardDescription>3 / 5 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[60%] rounded-full" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                        You learned for 45 minutes today.
                    </p>
                </CardContent>
            </Card>
        </div>

        {/* Courses Section */}
        <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-500" />
                My Courses
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {languages.map((language) => {
                const progress = getProgress(language);
                return (
                    <Card key={language} className="glass border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-300 group">
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-start mb-2">
                                <div className="p-2 rounded-md bg-blue-500/10 text-blue-500">
                                    <span className="font-mono font-bold text-lg">
                                        {language.substring(0, 2).toUpperCase()}
                                    </span>
                                </div>
                                <div className="relative w-12 h-12 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="24"
                                            cy="24"
                                            r="20"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="transparent"
                                            className="text-muted/20"
                                        />
                                        <circle
                                            cx="24"
                                            cy="24"
                                            r="20"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="transparent"
                                            strokeDasharray={125.6}
                                            strokeDashoffset={125.6 - (125.6 * progress) / 100}
                                            className="text-blue-500 transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <span className="absolute text-[10px] font-bold">
                                        {progress}%
                                    </span>
                                </div>
                            </div>
                            <CardTitle className="capitalize text-xl">{language}</CardTitle>
                            <CardDescription>
                                {progress === 0 ? "Start your journey" : "Continue learning"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={`/learn/${language}`} className="w-full block">
                                <Button className="w-full group-hover:bg-blue-600 transition-colors" variant={progress === 0 ? "outline" : "default"}>
                                    {progress === 0 ? (
                                        <>Start Learning <PlayCircle className="w-4 h-4 ml-2" /></>
                                    ) : (
                                        <>Continue <PlayCircle className="w-4 h-4 ml-2" /></>
                                    )}
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                );
              })}
            </div>
        </div>

      </main>
    </div>
  );
}

