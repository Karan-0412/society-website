import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Lightbulb, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: "Mission Driven",
      description: "Empowering students to reach their full potential through meaningful connections and opportunities."
    },
    {
      icon: Heart,
      title: "Community First",
      description: "Building an inclusive environment where every voice matters and everyone belongs."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Fostering creativity and forward-thinking solutions to real-world challenges."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Bringing together diverse perspectives to create impactful change in our community."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } }
            }}
          >
            <div>
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6"
                variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              >
                About <span className="text-gradient">Our Society</span>
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground leading-relaxed mb-6"
                variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              >
                Since our founding in 2020, we've been dedicated to creating meaningful connections and opportunities 
                for students. Our vibrant community spans diverse backgrounds, united by a shared passion for learning, 
                growth, and positive impact.
              </motion.p>
              <motion.p
                className="text-muted-foreground leading-relaxed mb-8"
                variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              >
                From organizing inspiring events to providing valuable resources, we're committed to supporting 
                every member's journey. Join us in building a stronger, more connected campus community.
              </motion.p>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[{value: "4+", label: "Years Active", color: "text-primary", bg: "bg-primary/5 border border-primary/10"},
                {value: "250+", label: "Members", color: "text-accent", bg: "bg-accent/5 border border-accent/10"}].map((item) => (
                <motion.div
                  key={item.label}
                  className={`text-center p-4 rounded-lg ${item.bg}`}
                  variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                  whileHover={{ scale: 1.04 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </motion.div>
              ))}
            </div>

            <Button size="lg" className="group">
              Learn More About Us
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
            </Button>
          </motion.div>

          {/* Right Content - Values Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.12 } }
            }}
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div key={index} variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
                  <Card className="group hover:shadow-lg transition-smooth border-border/50 hover:border-primary/20">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-bounce">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-smooth">
                          {value.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;