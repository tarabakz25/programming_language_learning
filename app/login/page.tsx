import { LoginButton } from "@/components/auth/login-button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
       {/* Background Decor */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-md relative z-10 glass border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            ログインして学習を続けましょう
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginButton />
        </CardContent>
      </Card>
    </div>
  );
}

