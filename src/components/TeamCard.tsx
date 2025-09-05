import { Card } from "@/components/ui/card";
import { Linkedin, Github, Instagram } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  funFact: string;
  image: string;
  social: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

interface TeamCardProps {
  member: TeamMember;
  delay?: number;
}

export const TeamCard = ({ member, delay = 0 }: TeamCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden bg-card shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2 hover:rotate-1 animate-bounce-in border-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="team absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      
      <div className="p-6">
        <div className="relative mb-4">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 group-hover:animate-wiggle">
            <img 
              src={member.image} 
              alt={`${member.name}'s profile`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
            {member.name}
          </h3>
          
          <p className="text-primary font-medium text-sm uppercase tracking-wide">
            {member.role}
          </p>
          
          <p className="text-muted-foreground text-sm leading-relaxed">
            {member.bio}
          </p>
          
          <div className="bg-muted rounded-lg p-3 group-hover:bg-gradient-secondary group-hover:text-secondary-foreground transition-all duration-300">
            <p className="text-xs font-medium opacity-80">Fun Fact:</p>
            <p className="text-sm font-medium mt-1">
              {member.funFact}
            </p>
          </div>
          
          <div className="flex justify-center gap-3 pt-4">
            {member.social.linkedin && (
              <a 
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {member.social.github && (
              <a 
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {member.social.instagram && (
              <a 
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};