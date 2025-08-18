import { useState } from "react";
import { Button } from "@/components/Signui/button";
import { Input } from "@/components/Signui/input";
import { Label } from "@/components/Signui/label";
import { Checkbox } from "@/components/Signui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Signui/card";
import { Eye, EyeOff, Shield, Zap, Lock, User, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const CyberSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast({
      title: "Access Denied",
      description: "Neural patterns do not match",
      variant: "destructive"
    });
    return;
  }

  if (!acceptTerms) return;

  setIsLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
    });

    const data = await res.json();

    if (res.ok) {
      toast({
        title: "Neural Profile Created",
        description: "You can now log in..."
      });
      // Optionally redirect to login
    } else {
      toast({
        title: "Access Denied",
        description: data.message || "Sign-up failed",
        variant: "destructive"
      });
    }
  } catch (err) {
    toast({
      title: "Error",
      description: "Server unreachable",
      variant: "destructive"
    });
  }

  setIsLoading(false);
};

const handleSocialLogin = (provider: 'Google' | 'GitHub') => {
  toast({
    title: "Social Neural Link",
    description: `Connecting to ${provider} mainframe...`,
  });

  if (provider === 'Google') {
    window.location.href = "http://localhost:5000/api/auth/google";
  } else if (provider === 'GitHub') {
    window.location.href = "http://localhost:5000/api/auth/github";
  }
};

  return (
    <div className="light-auth-theme dark:auth-theme min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Signup Card */}
      <Card className="w-full max-w-md bg-card/90 backdrop-blur-xl border-border/50 shadow-cyber animate-fade-in relative overflow-hidden">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-secondary opacity-20 blur-sm"></div>
        <div className="absolute inset-[1px] bg-card rounded-lg"></div>
        
        <div className="relative z-10">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center shadow-glow-secondary animate-glow-pulse">
              <User className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-secondary-text bg-clip-text text-transparent">
                Neural Registration
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Initialize your digital consciousness
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-card/50 border-border/50 hover:text-white/50 hover:bg-muted/50 hover:border-primary/50 transition-all duration-300"
                onClick={() => handleSocialLogin('Google')}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Connect with Google Matrix
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-card/50 border-border/50 hover:text-white/50 hover:bg-muted/50 hover:border-secondary/50 transition-all duration-300"
                onClick={() => handleSocialLogin('GitHub')}
              >
                <Github className="w-5 h-5 mr-2" />
                Sync with GitHub Nexus
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or create neural profile</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-accent" />
                  Neural Alias
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="bg-muted/50 border-border/50 focus:border-accent focus:ring-accent/20 focus:shadow-glow-accent transition-all duration-300 pl-4"
                    required
                  />
                  <div className="absolute inset-0 rounded-md bg-gradient-accent opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Neural ID
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-muted/50 border-border/50 focus:border-primary focus:ring-primary/20 focus:shadow-glow-primary transition-all duration-300 pl-4"
                    required
                  />
                  <div className="absolute inset-0 rounded-md bg-gradient-primary opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4 text-secondary" />
                  Access Key
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="bg-muted/50 border-border/50 focus:border-secondary focus:ring-secondary/20 focus:shadow-glow-secondary transition-all duration-300 pl-4 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-secondary transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <div className="absolute inset-0 rounded-md bg-gradient-secondary opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  Confirm Key
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="bg-muted/50 border-border/50 focus:border-accent focus:ring-accent/20 focus:shadow-glow-accent transition-all duration-300 pl-4 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <div className="absolute inset-0 rounded-md bg-gradient-accent opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="border-border/50 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                  I accept the neural network protocols and cyber realm terms of service
                </Label>
              </div>

              {/* Signup Button */}
              <Button
                type="submit"
                disabled={isLoading || !acceptTerms}
                className="w-full bg-gradient-secondary hover:shadow-glow-secondary text-secondary-foreground font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin"></div>
                    Initializing Neural Profile...
                  </div>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" />
                    Create Neural Identity
                  </>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have a neural profile?{" "}
                <Link 
                  to="/login" 
                  className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                >
                  Access existing identity
                </Link>
              </p>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Floating Particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-secondary rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-primary rounded-full animate-pulse delay-1000 opacity-40"></div>
      <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-2000 opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-2 h-2 bg-secondary rounded-full animate-pulse delay-500 opacity-70"></div>
    </div>
  );
};

export default CyberSignup;