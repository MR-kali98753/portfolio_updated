import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Rocket, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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

  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-30">
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
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/20 animate-float"
              style={{
                width: `${2 + Math.random() * 6}px`,
                height: `${2 + Math.random() * 6}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto relative z-10"
        ref={aboutRef}
      >
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            aboutVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Passionate developer with a love for creating beautiful, functional
            web experiences
          </p>
        </div>

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

          <div className="relative">
            <div className="w-80 h-80 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 animate-pulse" />
              <div className="absolute inset-4 bg-surface rounded-full flex items-center justify-center">
                {/* Circular Progress Bar */}
                <div style={{ width: '160px', height: '160px' }}>
                  <CircularProgressbar
                    value={progress}
                    text={`${progress}%`}
                    styles={buildStyles({
                      textColor: 'var(--primary-foreground)',
                      trailColor: 'rgba(255, 255, 255, 0.2)',
                      pathColor: 'var(--primary-foreground)',
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            const isHovered = hoveredCard === index;
            return (
              <Card
                key={highlight.title}
                className="glass-card p-6 hover-glow group cursor-pointer relative overflow-hidden"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  transform: isHovered
                    ? "translateY(-5px) scale(1.05)"
                    : "translateY(0) scale(1)",
                  transition:
                    "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Interactive background effect */}
                <div
                  className="absolute inset-0 bg-gradient-primary opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  style={{
                    transform: `rotate(${mousePosition.x * 5}deg) scale(${
                      1 + mousePosition.y * 0.2
                    })`,
                  }}
                />

                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                  <div
                    className="p-3 rounded-full bg-gradient-primary group-hover:animate-pulse transition-all duration-300"
                    style={{
                      transform: isHovered
                        ? `rotateY(${mousePosition.x * 10}deg) rotateX(${mousePosition.y * 10}deg)`
                        : "rotateY(0deg) rotateX(0deg)",
                    }}
                  >
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-text-primary group-hover:gradient-text transition-all duration-300">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed group-hover:text-text-primary/80 transition-colors duration-300">
                    {highlight.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
