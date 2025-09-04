import { useState, useEffect } from "react";
import DashboardLayout from "@/components/Corelayout/DashboardLayout";
import MemberCard from "@/components/Coremembers/MemberCard";
import EventCard from "@/components/Coreevents/EventCard";
import AddMemberDialog from "@/components/Coreforms/AddMemberDialog";
import AddEventDialog from "@/components/Coreforms/AddEventDialog";
import AttendanceDialog from "@/components/Coreforms/AttendanceDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, TrendingUp, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import "./Coreindex.css";

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar?: string;
  status: "active" | "inactive";
  joinDate: string;
}

interface EventParticipant {
  id: string;
  name: string;
  email: string;
  attended: boolean | null; // null = not marked, true = present, false = absent
}

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
  participants: EventParticipant[];
}

const API_BASE = (import.meta as any).env?.VITE_CORE_API || "http://localhost:5050";

const Index = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<"overview" | "members" | "events" | "attendance" | "settings">("overview");

  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    const res = await fetch(`${API_BASE}/api/members`);
    const data = await res.json();
    setMembers(data);
  };

  const fetchEvents = async () => {
    const res = await fetch(`${API_BASE}/api/events`);
    const list = await res.json();
    // Fetch details to include participants
    const withParticipants = await Promise.all(
      list.map(async (e: any) => {
        const d = await fetch(`${API_BASE}/api/events/${e.id}`).then(r => r.json());
        return { ...e, participants: d.participants } as Event;
      })
    );
    setEvents(withParticipants);
  };

  useEffect(() => {
    const load = async () => {
      try {
        await Promise.all([fetchMembers(), fetchEvents()]);
      } catch (e) {
        console.error(e);
        toast({ title: "Failed to load", description: "Could not load core data", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddMember = async (newMember: Omit<Member, "id" | "joinDate">) => {
    try {
      const res = await fetch(`${API_BASE}/api/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });
      if (!res.ok) throw new Error("Add member failed");
      const member = await res.json();
      setMembers(prev => [...prev, member]);
      toast({
        title: "Member Added",
        description: `${member.name} has been successfully added to the team.`,
      });
    } catch (e) {
      toast({ title: "Error", description: "Unable to add member", variant: "destructive" });
    }
  };

  const handleEditMember = async (member: Member) => {
    try {
      const res = await fetch(`${API_BASE}/api/members/${member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(member),
      });
      if (!res.ok) throw new Error("Edit member failed");
      const updated = await res.json();
      setMembers(prev => prev.map(m => (m.id === updated.id ? updated : m)));
      toast({ title: "Member Updated", description: `${updated.name} updated.` });
    } catch (e) {
      toast({ title: "Error", description: "Unable to update member", variant: "destructive" });
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    try {
      const res = await fetch(`${API_BASE}/api/members/${memberId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete member failed");
      setMembers(prev => prev.filter(m => m.id !== memberId));
      toast({ title: "Member Removed", description: `${member?.name} has been removed from the team.`, variant: "destructive" });
    } catch (e) {
      toast({ title: "Error", description: "Unable to remove member", variant: "destructive" });
    }
  };

  const handleAddEvent = async (newEvent: Omit<Event, "id" | "attendees" | "participants">) => {
    try {
      const res = await fetch(`${API_BASE}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newEvent, participants: [] }),
      });
      if (!res.ok) throw new Error("Create event failed");
      const event = await res.json();
      // fetch detail for participants
      const detail = await fetch(`${API_BASE}/api/events/${event.id}`).then(r => r.json());
      setEvents(prev => [...prev, { ...event, participants: detail.participants }]);
      toast({ title: "Event Created", description: `${event.title} has been successfully created.` });
    } catch (e) {
      toast({ title: "Error", description: "Unable to create event", variant: "destructive" });
    }
  };

  const handleUpdateAttendance = async (eventId: string, participants: EventParticipant[]) => {
    try {
      const entries = participants.map(p => ({ participantId: p.id, attended: p.attended }));
      const res = await fetch(`${API_BASE}/api/events/${eventId}/attendance`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries }),
      });
      if (!res.ok) throw new Error("Save attendance failed");
      setEvents(prev => prev.map(e => (e.id === eventId ? { ...e, participants } : e)));
    } catch (e) {
      toast({ title: "Error", description: "Unable to save attendance", variant: "destructive" });
    }
  };

  const handleEditEvent = async (event: Event) => {
    try {
      const res = await fetch(`${API_BASE}/api/events/${event.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: event.title,
          description: event.description,
          date: event.date,
          time: event.time,
          location: event.location,
          status: event.status,
          category: event.category,
        }),
      });
      if (!res.ok) throw new Error("Update event failed");
      const updated = await res.json();
      setEvents(prev => prev.map(e => (e.id === updated.id ? { ...e, ...updated } : e)));
      toast({ title: "Event Updated", description: `${updated.title} saved.` });
    } catch (e) {
      toast({ title: "Error", description: "Unable to update event", variant: "destructive" });
    }
  };

  const handleRemoveEvent = async (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    try {
      const res = await fetch(`${API_BASE}/api/events/${eventId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete event failed");
      setEvents(prev => prev.filter(e => e.id !== eventId));
      toast({ title: "Event Deleted", description: `${event?.title} has been deleted.`, variant: "destructive" });
    } catch (e) {
      toast({ title: "Error", description: "Unable to delete event", variant: "destructive" });
    }
  };

  const renderOverview = () => {
    const activeMembers = members.filter(m => m.status === "active").length;
    const upcomingEvents = events.filter(e => e.status === "upcoming").length;
    const totalAttendees = events.reduce((sum, e) => sum + (e.attendees || 0), 0);

    return (
      <div className="core space-y-6">
        <div className="core flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-2">Welcome to your team management dashboard</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-subtle shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{members.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-success">{activeMembers}</span> active
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-subtle shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{events.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary">{upcomingEvents}</span> upcoming
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-subtle shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Event Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalAttendees}</div>
              <p className="text-xs text-muted-foreground mt-1">Total participants</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-subtle shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Activity</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">High</div>
              <p className="text-xs text-success mt-1">↑ 12% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Members
                <Badge variant="secondary">{members.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {members.slice(0, 3).map((member) => (
                <div key={member.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="h-8 w-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  <Badge variant={member.status === "active" ? "default" : "secondary"}>
                    {member.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Upcoming Events
                <Badge variant="secondary">{upcomingEvents}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.filter(e => e.status === "upcoming").slice(0, 3).map((event) => (
                <div key={event.id} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{event.title}</h4>
                    <Badge className="bg-primary/10 text-primary">{event.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{event.date} at {event.time}</p>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderMembers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
          <p className="text-muted-foreground mt-2">Manage your team members and their roles</p>
        </div>
        <AddMemberDialog onAddMember={handleAddMember} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onEdit={handleEditMember}
            onRemove={handleRemoveMember}
          />
        ))}
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events Management</h1>
          <p className="text-muted-foreground mt-2">Create and manage team events and meetings</p>
        </div>
        <AddEventDialog onAddEvent={handleAddEvent} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="space-y-4">
            <EventCard
              event={event}
              onEdit={handleEditEvent}
              onRemove={handleRemoveEvent}
            />
            <AttendanceDialog
              event={event}
              onUpdateAttendance={handleUpdateAttendance}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Configure your team management preferences</p>
      </div>
      
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <p className="text-muted-foreground">Settings panel coming soon! This will include team preferences, notifications, and system configuration options.</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-6">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <Card key={i} className="shadow-soft animate-pulse"><CardContent className="p-6 h-24" /></Card>
            ))}
          </div>
        </div>
      );
    }
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "members":
        return renderMembers();
      case "events":
        return renderEvents();
      case "settings":
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <DashboardLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      <div className="core">
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default Index;