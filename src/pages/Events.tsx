import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";



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
  const [events, setEvents]=useState([]);
  const [query, setQuery] = useState("");


  const getEvents = async ()=>{
    try {
      const res = await axios.get("http://localhost:5000/events/");
      // console.log(res);
      setEvents(res.data)
    } catch (error) {
      console.log("Something went wrong when fetching the events.", error)
    }
  }

  useEffect(()=>{
    getEvents()
  }, [])

  const navigate=useNavigate()
  // const events = [
  //   {
  //     id: 1,
  //     title: "Annual Tech Conference 2024",
  //     date: "March 15, 2024",
  //     time: "9:00 AM - 5:00 PM",
  //     location: "Main Auditorium",
  //     attendees: 120,
  //     category: "Conference",
  //     status: "Open",
  //     description: "Join us for a day of inspiring talks, networking, and innovation in technology. Featuring industry leaders and cutting-edge presentations."
  //   },
  //   {
  //     id: 2,
  //     title: "Community Hackathon",
  //     date: "March 22, 2024",
  //     time: "6:00 PM - 11:59 PM",
  //     location: "Computer Lab B",
  //     attendees: 48,
  //     category: "Competition",
  //     status: "Limited",
  //     description: "24-hour coding challenge to solve real-world problems and win amazing prizes. Teams of 3-5 members welcome."
  //   },
  //   {
  //     id: 3,
  //     title: "Leadership Workshop",
  //     date: "March 28, 2024",
  //     time: "2:00 PM - 4:00 PM",
  //     location: "Meeting Room 301",
  //     attendees: 25,
  //     category: "Workshop",
  //     status: "Open",
  //     description: "Develop essential leadership skills for personal and professional growth with interactive sessions."
  //   },
  //   {
  //     id: 4,
  //     title: "Networking Mixer",
  //     date: "April 5, 2024",
  //     time: "7:00 PM - 9:00 PM",
  //     location: "Student Lounge",
  //     attendees: 85,
  //     category: "Social",
  //     status: "Open",
  //     description: "Connect with fellow students and alumni in a relaxed, friendly environment with refreshments."
  //   },
  //   {
  //     id: 5,
  //     title: "AI & Machine Learning Seminar",
  //     date: "April 12, 2024",
  //     time: "10:00 AM - 12:00 PM",
  //     location: "Lecture Hall A",
  //     attendees: 200,
  //     category: "Seminar",
  //     status: "Full",
  //     description: "Deep dive into the latest trends in artificial intelligence and machine learning with expert speakers."
  //   },
  //   {
  //     id: 6,
  //     title: "Career Fair 2024",
  //     date: "April 18, 2024",
  //     time: "9:00 AM - 4:00 PM",
  //     location: "Campus Gymnasium",
  //     attendees: 300,
  //     category: "Career",
  //     status: "Open",
  //     description: "Meet with top employers and explore career opportunities across various industries."
  //   }
  // ];

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
              {events.map((event) => (
                <Card key={event._id} className="group hover:shadow-lg transition-smooth border-border/50 hover:border-primary/20">
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

                    <Button onClick={()=>navigate(`/register/${event.title}`)}
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