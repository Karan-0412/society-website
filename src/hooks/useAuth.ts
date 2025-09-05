// hooks/useAuth.ts
import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
    const token = localStorage.getItem("token"); // LOGIN must set this exact key
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  return { isAuthenticated, loading };
}
