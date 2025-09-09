import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { ProjectFilter } from "./ProjectFilter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";

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

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const handleProjectAction = (action: string, projectTitle: string) => {
    toast({
      title: `${action} ${projectTitle}`,
      description: `Opening ${action.toLowerCase()} for ${projectTitle}...`,
    });
  };

  return (
    <section id="projects" className="py-20 px-6 bg-surface/50 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20">
        {/* Animated mesh gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(45deg, hsl(var(--primary) / 0.05) 0%, transparent 50%),
              linear-gradient(-45deg, hsl(var(--accent) / 0.05) 0%, transparent 50%),
              radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, hsl(var(--secondary) / 0.1), transparent 60%)
            `,
            transition: 'background 0.5s ease'
          }}
        />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute opacity-30 animate-float"
              style={{
                width: `${10 + Math.random() * 20}px`,
                height: `${10 + Math.random() * 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10" ref={projectsRef}>
        <div className={`text-center mb-16 transition-all duration-1000 ${
          projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </div>

        <ProjectFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredProject === index;
            return (
              <Card 
                key={project.title}
                className="glass-card overflow-hidden hover-glow group relative"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  transform: isHovered ? `translateY(-10px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)` : 'translateY(0) rotateX(0deg) rotateY(0deg)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="bg-surface/90 backdrop-blur-sm hover:bg-surface"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectAction("Preview", project.title);
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
                      }}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-text-primary group-hover:gradient-text transition-all duration-300">
                    {project.title}
                  </h3>
                  
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
                        window.open(project.liveUrl, '_blank');
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
                        window.open(project.githubUrl, '_blank');
                      }}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-border bg-surface/50 backdrop-blur-sm hover:bg-surface/70">
            View All Projects
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};