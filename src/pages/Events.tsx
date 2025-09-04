import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

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

const Events = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filtered, setFiltered] = useState<EventItem[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer: number | undefined;
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/events`);
        const data = await res.json();
        setEvents(data);
        setFiltered(prev => {
          const q = query.toLowerCase();
          return data.filter(e =>
            e.title.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q) ||
            e.category.toLowerCase().includes(q) ||
            e.location.toLowerCase().includes(q)
          );
        });
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
  }, [query]);

  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(
      events.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
      )
    );
  }, [query, events]);

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Amazing Events
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join our vibrant community events designed to inspire, educate, and connect students.
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  className="pl-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  All Categories
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading && [1,2,3,4,5,6].map(i => (
                <Card key={i} className="border-border/50">
                  <CardContent className="p-6 animate-pulse space-y-3">
                    <div className="h-5 w-2/3 bg-muted rounded" />
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-1/2 bg-muted rounded" />
                  </CardContent>
                </Card>
              ))}
              {!loading && filtered.map((event) => (
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

                    <Button 
                      className="w-full" 
                      variant={event.status === "cancelled" ? "secondary" : "default"}
                      disabled={event.status === "cancelled"}
                    >
                      {event.status === "cancelled" ? "Cancelled" : "Register Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;