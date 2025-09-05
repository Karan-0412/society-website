import { Button } from "@/components/ui/button";
import { Users, Heart, Zap } from "lucide-react";

export const TeamHero = () => {
  return (
    <section className="team relative py-20 px-4 text-center bg-gradient-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      
      <div className="relative max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce-in">
          <Users className="w-4 h-4" />
          Meet Our Amazing Team
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-bounce-in" style={{ animationDelay: '200ms' }}>
          The Quirky Humans Behind
          <span className="bg-gradient-primary bg-clip-text text-transparent"> The Magic</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-bounce-in" style={{ animationDelay: '400ms' }}>
          We're not just colleagues – we're a family of caffeine-powered dreamers, 
          pizza enthusiasts, and professional procrastinators who somehow make great things happen.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-bounce-in" style={{ animationDelay: '600ms' }}>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-lg hover:shadow-hover transition-all duration-300 group"
          >
            <Heart className="w-4 h-4 mr-2 group-hover:animate-wiggle" />
            Join Our Team
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
          >
            <Zap className="w-4 h-4 mr-2 group-hover:animate-wiggle" />
            See Our Work
          </Button>
        </div>
        
        <div className="flex justify-center items-center gap-8 mt-12 text-muted-foreground animate-bounce-in" style={{ animationDelay: '800ms' }}>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">50+</div>
            <div className="text-sm">Coffee Cups Daily</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">99%</div>
            <div className="text-sm">Dad Jokes Success Rate</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">∞</div>
            <div className="text-sm">Creative Ideas</div>
          </div>
        </div>
      </div>
    </section>
  );
};