import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <About />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-text-secondary mb-4 md:mb-0">
              © 2024 Abinas Keshar Singh. All rights reserved.
            </div>
            <div className="text-text-secondary">
              Built with ❤️ using React & TypeScript
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
