import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EventParticipant {
  id: string;
  name: string;
  email: string;
  attended: boolean | null;
}

interface Event {
  id: string;
  title: string;
  participants: EventParticipant[];
}

interface AttendanceDialogProps {
  event: Event;
  onUpdateAttendance: (eventId: string, participants: EventParticipant[]) => void;
}

const AttendanceDialog = ({ event, onUpdateAttendance }: AttendanceDialogProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [participants, setParticipants] = useState<EventParticipant[]>(event.participants);

  const handleAttendanceChange = (participantId: string, attended: boolean) => {
    setParticipants(prev =>
      prev.map(p =>
        p.id === participantId ? { ...p, attended } : p
      )
    );
  };

  const handleSaveAttendance = () => {
    onUpdateAttendance(event.id, participants);
    setIsOpen(false);
    toast({
      title: "Attendance Updated",
      description: `Attendance has been recorded for ${event.title}`,
    });
  };

  const presentCount = participants.filter(p => p.attended === true).length;
  const absentCount = participants.filter(p => p.attended === false).length;
  const notMarkedCount = participants.filter(p => p.attended === null).length;

  const getAttendanceIcon = (attended: boolean | null) => {
    if (attended === true) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (attended === false) return <XCircle className="h-4 w-4 text-red-600" />;
    return <Clock className="h-4 w-4 text-muted-foreground" />;
  };

  const getAttendanceBadge = (attended: boolean | null) => {
    if (attended === true) return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Present</Badge>;
    if (attended === false) return <Badge variant="destructive">Absent</Badge>;
    return <Badge variant="secondary">Not Marked</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <UserCheck className="h-4 w-4" />
          Mark Attendance
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Attendance - {event.title}
          </DialogTitle>
          <DialogDescription>
            Mark attendance for event participants. Total participants: {participants.length}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg border">
              <div className="text-2xl font-bold text-green-600">{presentCount}</div>
              <div className="text-sm text-green-700">Present</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg border">
              <div className="text-2xl font-bold text-red-600">{absentCount}</div>
              <div className="text-sm text-red-700">Absent</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg border">
              <div className="text-2xl font-bold text-gray-600">{notMarkedCount}</div>
              <div className="text-sm text-gray-700">Not Marked</div>
            </div>
          </div>

          {/* Participants List */}
          <div className="space-y-3">
            <h4 className="font-medium">Participants</h4>
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getAttendanceIcon(participant.attended)}
                  <div>
                    <div className="font-medium">{participant.name}</div>
                    <div className="text-sm text-muted-foreground">{participant.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {getAttendanceBadge(participant.attended)}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`present-${participant.id}`}
                        checked={participant.attended === true}
                        onCheckedChange={(checked) => 
                          handleAttendanceChange(participant.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`present-${participant.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Present
                      </label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAttendanceChange(participant.id, false)}
                      className={`h-8 px-2 ${participant.attended === false ? 'bg-red-100 text-red-800' : ''}`}
                    >
                      Absent
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAttendance} className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Save Attendance
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceDialog;