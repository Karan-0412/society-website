import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/Corelayout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, ChevronRight } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees?: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  category: string;
}

const AttendanceEventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock API call - replace with your backend integration
  useEffect(() => {
    const fetchEvents = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockEvents: Event[] = [
        {
          id: "1",
          title: "Team Standup Meeting",
          description: "Weekly standup to discuss progress and blockers",
          date: "2024-01-20",
          time: "09:00",
          location: "Conference Room A",
          attendees: 8,
          maxAttendees: 10,
          status: "upcoming",
          category: "meeting",
        },
        {
          id: "2",
          title: "React Training Workshop",
          description: "Advanced React patterns and best practices training session",
          date: "2024-01-25",
          time: "14:00",
          location: "Training Center",
          attendees: 15,
          maxAttendees: 20,
          status: "upcoming",
          category: "training",
        },
        {
          id: "3",
          title: "Company Social Event",
          description: "Team building and networking event for all employees",
          date: "2024-01-18",
          time: "18:00",
          location: "Main Lobby",
          attendees: 42,
          status: "completed",
          category: "social",
        },
      ];
      
      setEvents(mockEvents);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const handleEventSelect = (eventId: string) => {
    navigate(`/core-dashboard/attendance/${eventId}`);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { variant: "default" as const, label: "Upcoming" },
      ongoing: { variant: "default" as const, label: "Ongoing" },
      completed: { variant: "secondary" as const, label: "Completed" },
      cancelled: { variant: "destructive" as const, label: "Cancelled" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    return <Badge className="bg-primary/10 text-primary capitalize">{category}</Badge>;
  };

  if (loading) {
    return (
      <DashboardLayout activeSection="attendance" onSectionChange={() => {}}>
        <div className="core space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
            <p className="text-muted-foreground mt-2">Loading events...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="shadow-soft animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const upcomingEvents = events.filter(e => e.status === "upcoming" || e.status === "ongoing");
  const pastEvents = events.filter(e => e.status === "completed");

  return (
    <DashboardLayout activeSection="attendance" onSectionChange={() => {}}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-muted-foreground mt-2">Select an event to mark attendance</p>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="shadow-soft hover:shadow-elegant transition-shadow cursor-pointer group"
                      onClick={() => handleEventSelect(event.id)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </CardTitle>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(event.status)}
                      {getCategoryBadge(event.category)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>
                          {event.attendees} participants
                          {event.maxAttendees && ` (max ${event.maxAttendees})`}
                        </span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4" variant="outline">
                      Mark Attendance
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <Card key={event.id} className="shadow-soft hover:shadow-elegant transition-shadow cursor-pointer group opacity-80"
                      onClick={() => handleEventSelect(event.id)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </CardTitle>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(event.status)}
                      {getCategoryBadge(event.category)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} participants</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4" variant="outline">
                      View Attendance
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {events.length === 0 && (
          <Card className="shadow-soft">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Events Found</h3>
              <p className="text-muted-foreground">There are no events available for attendance marking.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AttendanceEventsPage;