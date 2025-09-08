import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "The passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsReset(true);
      toast({
        title: "Password Reset Successful",
        description: "Your neural pathways have been secured with new authentication.",
      });
    }, 2000);
  };

  if (isReset) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/90 to-primary/10 p-4">
        <Card className="w-full max-w-md bg-background/80 backdrop-blur-sm border-primary/20 shadow-2xl shadow-primary/10">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
              <CheckCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Password Reset Complete
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Your neural security protocols have been successfully updated
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-sm text-muted-foreground">
                Your new authentication sequence is now active. You can access the neural network with your updated credentials.
              </p>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 transition-all duration-300">
              <Link to="/login">
                Access Neural Network
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="light-auth-theme dark:auth-theme min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/90 to-primary/10 p-4">
      <Card className="w-full max-w-md bg-background/80 backdrop-blur-sm border-primary/20 shadow-2xl shadow-primary/10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Neural Password Reset
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Configure your new authentication sequence
            </CardDescription>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm font-medium text-foreground/80">
                New Neural Key
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10 bg-background/50 border-primary/20 focus:border-primary/40 transition-colors"
                  placeholder="Enter your new neural key"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground/80">
                Confirm Neural Key
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10 bg-background/50 border-primary/20 focus:border-primary/40 transition-colors"
                  placeholder="Confirm your new neural key"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
              <p>Neural security requirements:</p>
              <ul className="mt-1 space-y-1 text-xs">
                <li>• Minimum 8 characters</li>
                <li>• Mix of letters, numbers, and symbols recommended</li>
                <li>• Avoid common patterns</li>
              </ul>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Updating Neural Pathways..." : "Update Authentication"}
            </Button>
            
            <div className="text-center">
              <Link 
                to="/login" 
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Return to Neural Network Access
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;