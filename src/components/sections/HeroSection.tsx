import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, Calendar, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import {Link} from "react-router-dom" ;
import { motion } from "framer-motion";
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Society members collaborating"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
          }
        }}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-accent font-medium"
            variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
          >
            <Trophy className="h-4 w-4" />
            <span>Empowering Students Since 2020</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } }}
          >
            Connect.{" "}
            <span className="text-gradient">Engage.</span>{" "}
            <span className="text-gradient">Grow.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } }}
          >
            Join our vibrant community of passionate students making a difference. 
            Discover events, build connections, and shape your future with us.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } }}
          >
            <Link to = "/join-us">
              <Button size="lg" className="hero-gradient shadow-glow hover:scale-105 transition-bounce group">
              Join Our Society
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
            </Button>
            </Link>
            <Button variant="outline" size="lg" className="group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-bounce" />
              Watch Our Story
            </Button>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 max-w-md mx-auto">
            {[
              { value: "250+", label: "Active Members", color: "text-primary" },
              { value: "50+", label: "Events Hosted", color: "text-accent" },
              { value: "15", label: "Awards Won", color: "text-success" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="text-center"
                variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className={`text-2xl md:text-3xl font-bold ${item.color}`}>{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;