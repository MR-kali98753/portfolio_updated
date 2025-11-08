import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Rocket, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal, MagneticElement } from "@/components/MotionGraphics";
import { ParallaxWrapper } from "@/components/ParallaxWrapper";

// Import technology icons from react-icons
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaGoogle, FaMobile } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiGraphql,
  SiExpress,
  SiSupabase,
  SiSanity,
} from "react-icons/si";

// No icon for Sanity in react-icons, so using a generic one

export const About = () => {
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation(0.2);
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation(0.3);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [progress, setProgress] = useState(75); // Example progress value

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Technologies (using react-icons instead of SVG paths)
  const skills = [
    { name: "React", Icon: FaReact },
    { name: "TypeScript", Icon: SiTypescript },
    { name: "Node.js", Icon: FaNodeJs },
    { name: "Python", Icon: FaPython },
    { name: "Next.js", Icon: SiNextdotjs },
    { name: "TailwindCSS", Icon: SiTailwindcss },
    { name: "Sanity", Icon: SiSanity }, // Using MongoDB icon as a placeholder
    { name: "MongoDB", Icon: SiMongodb },
    { name: "Google Cloud", Icon: FaGoogle }, // Using Google icon
    { name: "Docker", Icon: FaDocker },
    { name: "Supabase", Icon: SiSupabase },
    { name: "React Native", Icon: FaMobile },
    { name: "REST APIs", Icon: SiExpress }, // example icon (Express for APIs)
  ];

  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description:
        "Writing maintainable, scalable, and efficient code that stands the test of time.",
    },
    {
      icon: Palette,
      title: "Design-Focused",
      description:
        "Bridging the gap between design and development with pixel-perfect implementations.",
    },
    {
      icon: Rocket,
      title: "Performance",
      description:
        "Optimizing applications for speed, accessibility, and exceptional user experience.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Working effectively with cross-functional teams to deliver impactful solutions.",
    },
  ];

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      {/* Enhanced Dynamic Background with Parallax */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY, opacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at ${50 + mousePosition.x * 10}% ${
              50 + mousePosition.y * 10
            }%, hsl(var(--primary) / 0.1), transparent 50%),
              radial-gradient(circle at ${30 + mousePosition.x * -15}% ${
              70 + mousePosition.y * -15
            }%, hsl(var(--accent) / 0.08), transparent 40%)
            `,
            transition: "background 0.3s ease",
          }}
        />
        {/* Enhanced Floating particles with motion */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/20"
              style={{
                width: `${2 + Math.random() * 6}px`,
                height: `${2 + Math.random() * 6}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        {/* Animated grid overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <ParallaxWrapper speed={0.2} direction="up">
        <div
          className="max-w-7xl mx-auto relative z-10"
          ref={aboutRef}
        >
          <ScrollReveal direction="up" delay={0.1}>
            <div
              className={`text-center mb-16 transition-all duration-1000 ${
                aboutVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <motion.h2 
                className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={aboutVisible ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                About <span className="gradient-text">Me</span>
              </motion.h2>
              <motion.p 
                className="text-xl text-text-secondary max-w-3xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={aboutVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Passionate developer with a love for creating beautiful, functional
                web experiences
              </motion.p>
            </div>
          </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-text-primary mb-4">
              Crafting Digital Experiences
            </h3>
            <p className="text-text-secondary leading-relaxed">
              I'm a passionate full-stack developer with over 3 years of
              experience creating digital solutions that make a difference. My
              journey began with curiosity about how things work on the web, and
              has evolved into a career dedicated to building exceptional user
              experiences.
            </p>
            <p className="text-text-secondary leading-relaxed">
              I specialize in modern web technologies, focusing on React,
              TypeScript, and Node.js ecosystems. I believe in writing clean,
              maintainable code and creating applications that are not just
              functional, but delightful to use.
            </p>

            {/* Skills with icons */}
            <div className="space-y-4" ref={skillsRef}>
              <h4 className="text-lg font-medium text-text-primary">
                Technologies I work with:
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => {
                  const Icon = skill.Icon;
                  return (
                    <Badge
                      key={skill.name}
                      variant="secondary"
                      className={`flex items-center gap-2 bg-surface-light/50 backdrop-blur-sm border-border text-text-primary hover:bg-surface-light/70 transition-all duration-500 cursor-pointer hover:scale-105 ${
                        skillsVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-5"
                      }`}
                      style={{
                        transitionDelay: `${index * 0.1}s`,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                      {skill.name}
                    </Badge>
                  )
                })}
              </div>
            </div>
          </div>

          <MagneticElement strength={20}>
            <motion.div 
              className="relative"
              initial={{ scale: 0.8, opacity: 0, rotate: -180 }}
              animate={aboutVisible ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.8, opacity: 0, rotate: -180 }}
              transition={{ duration: 1, delay: 0.4, type: "spring" }}
            >
              <div className="w-80 h-80 mx-auto relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-primary rounded-full opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="absolute inset-4 bg-surface rounded-full flex items-center justify-center">
                  {/* Circular Progress Bar */}
                  <motion.div 
                    style={{ width: '160px', height: '160px' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <CircularProgressbar
                      value={progress}
                      text={`${progress}%`}
                      styles={buildStyles({
                        textColor: 'var(--primary-foreground)',
                        trailColor: 'rgba(255, 255, 255, 0.2)',
                        pathColor: 'var(--primary-foreground)',
                      })}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </MagneticElement>
        </div>

        {/* Highlights with enhanced animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            const isHovered = hoveredCard === index;
            return (
              <ScrollReveal key={highlight.title} direction="up" delay={index * 0.1}>
                <MagneticElement strength={15}>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={aboutVisible ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                  >
                    <Card
                      className="glass-card p-6 hover-glow group cursor-pointer relative overflow-hidden"
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Enhanced Interactive background effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-primary opacity-30"
                        animate={{
                          opacity: isHovered ? 0.5 : 0.3,
                          scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: `linear-gradient(${
                            45 + mousePosition.x * 10
                          }deg, hsl(var(--primary)), hsl(var(--accent)))`,
                        }}
                      />

                      <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                        <motion.div
                          className="p-3 rounded-full bg-gradient-primary"
                          animate={{
                            rotate: isHovered ? 360 : 0,
                            scale: isHovered ? 1.2 : 1,
                          }}
                          transition={{ duration: 0.5 }}
                          whileHover={{ rotate: 180 }}
                        >
                          <Icon className="h-6 w-6 text-primary-foreground" />
                        </motion.div>
                        <motion.h3 
                          className="font-semibold text-text-primary group-hover:gradient-text transition-all duration-300"
                          animate={{
                            scale: isHovered ? 1.1 : 1,
                          }}
                        >
                          {highlight.title}
                        </motion.h3>
                        <p className="text-sm text-text-secondary leading-relaxed group-hover:text-text-primary/80 transition-colors duration-300">
                          {highlight.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </MagneticElement>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
      </ParallaxWrapper>
    </section>
  );
};
