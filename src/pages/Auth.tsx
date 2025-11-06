import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Mail, Lock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, user, userRole } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user && userRole) {
      navigate(userRole === 'admin' ? '/admin' : '/support');
    }
  }, [user, userRole, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn(email, password);

    if (result.success) {
      toast({
        title: "Welcome back!",
        description: `Successfully signed in as ${result.role}`,
      });
      
      navigate(result.role === 'admin' ? '/admin' : '/support');
    } else {
      setError(result.error || "Invalid credentials");
      toast({
        title: "Authentication failed",
        description: result.error || "Invalid credentials",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-card">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_hsl(var(--primary)/0.1),_transparent_50%)]" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow animate-glow-pulse">
              <Bot className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-text">VW AI Service Hub</h1>
          <p className="text-muted-foreground">Access your intelligent service platform</p>
        </div>

        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Access your Volkswagen service dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@volkswagen.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-xs text-muted-foreground mb-2 font-semibold">Demo Credentials:</p>
              <div className="space-y-1 text-xs">
                <p className="text-muted-foreground">
                  <span className="font-medium">Admin:</span> admin@volkswagen.com / Volkswagen@2025
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Support:</span> Credentials created by admin
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
