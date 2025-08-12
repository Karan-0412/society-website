import { Link } from "react-router-dom";
import { Users, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">Society Hub</span>
            </div>
            <p className="text-muted-foreground">
              Connecting students, creating opportunities, and building a stronger community together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-smooth">About Us</Link></li>
              <li><Link to="/events" className="text-muted-foreground hover:text-primary transition-smooth">Events</Link></li>
              <li><Link to="/gallery" className="text-muted-foreground hover:text-primary transition-smooth">Gallery</Link></li>
              <li><Link to="/team" className="text-muted-foreground hover:text-primary transition-smooth">Our Team</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/announcements" className="text-muted-foreground hover:text-primary transition-smooth">Announcements</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-primary transition-smooth">Downloads</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-smooth">FAQ</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-smooth">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@societyhub.org</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Student Center, Room 204</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 mt-4">
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Society Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;