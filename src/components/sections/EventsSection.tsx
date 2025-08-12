import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";

const EventsSection = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Tech Conference 2024",
      date: "March 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Main Auditorium",
      attendees: 120,
      category: "Conference",
      status: "Open",
      description: "Join us for a day of inspiring talks, networking, and innovation in technology."
    },
    {
      id: 2,
      title: "Community Hackathon",
      date: "March 22, 2024",
      time: "6:00 PM - 11:59 PM",
      location: "Computer Lab B",
      attendees: 48,
      category: "Competition",
      status: "Limited",
      description: "24-hour coding challenge to solve real-world problems and win amazing prizes."
    },
    {
      id: 3,
      title: "Leadership Workshop",
      date: "March 28, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Meeting Room 301",
      attendees: 25,
      category: "Workshop",
      status: "Open",
      description: "Develop essential leadership skills for personal and professional growth."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-success/10 text-success border-success/20";
      case "Limited":
        return "bg-warning/10 text-warning border-warning/20";
      case "Full":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upcoming <span className="text-gradient">Events</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on our exciting events designed to inspire, educate, and connect our community.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="group hover:shadow-lg transition-smooth border-border/50 hover:border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge className={`${getStatusColor(event.status)} font-medium`}>
                    {event.status}
                  </Badge>
                  <Badge variant="outline">{event.category}</Badge>
                </div>
                <CardTitle className="group-hover:text-primary transition-smooth">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{event.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} registered</span>
                  </div>
                </div>

                <Button className="w-full group" variant="outline">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="group">
            View All Events
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;