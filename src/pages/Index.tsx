import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import EventsSection from "@/components/sections/EventsSection";
import AnnouncementBanner from "@/components/sections/AnnouncementBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBanner />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
