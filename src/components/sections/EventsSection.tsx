import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import CountdownTimer from "@/components/ui/countdown-timer";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees?: number;
  category: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled" | string;
}

const API_BASE = (import.meta as any).env?.VITE_CORE_API || "http://localhost:5050";

const EventsSection = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer: number | undefined;
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/events`);
        const data = await res.json();
        setEvents(data);
      } catch (e) {
        console.error("Failed to load events", e);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
    timer = window.setInterval(fetchEvents, 30000);
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-success/10 text-success border-success/20";
      case "ongoing":
        return "bg-warning/10 text-warning border-warning/20";
      case "completed":
        return "bg-muted/10 text-muted-foreground border-muted/20";
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const topEvents = events.slice(0, 3);
  const nextEvent = events.find(e => e.status === "upcoming" || e.status === "ongoing");

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
          
          {/* Countdown Timer for Next Event */}
          <div className="mt-8 flex justify-center">
            {nextEvent ? (
              <CountdownTimer 
                targetDate={new Date(nextEvent.date + (nextEvent.time ? `T${nextEvent.time}` : "T00:00")).toISOString()}
                eventName={nextEvent.title}
                className="bg-card border rounded-lg p-4 shadow-sm"
              />
            ) : (
              <div className="text-sm text-muted-foreground">No upcoming events scheduled.</div>
            )}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {loading && [1,2,3].map(i => (
            <Card key={i} className="border-border/50">
              <CardContent className="p-6 animate-pulse space-y-3">
                <div className="h-5 w-2/3 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-1/2 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
          {!loading && topEvents.map((event) => (
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
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  {event.time && (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  {typeof event.attendees === "number" && (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} registered</span>
                    </div>
                  )}
                </div>

                <Button className="w-full group" variant="outline">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="group" asChild>
            <a href="/events">
              View All Events
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;