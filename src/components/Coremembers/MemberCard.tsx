import { User, Mail, Phone, MoreVertical, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface MemberCardProps {
  member: Member;
  onEdit: (member: Member) => void;
  onRemove: (memberId: string) => void;
}

const MemberCard = ({ member, onEdit, onRemove }: MemberCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-destructive/10 text-destructive";
      case "manager":
        return "bg-accent/10 text-accent-foreground";
      case "member":
        return "bg-primary/10 text-primary";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="group hover:shadow-medium transition-all duration-200 border border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <Avatar className="h-12 w-12 shadow-soft">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {member.name}
                </h3>
                <Badge 
                  variant={member.status === "active" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {member.status}
                </Badge>
              </div>
              
              <Badge className={getRoleColor(member.role)} variant="outline">
                {member.role}
              </Badge>
              
              <div className="mt-3 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{member.email}</span>
                </div>
                
                {member.phone && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{member.phone}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Joined {member.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onEdit(member)} className="cursor-pointer">
                <Edit className="h-4 w-4 mr-2" />
                Edit Member
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onRemove(member.id)} 
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;