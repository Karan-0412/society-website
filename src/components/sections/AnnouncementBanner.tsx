import { useState } from "react";
import { X, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const evt = axios.get("/events/")

  if (!isVisible) return null;

  return (
    <div className="bg-accent text-accent-foreground py-1.5 px-3.5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      </div>

      <div className="container mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3 flex-1">
          <Megaphone className="h-5 w-5 animate-pulse" />
          <p className="text-sm md:text-base font-medium">
          <strong>Registration Open:</strong> Annual Tech Conference 2024 - Early bird pricing ends March 10th!
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-accent-foreground hover:bg-accent-light/20 hidden sm:flex"
          >
            Register Now
          </Button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-accent-light/20 rounded-md transition-smooth"
            aria-label="Close announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;