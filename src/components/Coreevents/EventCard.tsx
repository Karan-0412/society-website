import { Calendar, Clock, MapPin, Users, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onRemove: (eventId: string) => void;
}

const EventCard = ({ event, onEdit, onRemove }: EventCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-primary/10 text-primary";
      case "ongoing":
        return "bg-success/10 text-success";
      case "completed":
        return "bg-muted text-muted-foreground";
      case "cancelled":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "meeting":
        return "bg-accent/10 text-accent-foreground";
      case "training":
        return "bg-warning/10 text-warning";
      case "social":
        return "bg-primary/10 text-primary";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="group hover:shadow-medium transition-all duration-200 border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={getStatusColor(event.status)} variant="outline">
                {event.status}
              </Badge>
              <Badge className={getCategoryColor(event.category)} variant="outline">
                {event.category}
              </Badge>
            </div>
            <CardTitle className="text-xl font-semibold text-foreground line-clamp-2">
              {event.title}
            </CardTitle>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onEdit(event)} className="cursor-pointer">
                <Edit className="h-4 w-4 mr-2" />
                Edit Event
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onRemove(event.id)} 
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Event
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-2">{event.description}</p>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-foreground font-medium">{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-foreground">{event.time}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-foreground truncate">{event.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-foreground">
                {event.attendees}
                {event.maxAttendees && ` / ${event.maxAttendees}`}
                {" attendees"}
              </span>
            </div>
            
            {event.maxAttendees && (
              <div className="text-xs text-muted-foreground">
                {Math.round((event.attendees / event.maxAttendees) * 100)}% full
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;