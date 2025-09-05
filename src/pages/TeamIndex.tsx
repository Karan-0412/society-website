import { TeamHero } from "@/components/TeamHero";
import { TeamCard } from "@/components/TeamCard";
import { teamMembers } from "@/data/teamData";
import "./Team/Teamindex.css" ;
const Index = () => {
  return (
    <div className="team min-h-screen bg-gradient-background">
      <TeamHero />
      
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet the <span className="bg-gradient-primary bg-clip-text text-transparent">Dream Team</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each team member brings their own unique blend of skills, quirks, and caffeinated creativity to the table.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard 
                key={member.name} 
                member={member} 
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>
      
      <footer className="py-12 px-4 text-center border-t border-border bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Want to Join Our Quirky Corner?
          </h3>
          <p className="text-muted-foreground mb-6">
            We're always looking for amazing humans to add to our family of professional weirdos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:careers@company.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-glow transition-colors font-medium"
            >
              Send Us Your Story
            </a>
            <a 
              href="#" 
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
