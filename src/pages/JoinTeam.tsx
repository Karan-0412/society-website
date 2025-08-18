import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Zap, Globe, Coffee, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import "./Team/Teamindex.css" ;

const JoinTeam = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "" ,
    position: "",
    experience: "",
    portfolio: "",
    message: ""
  });
  const { toast } = useToast();

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleApplyForPosition = (positionTitle: string) => {
    setFormData(prev => ({
      ...prev,
      position: positionTitle
    }));
    scrollToForm();
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), // send all form fields
    });

    const data = await res.json();

    if (res.ok) {
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        portfolio: "",
        message: ""
      });
    } else {
      toast({
        title: "Submission Failed",
        description: data.message || "Please try again.",
      });
    }
  } catch (err) {
    toast({
      title: "Error",
      description: "Server unreachable. Please try later.",
    });
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const benefits = [
    { icon: Heart, title: "Work-Life Balance", description: "Flexible hours and remote-friendly culture" },
    { icon: Zap, title: "Growth Opportunities", description: "Continuous learning and skill development" },
    { icon: Globe, title: "Global Impact", description: "Work on projects that make a difference" },
    { icon: Coffee, title: "Amazing Perks", description: "Great benefits, coffee, and team events" },
    { icon: Rocket, title: "Innovation Focus", description: "Latest technologies and cutting-edge projects" },
    { icon: Users, title: "Collaborative Team", description: "Supportive and diverse work environment" }
  ];

  const openPositions = [
    { title: "Senior Frontend Developer", type: "Full-time", location: "Remote" },
    { title: "UX/UI Designer", type: "Full-time", location: "New York" },
    { title: "Backend Engineer", type: "Full-time", location: "Remote" },
    { title: "Product Manager", type: "Full-time", location: "San Francisco" },
    { title: "DevOps Engineer", type: "Contract", location: "Remote" }
  ];

  return (
    <div className="team min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />

        <div className="relative container mx-auto text-center">

          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Users className="w-4 h-4" />
            We're Hiring!
          </div>
           <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-bounce-in" style={{ animationDelay: '200ms' }}>
          Join Our
          <span className="bg-gradient-primary bg-clip-text text-transparent"> Amazing Team</span>
        </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in">
            Be part of something extraordinary. Help us build the future while growing your career in a supportive, innovative environment.
          </p>
          <Button size="lg" className="animate-fade-in hover-scale" onClick={() => {
            document.getElementById('open-positions')?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }}>
            View Open Positions
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why You'll Love Working Here</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover-scale transition-all duration-300 hover:shadow-lg border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Open Positions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover-scale transition-all duration-300 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{position.type}</Badge>
                        <Badge variant="outline">{position.location}</Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="hover-scale"
                      onClick={() => handleApplyForPosition(position.title)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Submit Your Application</CardTitle>
                <CardDescription className="text-center">
                  Don't see the perfect role? Send us your information and we'll keep you in mind for future opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="transition-all duration-200 focus:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="transition-all duration-200 focus:scale-105"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"  // Use 'tel' instead of 'telephone'
                        value={formData.phone}  // bind to phone
                        onChange={handleChange}
                        required
                        className="transition-all duration-200 focus:scale-105"
                      />
                    </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position of Interest</Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="e.g., Frontend Developer, Designer, etc."
                      className="transition-all duration-200 focus:scale-105"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g., 3 years"
                      className="transition-all duration-200 focus:scale-105"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio/LinkedIn URL</Label>
                    <Input
                      id="portfolio"
                      name="portfolio"
                      type="url"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="transition-all duration-200 focus:scale-105"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about yourself</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="What makes you excited about joining our team?"
                      className="transition-all duration-200 focus:scale-105 resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full hover-scale">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join a team that values innovation, creativity, and personal growth. Let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="hover-scale" onClick={scrollToForm}>
              Apply Now
            </Button>
            <Button variant="outline" size="lg" className="hover-scale">
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinTeam;