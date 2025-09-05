import sarahImage from "@/assets/TeamImages/team-sarah.jpg";
import mikeImage from "@/assets/TeamImages/team-mike.jpg";
import alexImage from "@/assets/TeamImages/team-alex.jpg";
import davidImage from "@/assets/TeamImages/team-david.jpg";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  funFact: string;
  image: string;
  social: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Creative Director",
    bio: "Sarah turns wild ideas into beautiful realities. She's the wizard behind our most stunning designs, with an uncanny ability to make colors sing and layouts dance.",
    funFact: "Can solve any design problem with exactly 3 Post-it notes and a sharpie",
    image: sarahImage,
    social: {
      linkedin: "https://linkedin.com/in/sarahchen",
      instagram: "https://instagram.com/sarahdesigns",
      github: "https://github.com/sarahchen"
    }
  },
  {
    name: "Mike Rodriguez",
    role: "Senior Developer",
    bio: "Mike is our code whisperer who speaks fluent JavaScript, Python, and sarcasm. He turns coffee into code and somehow makes our wildest app dreams come true.",
    funFact: "Has never met a bug he couldn't charm with debugging rubber duck conversations",
    image: mikeImage,
    social: {
      linkedin: "https://linkedin.com/in/mikerodriguez",
      github: "https://github.com/mikecodes",
      instagram: "https://instagram.com/mike_codes"
    }
  },
  {
    name: "Alex Thompson",
    role: "Product Manager",
    bio: "Alex is our master organizer and deadline juggler. She keeps us all sane, on track, and surprisingly well-caffeinated. The true MVP of our chaos management.",
    funFact: "Maintains color-coded spreadsheets for her spreadsheets and somehow finds it relaxing",
    image: alexImage,
    social: {
      linkedin: "https://linkedin.com/in/alexthompson",
      instagram: "https://instagram.com/alexorganizes",
      github: "https://github.com/alexthompson"
    }
  },
  {
    name: "David Kim",
    role: "Marketing Strategist",
    bio: "David makes people fall in love with our products before they even know they need them. He's part data scientist, part mind reader, and full-time growth hacker.",
    funFact: "Can predict viral trends by analyzing his grandmother's Facebook activity",
    image: davidImage,
    social: {
      linkedin: "https://linkedin.com/in/davidkim",
      instagram: "https://instagram.com/davidgrowth",
      github: "https://github.com/davidkim"
    }
  }
];