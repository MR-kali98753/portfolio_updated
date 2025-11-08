import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { MotionGraphics } from "@/components/MotionGraphics";
import { ParallaxSection, ParallaxWrapper } from "@/components/ParallaxWrapper";
import { ScrollReveal } from "@/components/MotionGraphics";
import { CursorTrail } from "@/components/AnimeStyleEffects";
import { ScrollMorphOverlay } from "@/components/ScrollMorphOverlay";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navigation />
      
      {/* AnimeJS Style Cursor Trail */}
      <CursorTrail particles={15} />
      
      {/* Scroll Morphing Overlay - Changes form based on scroll progress */}
      <ScrollMorphOverlay 
        shapeCount={4} 
        size={350} 
        opacity={0.3}
        speed={2}
      />
      
      {/* Global Motion Graphics Background */}
      <div className="fixed inset-0 -z-10">
        <MotionGraphics particleCount={25} shapeCount={6} intensity="medium" />
      </div>
      
      <main>
        {/* Hero Section with Parallax */}
        <ParallaxSection className="min-h-screen">
          <section id="home">
            <Hero />
          </section>
        </ParallaxSection>

        {/* About Section with Parallax */}
        <ParallaxSection className="relative">
          <ParallaxWrapper speed={0.3} direction="up">
            <About />
          </ParallaxWrapper>
        </ParallaxSection>

        {/* Projects Section with Parallax */}
        <ParallaxSection className="relative">
          <ParallaxWrapper speed={0.4} direction="down">
            <Projects />
          </ParallaxWrapper>
        </ParallaxSection>

        {/* Contact Section with Parallax */}
        <ParallaxSection className="relative">
          <ParallaxWrapper speed={0.3} direction="up">
            <Contact />
          </ParallaxWrapper>
        </ParallaxSection>
      </main>
      
      {/* Footer with Scroll Reveal */}
      <ScrollReveal direction="up" delay={0.2}>
        <footer className="py-8 px-6 border-t border-border bg-surface/30 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.div 
                className="text-text-secondary mb-4 md:mb-0"
                whileHover={{ scale: 1.05 }}
              >
                © 2024 Abinas Keshar Singh. All rights reserved.
              </motion.div>
              <motion.div 
                className="text-text-secondary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                Built with <motion.span 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >❤️</motion.span> using React & TypeScript
              </motion.div>
            </div>
          </div>
        </footer>
      </ScrollReveal>
    </div>
  );
};

export default Index;
