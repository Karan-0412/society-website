import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login" ;
import Signup from "./pages/Signup" ;
import SignIndex from "./pages/Signin/SignIndex" ;
import TeamIndex from "./pages/TeamIndex" ;
import JoinTeam from "./pages/JoinTeam";
import PForgotPassword from "./pages/forgotPassword.tsx" ;
import ResetPassword from "./pages/resetPassword" ;
import CoreIndex  from "./pages/CoreIndex.tsx";
import AttendanceEventsPage from "./pages/AttendanceEventsPage";
import AttendanceMarkingPage from "./pages/AttendanceMarkingPage";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path = "/SignIndex" element = {<SignIndex/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<TeamIndex />} />
            <Route path="/join-us" element={<JoinTeam />} />
            <Route path="/forgot-password" element={<PForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/core-dashboard" element={
              <ProtectedRoute>
                <CoreIndex />
              </ProtectedRoute>
            } />
            <Route path="/core-dashboard/attendance" element={
              <ProtectedRoute>
                <AttendanceEventsPage />
              </ProtectedRoute>
            } />
            <Route path="/core-dashboard/attendance/:eventId" element={
              <ProtectedRoute>
                <AttendanceMarkingPage />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
