import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

export const Hero = () => {
  const roles = [
    "Full Stack Developer",
    "Next.JS Specialist", 
    "UI/UX Designer",
    "Problem Solver"
  ];
  
  const displayText = useTypingEffect({ texts: roles, speed: 120, delay: 2500 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  // 🌟 Parallax layers
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -150]); // background moves slowly
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -250]); // accent layer
  const yFg = useTransform(scrollYProgress, [0, 1], [0, -400]); // foreground (content)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/assets/Abinas_Keshari_Singh_ATS_OnePage.docx"; // ✅ should be in public/assets
    link.download = "Abinas_Keshari_Singh_ATS_OnePage.docx";
    link.click();
  };

  const downloadApp = () => {
    const link = document.createElement("a");
    link.href = "/assets/application-f5c02e22-2deb-45d1-894f-065a2303dcab.apk";
    link.download = "AbinasKeshariSingh.apk";
    link.click();
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-surface-dark"
    >
      {/* 🔹 Background with parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{
          transform: `rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
          y: yBg,
        }}
      >
        {/* Deep Background Layer */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{ 
            transform: "translateZ(-100px)",
            backgroundImage: `
              linear-gradient(hsl(var(--border) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Mid Background Layer */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            transform: "translateZ(-50px)",
            backgroundImage: `
              linear-gradient(hsl(var(--border) / 0.5) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border) / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating 3D Geometric Shapes */}
        <div 
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary rounded-full opacity-20 animate-float blur-sm"
          style={{ 
            transform: `translateZ(20px) translateY(${mousePosition.y * 10}px) translateX(${mousePosition.x * 15}px) rotateX(${mousePosition.y * 20}deg) rotateY(${mousePosition.x * 20}deg)`,
            transition: "transform 0.2s ease-out"
          }}
        />
        <div 
          className="absolute bottom-32 right-32 w-24 h-24 bg-secondary/20 rounded-full animate-float blur-sm" 
          style={{ 
            animationDelay: "2s",
            transform: `translateZ(30px) translateY(${mousePosition.y * -12}px) translateX(${mousePosition.x * -18}px) rotateX(${mousePosition.y * -25}deg) rotateY(${mousePosition.x * -25}deg)`,
            transition: "transform 0.2s ease-out"
          }} 
        />
        <div 
          className="absolute top-1/2 left-10 w-16 h-16 bg-accent/20 rounded-full animate-float blur-sm" 
          style={{ 
            animationDelay: "4s",
            transform: `translateZ(40px) translateY(${mousePosition.y * 8}px) translateX(${mousePosition.x * 12}px) rotateX(${mousePosition.y * 30}deg) rotateY(${mousePosition.x * 30}deg)`,
            transition: "transform 0.2s ease-out"
          }} 
        />

        {/* Interactive 3D Cubes */}
        <div 
          className="absolute top-1/4 right-1/4 w-20 h-20 opacity-10"
          style={{
            transform: `translateZ(60px) rotateX(${45 + mousePosition.y * 30}deg) rotateY(${45 + mousePosition.x * 30}deg)`,
            background: "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))",
            transition: "transform 0.3s ease-out"
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-16 h-16 opacity-10"
          style={{
            transform: `translateZ(80px) rotateX(${-45 + mousePosition.y * -20}deg) rotateY(${-45 + mousePosition.x * -20}deg)`,
            background: "linear-gradient(-45deg, hsl(var(--secondary)), hsl(var(--primary)))",
            transition: "transform 0.3s ease-out"
          }}
        />

        {/* 3D Animated Lines */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-20" 
          style={{ transform: "translateZ(10px)" }}
        >
          <defs>
            <linearGradient id="lineGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d={`M0,${200 + mousePosition.y * 50} Q400,${100 + mousePosition.x * 30} 800,${300 + mousePosition.y * -40} T1600,${200 + mousePosition.x * 20}`}
            stroke="url(#lineGradient3D)"
            strokeWidth="3"
            fill="none"
            className="animate-pulse"
          />
          <path
            d={`M0,${400 + mousePosition.x * 40} Q300,${200 + mousePosition.y * -30} 600,${500 + mousePosition.x * -50} T1200,${400 + mousePosition.y * 30}`}
            stroke="hsl(var(--secondary) / 0.4)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </svg>

        {/* 3D Interactive Dots */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse transition-all duration-300 hover:scale-150 cursor-pointer"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `hsl(var(--primary) / ${0.3 + Math.random() * 0.4})`,
                animationDelay: `${Math.random() * 3}s`,
                transform: `translateZ(${Math.random() * 50}px) translateY(${mousePosition.y * (5 + Math.random() * 10)}px) translateX(${mousePosition.x * (5 + Math.random() * 10)}px)`,
                transition: "transform 0.2s ease-out, scale 0.3s ease"
              }}
            />
          ))}
        </div>

        {/* Floating 3D Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute opacity-20 animate-float"
              style={{
                width: `${8 + Math.random() * 16}px`,
                height: `${8 + Math.random() * 16}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))`,
                borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                animationDelay: `${Math.random() * 5}s`,
                transform: `
                  translateZ(${20 + Math.random() * 60}px)
                  translateY(${mousePosition.y * (10 + Math.random() * 20)}px)
                  translateX(${mousePosition.x * (10 + Math.random() * 20)}px)
                  rotateX(${mousePosition.y * 45}deg)
                  rotateY(${mousePosition.x * 45}deg)
                `,
                transition: "transform 0.3s ease-out"
              }}
            />
          ))}
        </div>

        {/* 3D Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40"
          style={{ transform: "translateZ(5px)" }}
        />
      </motion.div>

      {/* 🔹 Optional extra accent layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: yMid }}
      >
        <div className="absolute top-40 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-1/3 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-float" />
      </motion.div>

      {/* 🔹 Foreground content */}
      <motion.div 
        className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-16"
        style={{ y: yFg }}
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          <span className="block text-text-primary">Hey, I'm</span>
          <span className="block gradient-text">Abinas Keshari Singh</span>
        </h1>

        <div className="text-2xl md:text-4xl font-medium text-text-secondary mb-8 h-12">
          <span className="font-mono">{displayText}</span>
          <span className="animate-pulse">|</span>
        </div>

        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
          I create exceptional digital experiences through innovative web development, 
          combining cutting-edge technology with thoughtful design to bring ideas to life.
        </p>

        <div className="text-text-secondary/80 mb-12 space-y-2">
          <p className="text-lg">📧 abinaskesharisingh@outlook.com</p>
          <p className="text-lg">📱 +91 6370096587</p>
          <p className="text-lg">📍 Odisha, India</p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 px-8 py-4 text-lg font-medium hover-glow"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 px-8 py-4 text-lg"
            onClick={downloadCV}
          >
            Download CV
            <Download className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 px-8 py-4 text-lg"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/assets/application-f5c02e22-2deb-45d1-894f-065a2303dcab.apk";
              link.download = "AbinasKeshariSingh.apk";
              link.click();
            }}
          >
            Download App
            <Download className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="flex gap-6 justify-center">
          <a href="https://github.com/MR-kali98753" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-surface-light/50 backdrop-blur-sm border border-border hover:bg-surface-light/70 transition-all duration-300 hover-glow">
            <Github className="h-6 w-6 text-text-primary" />
          </a>
          <a href="https://linkedin.com/in/abinas-singh" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-surface-light/50 backdrop-blur-sm border border-border hover:bg-surface-light/70 transition-all duration-300 hover-glow">
            <Linkedin className="h-6 w-6 text-text-primary" />
          </a>
          <a href="mailto:abinaskesharisingh@outlook.com" className="p-3 rounded-full bg-surface-light/50 backdrop-blur-sm border border-border hover:bg-surface-light/70 transition-all duration-300 hover-glow">
            <Mail className="h-6 w-6 text-text-primary" />
          </a>
        </div>
      </motion.div>

      {/* 🔹 Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer hover:text-primary transition-colors"
        onClick={() => scrollToSection("about")}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="h-6 w-6 text-text-secondary" />
      </motion.div>
    </section>
  );
};
