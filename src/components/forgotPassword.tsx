import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, ArrowLeft, Mail, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// import "../pages/SignApp.module.css"
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Reset Code Transmitted",
          description: data.message || "Check your neural inbox for recovery instructions...",
        });
        setIsSubmitted(true);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send recovery signal.",
        });
      }
    } catch (err) {
      toast({
        title: "Network Error",
        description: "Unable to reach the server. Try again later.",
      });
    }

    setIsLoading(false);
  };

  const handleResend = async () => {
    setIsLoading(true);
    
    // Simulate resending reset email
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Code Retransmitted",
      description: "Another recovery signal has been sent...",
    });
    
    setIsLoading(false);
  };

  return (
    <div className="light-auth-theme dark:auth-theme min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Forgot Password Card */}
      <Card className="w-full max-w-md bg-card/90 backdrop-blur-xl border-border/50 shadow-cyber animate-fade-in relative overflow-hidden">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-accent opacity-20 blur-sm"></div>
        <div className="absolute inset-[1px] bg-card rounded-lg"></div>
        
        <div className="relative z-10">
          <CardHeader className="text-center space-y-4">
            <div
    className="mx-auto w-16 h-16 rounded-full flex items-center justify-center shadow-glow-accent animate-glow-pulse"
    style={{ background: "linear-gradient(90deg, hsl(var(--destructive)), hsl(var(--primary)))" }}
  >
    {/* set the SVG stroke to currentColor and set the parent text color from the CSS var */}
    <KeyRound
      className="w-8 h-8 text-[hsl(var(--accent-foreground))]"
      stroke="currentColor"
    />
  </div>

            <div>
  <CardTitle
    className="text-2xl font-bold bg-clip-text text-transparent"
    style={{
      backgroundImage: "linear-gradient(90deg, hsl(270, 91%, 65%), hsl(320, 91%, 65%))"
    }}
  >
    {isSubmitted ? "Recovery Initiated" : "Neural Recovery"}
  </CardTitle>
  <CardDescription className="text-muted-foreground mt-2">
    {isSubmitted 
      ? "Recovery instructions have been transmitted to your neural ID"
      : "Restore access to your cyber profile"
    }
  </CardDescription>
</div>
</CardHeader>

          <CardContent className="space-y-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-secondary" />
                    Neural ID
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@cyber.net"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-muted/50 border-border/50 focus:border-secondary focus:ring focus:shadow-glow-secondary transition-all duration-300 pl-4"
                      required
                    />
                    <div className="absolute inset-0 rounded-md bg-gradient-secondary opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
  type="submit"
  disabled={isLoading}
  className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100
    ${!isLoading 
      ? "bg-gradient-primary hover:shadow-glow-primary text-primary-foreground"
      : ""
    }`}
>
  {isLoading ? (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-[hsl(var(--accent-foreground))/30] border-t-[hsl(var(--accent-foreground))] rounded-full animate-spin"></div>
      Transmitting...
    </div>
  ) : (
    <>
      <Zap className="w-4 h-4 mr-2" />
      Send Recovery Signal
    </>
  )}
</Button>

              </form>
            ) : (
              <div className="space-y-6">
                {/* Success Message */}
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">Recovery signal transmitted to:</p>
                    <p className="text-accent font-mono text-sm">{email}</p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Check your neural inbox and follow the recovery protocol. The signal may take a few cycles to arrive.
                  </p>
                </div>

                {/* Resend Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResend}
                  disabled={isLoading}
                  className="w-full hover:text-white/50 bg-card/50 border-border/50 hover:bg-muted/50 hover:border-accent/50 transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin"></div>
                      Retransmitting...
                    </div>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2 hover:text-white" />
                      Resend Recovery Signal
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Back to Login */}
            <div className="text-center">
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200"
              >
                <ArrowLeft className="w-3 h-3" />
                Return to neural access
              </Link>
            </div>

            {/* Additional Help */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Need a new neural profile?{" "}
                <Link 
                  to="/signup" 
                  className="text-secondary hover:text-secondary/80 transition-colors duration-200 font-medium"
                >
                  Create identity
                </Link>
              </p>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Floating Particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-accent rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-primary rounded-full animate-pulse delay-1000 opacity-40"></div>
      <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse delay-2000 opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-2 h-2 bg-accent rounded-full animate-pulse delay-500 opacity-70"></div>
    </div>
  );
};

export default ForgotPassword;