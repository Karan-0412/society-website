import { Button } from "@/components/Signui/button";
import { Shield, Zap, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import './Signindex.css' 
// module.exports = {
//   darkMode: 'class', // Enables toggling dark mode via 'dark' class
//   // other config ...
// };

const Index = () => {
  return (
    <div className="light-auth-theme dark:auth-theme min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      {/* Welcome Content */}
      <div className="text-center space-y-8 animate-fade-in relative z-10">
        <div className="space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary animate-glow-pulse">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-text">
            CyberAuth Flow
          </h1>


          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Enter the neural network. Authenticate your digital consciousness.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login">
            <Button className="bg-gradient-primary hover:shadow-glow-primary text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] w-full sm:w-auto">
              <Lock className="w-4 h-4 mr-2" />
              Access Network
            </Button>
          </Link>
          <Link to="/signup">
            <Button 
              variant="outline" 
              className="bg-card/50 border-secondary/50 hover:bg-secondary/10 hover:border-secondary text-secondary hover:text-secondary font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] w-full sm:w-auto"
            >
              <Zap className="w-4 h-4 mr-2" />
              Initialize Profile
            </Button>
          </Link>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center">
            <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Secure Access</h3>
            <p className="text-sm text-muted-foreground">Military-grade encryption protects your neural data</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center">
            <Zap className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Instant Sync</h3>
            <p className="text-sm text-muted-foreground">Real-time neural pattern synchronization</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center">
            <Lock className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Multi-Layer Auth</h3>
            <p className="text-sm text-muted-foreground">Biometric and social network integration</p>
          </div>
        </div> */}
      </div>

      {/* Floating Particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-secondary rounded-full animate-pulse delay-1000 opacity-40"></div>
      <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-2000 opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-2 h-2 bg-primary rounded-full animate-pulse delay-500 opacity-70"></div>
    </div>
  );
};

export default Index;
