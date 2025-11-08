import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo with animation */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="#home" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#home');
                }}
                className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity">
                <motion.img 
                  src="/LOGO.png" 
                  alt="Portfolio" 
                  className="h-12 w-auto"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                />
              </a>
            </motion.div>

            {/* Desktop Navigation with stagger animation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item, index) => (
                  <motion.a 
                    key={item.name} 
                    href={item.href} 
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }} 
                    className="text-text-secondary hover:text-text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    {item.name}
                    <motion.span 
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-primary"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* CTA Button with magnetic effect */}
            <div className="hidden md:block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  className="border-border bg-surface/50 backdrop-blur-sm hover:bg-surface/70 relative overflow-hidden group"
                  onClick={() => handleNavClick('#contact')}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Let's Talk</span>
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.div
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                  className="text-text-primary"
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu with slide animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
                {navItems.map((item, index) => (
                  <motion.a 
                    key={item.name} 
                    href={item.href} 
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }} 
                    className="text-text-secondary hover:text-text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.div 
                  className="pt-4 pb-2"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Button 
                    variant="outline" 
                    className="w-full border-border bg-surface/50 backdrop-blur-sm hover:bg-surface/70" 
                    onClick={() => handleNavClick('#contact')}
                  >
                    Let's Talk
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
