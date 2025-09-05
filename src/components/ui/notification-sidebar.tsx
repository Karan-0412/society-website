import { Bell, X, Clock, User, Calendar, CheckCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
}

interface NotificationSidebarProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAllRead: () => void;
  onRemoveNotification: (id: string) => void;
}

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "warning":
      return <Clock className="h-4 w-4 text-warning" />;
    case "error":
      return <X className="h-4 w-4 text-destructive" />;
    default:
      return <Bell className="h-4 w-4 text-primary" />;
  }
};

export function NotificationSidebar({ 
  notifications, 
  onClose, 
  onMarkAllRead, 
  onRemoveNotification 
}: NotificationSidebarProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Sidebar side="right" className="w-80 border-l animate-slide-in-right shadow-strong">
      <SidebarHeader className="border-b p-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 animate-scale-in" />
            <h2 className="text-lg font-semibold animate-fade-in">Notifications</h2>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="h-5 text-xs animate-scale-in">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose} 
            className="h-8 w-8 p-0 hover-scale transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-0">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2">Recent</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0">
              {notifications.map((notification, index) => (
                <div key={notification.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <SidebarMenuItem>
                    <div 
                      className={`w-full p-4 hover:bg-muted/50 transition-all duration-300 cursor-pointer group hover:translate-x-1 ${
                        !notification.read ? 'bg-muted/25 border-l-2 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`text-sm font-medium leading-tight flex-1 ${
                              !notification.read ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                            {notification.title}
                            </h4>
                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0 animate-pulse" />
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-destructive/10 hover:text-destructive hover-scale"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onRemoveNotification(notification.id);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SidebarMenuItem>
                  {index < notifications.length - 1 && (
                    <Separator className="mx-4" />
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <Bell className="h-12 w-12 text-muted-foreground mb-4 animate-scale-in" />
            <h3 className="text-lg font-semibold text-foreground mb-2 animate-fade-in" style={{ animationDelay: '200ms' }}>No notifications</h3>
            <p className="text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '400ms' }}>
              You're all caught up! Check back later for new updates.
            </p>
          </div>
        )}
      </SidebarContent>

      {notifications.length > 0 && unreadCount > 0 && (
        <div className="border-t p-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Button 
            variant="outline" 
            className="w-full hover-scale transition-all duration-200 hover:bg-primary hover:text-primary-foreground" 
            size="sm"
            onClick={onMarkAllRead}
          >
            Mark all as read
          </Button>
        </div>
      )}
    </Sidebar>
  );
}