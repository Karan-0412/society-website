import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/Corelayout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Clock, MapPin, Users, CheckCircle, XCircle, Save, Eye, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Participant {
  id: string;
  teamName: string;
  uid: string;
  email: string;
  phone: string;
  dlNo?: string;
  attended: boolean | null; // null = not marked, true = present, false = absent
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  category: string;
  participants: Participant[];
}

const AttendanceMarkingPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Check if attendance can be marked (current date matches event date)
  const isAttendanceEnabled = event ? new Date().toDateString() === new Date(event.date).toDateString() : false;
  const isReadOnly = !isAttendanceEnabled || event?.status === "completed";

  useEffect(() => {
    const fetchEventData = async () => {
      if (!eventId) return;
      
      // Simulate API call - replace with your backend integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockEvent: Event = {
        id: eventId,
        title: "React Training Workshop",
        description: "Advanced React patterns and best practices training session",
        date: "2024-01-25",
        time: "14:00",
        location: "Training Center",
        status: "upcoming",
        category: "training",
        participants: [
          {
            id: "1",
            teamName: "Frontend Team",
            uid: "EMP001",
            email: "alex@company.com",
            phone: "+1 (555) 123-4567",
            dlNo: "DL123456789",
            attended: null,
          },
          {
            id: "2",
            teamName: "Backend Team",
            uid: "EMP002",
            email: "sarah@company.com",
            phone: "+1 (555) 234-5678",
            dlNo: "",
            attended: null,
          },
          {
            id: "3",
            teamName: "DevOps Team",
            uid: "EMP003",
            email: "mike@company.com",
            phone: "+1 (555) 345-6789",
            attended: null,
          },
          {
            id: "4",
            teamName: "QA Team",
            uid: "EMP004",
            email: "jane@company.com",
            phone: "+1 (555) 456-7890",
            dlNo: "DL987654321",
            attended: null,
          },
        ],
      };
      
      setEvent(mockEvent);
      setParticipants(mockEvent.participants);
      setLoading(false);
    };

    fetchEventData();
  }, [eventId]);

  const handleAttendanceChange = (participantId: string, attended: boolean) => {
    if (isReadOnly) return;
    
    setParticipants(prev =>
      prev.map(p =>
        p.id === participantId ? { ...p, attended } : p
      )
    );
  };

  const handleDlNoChange = (participantId: string, dlNo: string) => {
    if (isReadOnly) return;
    
    setParticipants(prev =>
      prev.map(p =>
        p.id === participantId ? { ...p, dlNo } : p
      )
    );
  };

  const handleSaveAttendance = async () => {
    if (isReadOnly) return;
    
    setSaving(true);
    
    // Simulate API call - replace with your backend integration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would send the attendance data to your backend
    console.log("Saving attendance:", { eventId, participants });
    
    setSaving(false);
    toast({
      title: "Attendance Saved",
      description: `Attendance has been recorded for ${event?.title}`,
    });
  };

  const getAttendanceIcon = (attended: boolean | null) => {
    if (attended === true) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (attended === false) return <XCircle className="h-4 w-4 text-red-600" />;
    return <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />;
  };

  const getAttendanceBadge = (attended: boolean | null) => {
    if (attended === true) return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Present</Badge>;
    if (attended === false) return <Badge variant="destructive">Absent</Badge>;
    return <Badge variant="secondary">Not Marked</Badge>;
  };

  if (loading || !event) {
    return (
      <DashboardLayout activeSection="attendance" onSectionChange={() => {}}>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/attendance")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </div>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <Card className="shadow-soft">
              <CardContent className="p-6 space-y-4">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Filter participants based on search query
  const filteredParticipants = participants.filter(participant => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      participant.teamName.toLowerCase().includes(query) ||
      participant.uid.toLowerCase().includes(query)
    );
  });

  const presentCount = participants.filter(p => p.attended === true).length;
  const absentCount = participants.filter(p => p.attended === false).length;
  const notMarkedCount = participants.filter(p => p.attended === null).length;

  return (
    <DashboardLayout activeSection="attendance" onSectionChange={() => {}}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/attendance")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{event.title}</h1>
            <p className="text-muted-foreground mt-2">{event.description}</p>
          </div>
          {isReadOnly ? (
            <Badge variant="secondary" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Read-only View
            </Badge>
          ) : (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Attendance Active
            </Badge>
          )}
        </div>

        {/* Event Details */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
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
            </div>
            
            {!isAttendanceEnabled && event.status !== "completed" && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Attendance marking is only available on the event date ({new Date(event.date).toLocaleDateString()}).
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{presentCount}</div>
              <div className="text-sm text-green-700">Present</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{absentCount}</div>
              <div className="text-sm text-red-700">Absent</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">{notMarkedCount}</div>
              <div className="text-sm text-gray-700">Not Marked</div>
            </CardContent>
          </Card>
        </div>

        {/* Participants List */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Participants ({participants.length})
              </CardTitle>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by team name or UID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground">
                Showing {filteredParticipants.length} of {participants.length} participants
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredParticipants.length === 0 && searchQuery ? (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No participants found</h3>
                <p className="text-muted-foreground">
                  No participants match your search for "{searchQuery}". Try searching by team name or UID.
                </p>
              </div>
            ) : (
              filteredParticipants.map((participant) => (
              <div
                key={participant.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getAttendanceIcon(participant.attended)}
                    <div>
                      <div className="font-medium text-foreground">{participant.teamName}</div>
                      <div className="text-sm text-muted-foreground">UID: {participant.uid}</div>
                    </div>
                  </div>
                  {getAttendanceBadge(participant.attended)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">Contact Information</div>
                    <div className="text-sm text-muted-foreground">
                      <div>Email: {participant.email}</div>
                      <div>Phone: {participant.phone}</div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`dl-${participant.id}`} className="text-sm font-medium">
                      Driving License No. (Optional)
                    </Label>
                    <Input
                      id={`dl-${participant.id}`}
                      value={participant.dlNo || ""}
                      onChange={(e) => handleDlNoChange(participant.id, e.target.value)}
                      placeholder="Enter DL number"
                      disabled={isReadOnly}
                      className="mt-1"
                    />
                  </div>
                </div>

                {!isReadOnly && (
                  <div className="flex gap-2">
                    <Button
                      variant={participant.attended === true ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAttendanceChange(participant.id, true)}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Present
                    </Button>
                    <Button
                      variant={participant.attended === false ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => handleAttendanceChange(participant.id, false)}
                      className="flex items-center gap-2"
                    >
                      <XCircle className="h-4 w-4" />
                      Absent
                    </Button>
                  </div>
                )}
              </div>
            ))
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        {!isReadOnly && (
          <div className="flex justify-end">
            <Button onClick={handleSaveAttendance} disabled={saving} className="gap-2">
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Attendance"}
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AttendanceMarkingPage;