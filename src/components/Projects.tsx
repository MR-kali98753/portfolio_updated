import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { ProjectFilter } from "./ProjectFilter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal, MagneticElement } from "@/components/MotionGraphics";
import { ParallaxWrapper } from "@/components/ParallaxWrapper";

export const Projects = () => {
  const { toast } = useToast();
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation(0.2);
  const [activeCategory, setActiveCategory] = useState("All");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      title: "SaaS Application",
      description: "A comprehensive Software-as-a-Service platform built with React Native Expo, featuring subscription management, user dashboards, and analytics.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      technologies: ["React Native", "Expo", "Firebase", "Stripe", "Redux"],
      category: "Mobile",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "AR Jewelry App",
      description: "Augmented Reality application for trying on jewelry virtually. Uses ARKit/ARCore for realistic 3D rendering and placement.",
      image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
      technologies: ["React Native", "Expo", "ARKit", "Three.js", "Blender"],
      category: "Mobile",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "AI Voice Calling App",
      description: "Intelligent voice calling application with AI-powered transcription, translation, and voice cloning capabilities.",
      image: "https://images.unsplash.com/photo-1551817958-d9d86fb29431?auto=format&fit=crop&w=800&q=80",
      technologies: ["React Native", "Expo", "WebRTC", "TensorFlow.js", "Node.js"],
      category: "Mobile",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Namaste Rides (Ongoing)",
      description: "Ride-sharing platform currently in development. Features real-time tracking, payment integration, and driver/passenger matching.",
      image: "https://images.unsplash.com/photo-1593062091239-7d55d12b43fd?auto=format&fit=crop&w=800&q=80",
      technologies: ["React Native", "Expo", "Socket.IO", "Google Maps", "MongoDB"],
      category: "Mobile",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include product management, cart functionality, and secure payments.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "TailwindCSS"],
      category: "Full Stack",
      liveUrl: "https://beta-commerce.vercel.app",
      githubUrl: "https://github.com/MR-kali98753/Beta-commerce"
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80",
      technologies: ["Next.js", "TypeScript", "Socket.io", "MongoDB", "Framer Motion"],
      category: "Frontend",
      liveUrl: "https://taskx.vercel.app",
      githubUrl: ""
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "TypeScript", "OpenWeather API", "Chart.js", "CSS3"],
      category: "Frontend",
      liveUrl: "https://weatherlinklive.vercel.app",
      githubUrl: ""
    },
    {
      title: "Radically Redefine Gaming",
      description: "Analytics dashboard for social media metrics with data visualization, automated reporting, and multi-platform integration.",
      image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
      technologies: ["Vue.js", "Python", "FastAPI", "D3.js", "Redis"],
      category: "Full Stack",
      liveUrl: "https://zentry-iota-six.vercel.app/",
      githubUrl: ""
    }
  ];

  const categories = ["All", "Mobile", "Full Stack", "Frontend"];
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const handleProjectAction = (action: string, projectTitle: string) => {
    // Special handling for mobile projects
    if (action === "Live Demo" && projectTitle.includes("(Ongoing)")) {
      toast({
        title: `Project In Development`,
        description: `${projectTitle} is currently in development and not yet available for demo.`,
      });
      return;
    }
    
    // Special handling for placeholder URLs
    if ((action === "Live Demo" || action === "Source Code") && 
        (projectTitle.includes("SaaS Application") || 
         projectTitle.includes("AR Jewelry App") || 
         projectTitle.includes("AI Voice Calling App") || 
         projectTitle.includes("Namaste Rides"))) {
      toast({
        title: `${action} Unavailable`,
        description: `Demo and source code for ${projectTitle} will be available soon. Contact me for more information.`,
      });
      return;
    }
    
    toast({
      title: `${action} ${projectTitle}`,
      description: `Opening ${action.toLowerCase()} for ${projectTitle}...`,
    });
  };

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.4, 0.2]);

  return (
    <section id="projects" className="py-20 px-6 bg-surface/50 relative overflow-hidden">
      {/* Enhanced Dynamic Background with Parallax */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY, opacity: backgroundOpacity }}
      >
        {/* Animated mesh gradient */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(45deg, hsl(var(--primary) / 0.05) 0%, transparent 50%),
              linear-gradient(-45deg, hsl(var(--accent) / 0.05) 0%, transparent 50%),
              radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, hsl(var(--secondary) / 0.1), transparent 60%)
            `,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Enhanced Floating geometric shapes with motion */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-30"
              style={{
                width: `${10 + Math.random() * 20}px`,
                height: `${10 + Math.random() * 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.cos(i) * 30, 0],
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
      
      <ParallaxWrapper speed={0.3} direction="up">
        <div className="max-w-7xl mx-auto relative z-10" ref={projectsRef}>
          <ScrollReveal direction="up" delay={0.1}>
            <motion.div 
              className={`text-center mb-16 transition-all duration-1000 ${
                projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={projectsVisible ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                A showcase of my recent work and personal projects
              </p>
              {activeCategory === "Mobile" && (
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg max-w-2xl mx-auto">
                  <p className="text-blue-300 flex items-center justify-center gap-2">
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                    Featured React Native Expo Applications
                  </p>
                </div>
              )}
            </motion.div>
          </ScrollReveal>

        <ProjectFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredProject === index;
            return (
              <ScrollReveal key={project.title} direction="up" delay={index * 0.15}>
                <MagneticElement strength={20}>
                  <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.9 }}
                    animate={projectsVisible ? { y: 0, opacity: 1, scale: 1 } : { y: 50, opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <Card 
                      className={`glass-card overflow-hidden hover-glow group relative ${project.category === "Mobile" ? 'border-l-4 border-blue-500' : ''}`}
                      style={{
                        transform: isHovered ? `rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)` : 'rotateX(0deg) rotateY(0deg)',
                        transformStyle: 'preserve-3d'
                      }}
                      onMouseEnter={() => setHoveredProject(index)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
                    style={{
                      filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)'
                    }}
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(45deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.2))`
                    }}
                  />
                  
                  {/* Interactive light effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, hsl(var(--primary) / 0.3), transparent 60%)`
                    }}
                  />
                  
                  {/* Mobile project indicator */}
                  {project.category === "Mobile" && (
                    <div className="absolute top-2 left-2">
                      <div className="flex items-center gap-1 bg-blue-500/20 px-2 py-1 rounded-full border border-blue-500/30">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-blue-300 font-medium">Expo</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="bg-surface/90 backdrop-blur-sm hover:bg-surface"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectAction("Preview", project.title);
                        // Only open URL if it's not a placeholder
                        if (project.liveUrl !== "#") {
                          window.open(project.liveUrl, '_blank');
                        }
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="bg-surface/90 backdrop-blur-sm hover:bg-surface"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectAction("GitHub", project.title);
                        // Only open URL if it's not a placeholder
                        if (project.githubUrl !== "#") {
                          window.open(project.githubUrl, '_blank');
                        }
                      }}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-text-primary group-hover:gradient-text transition-all duration-300">
                      {project.title}
                    </h3>
                    {project.category === "Mobile" && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        Mobile
                      </span>
                    )}
                  </div>
                  
                  <p className="text-text-secondary leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge 
                        key={tech}
                        variant="outline" 
                        className="border-border bg-surface-light/30 text-text-secondary hover:bg-surface-light/50 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 flex-1"
                      onClick={() => {
                        handleProjectAction("Live Demo", project.title);
                        // Only open URL if it's not a placeholder
                        if (project.liveUrl !== "#") {
                          window.open(project.liveUrl, '_blank');
                        }
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-border bg-surface/50 backdrop-blur-sm hover:bg-surface/70"
                      onClick={() => {
                        handleProjectAction("Source Code", project.title);
                        // Only open URL if it's not a placeholder
                        if (project.githubUrl !== "#") {
                          window.open(project.githubUrl, '_blank');
                        }
                      }}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </MagneticElement>
        </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal direction="up" delay={0.3}>
          <motion.div 
            className="text-center mt-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="border-border bg-surface/50 backdrop-blur-sm hover:bg-surface/70 relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center">
                View All Projects
                <ExternalLink className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </motion.div>
        </ScrollReveal>
      </div>
      </ParallaxWrapper>
    </section>
  );
};