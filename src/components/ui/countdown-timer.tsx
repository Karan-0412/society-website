import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetDate: string;
  eventName?: string;
  className?: string;
}

const CountdownTimer = ({ targetDate, eventName = "Next Event", className = "" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    isLive: false,
    isPast: false
  });

  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(targetDate);
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft({
          days,
          hours,
          minutes,
          isLive: false,
          isPast: false
        });
      } else if (difference > -3600000) { // Within 1 hour after start time
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          isLive: true,
          isPast: false
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          isLive: false,
          isPast: true
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isPast) {
    return null; // Don't show if event is past
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Clock className="h-5 w-5 text-primary" />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-muted-foreground">{eventName}</span>
        <div 
          className="flex items-center space-x-2 font-mono text-lg font-bold"
          aria-live="polite"
          aria-label={`Time remaining: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes`}
        >
          {timeLeft.isLive ? (
            <span className="text-accent animate-pulse">🔴 LIVE NOW</span>
          ) : (
            <>
              <span className="bg-primary/10 px-2 py-1 rounded text-primary">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-muted-foreground">:</span>
              <span className="bg-primary/10 px-2 py-1 rounded text-primary">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-muted-foreground">:</span>
              <span className="bg-primary/10 px-2 py-1 rounded text-primary">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;