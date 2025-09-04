import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NotificationButtonProps {
  hasNotifications?: boolean;
  onClick?: () => void;
}

const NotificationButton = ({ hasNotifications = false, onClick }: NotificationButtonProps) => {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="h-9 w-9 p-0 relative hover-scale transition-all duration-200 hover:bg-muted/80" 
      onClick={onClick}
    >
      <Bell className="h-4 w-4 transition-transform duration-200 hover:rotate-12" />
      {hasNotifications && (
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full border-2 border-background animate-pulse animate-scale-in" />
      )}
      <span className="sr-only">Notifications</span>
    </Button>
  );
};

export default NotificationButton;