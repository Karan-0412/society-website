import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Calendar, Menu, X, Settings, Home, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/Coretheme/ThemeToggle";
import NotificationButton from "@/components/ui/notification-button";
import { NotificationSidebar } from "@/components/ui/notification-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: "overview" | "members" | "events" | "attendance" | "settings";
  onSectionChange: (section: "overview" | "members" | "events" | "attendance" | "settings") => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
}

const DashboardLayout = ({ children, activeSection, onSectionChange }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationSidebarOpen, setNotificationSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Event Created",
      message: "Tech Workshop 2024 has been scheduled for next week",
      time: "2 minutes ago",
      type: "info",
      read: false,
    },
    {
      id: "2",
      title: "Attendance Reminder",
      message: "Don't forget to mark attendance for today's meeting",
      time: "1 hour ago",
      type: "warning",
      read: false,
    },
    {
      id: "3",
      title: "New Member Added",
      message: "John Smith has been added to the team",
      time: "3 hours ago",
      type: "success",
      read: true,
    },
    {
      id: "4",
      title: "Event Updated",
      message: "Meeting room has been changed for tomorrow's session",
      time: "1 day ago",
      type: "info",
      read: true,
    },
  ]);
  const navigate = useNavigate();

  const hasNotifications = notifications.some(n => !n.read);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleRemoveNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const navigation = [
    { name: "Overview", icon: Home, key: "overview" as const },
    { name: "Team Members", icon: Users, key: "members" as const },
    { name: "Events", icon: Calendar, key: "events" as const },
    { name: "Attendance", icon: UserCheck, key: "attendance" as const },
    { name: "Settings", icon: Settings, key: "settings" as const },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border shadow-strong">
              <SidebarContent
                navigation={navigation}
                activeSection={activeSection}
                onSectionChange={onSectionChange}
                onClose={() => setSidebarOpen(false)}
                navigate={navigate}
              />
            </div>
          </div>
        )}

        {/* Desktop sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex min-h-0 flex-1 flex-col bg-card border-r border-border shadow-soft">
            <SidebarContent
              navigation={navigation}
              activeSection={activeSection}
              onSectionChange={onSectionChange}
              navigate={navigate}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64 flex-1 flex flex-col">
          {/* Top navigation for mobile */}
          <div className="flex h-16 items-center justify-between border-b border-border bg-card/50 backdrop-blur-sm px-4 lg:px-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Team Nexus</h1>
            <div className="flex items-center space-x-2">
              <NotificationButton 
                hasNotifications={hasNotifications}
                onClick={() => {
                  setNotificationSidebarOpen(true);
                }}
              />
              <ThemeToggle />
            </div>
          </div>

          {/* Page content */}
          <main className="p-4 lg:p-6 flex-1">
            {children}
          </main>
        </div>

        {/* Notification Sidebar */}
        {notificationSidebarOpen && (
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black/50" onClick={() => setNotificationSidebarOpen(false)} />
            <div className="fixed right-0 top-0 h-full">
              <NotificationSidebar 
                notifications={notifications}
                onClose={() => setNotificationSidebarOpen(false)}
                onMarkAllRead={handleMarkAllRead}
                onRemoveNotification={handleRemoveNotification}
              />
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
};

const SidebarContent = ({
  navigation,
  activeSection,
  onSectionChange,
  onClose,
  navigate,
}: {
  navigation: Array<{ name: string; icon: React.ElementType; key: "overview" | "members" | "events" | "attendance" | "settings" }>;
  activeSection: string;
  onSectionChange: (section: "overview" | "members" | "events" | "attendance" | "settings") => void;
  onClose?: () => void;
  navigate: (path: string) => void;
}) => {
  return (
    <>
      {/* Logo and close button */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-primary rounded-lg" />
          <span className="text-lg font-bold text-foreground">Nexus</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <Button
            key={item.key}
            variant={activeSection === item.key ? "default" : "ghost"}
            className={cn(
              "w-full justify-start space-x-3 h-12",
              activeSection === item.key && "shadow-soft"
            )}
            onClick={() => {
              if (item.key === "attendance") {
                navigate("/attendance");
              } else {
                onSectionChange(item.key);
              }
              onClose?.();
            }}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-muted-foreground">Team Management v1.0</p>
          <div className="lg:block hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;