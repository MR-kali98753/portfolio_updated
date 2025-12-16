import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal, MagneticElement } from "@/components/MotionGraphics";
import { ParallaxWrapper } from "@/components/ParallaxWrapper";

export const Contact = () => {
  const { toast } = useToast();
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation(0.2);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "abinaskesharisingh@outlook.com",
      href: "mailto:abinaskesharisingh@outlook.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 6370096587",
      href: "tel:+916370096587"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Odisha, India",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      href: "#",
      color: "hover:text-text-primary"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "#",
      color: "hover:text-secondary"
    },
    {
      icon: Twitter,
      name: "Twitter",
      href: "#",
      color: "hover:text-accent"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Format message for WhatsApp
    const whatsappMessage = `*New Contact Form Message*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Subject:* ${formData.subject}\n\n` +
      `*Message:*\n${formData.message}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp number: +919938887489 (remove + and spaces)
    const whatsappNumber = "919938887489";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp with the message
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Opening WhatsApp!",
      description: "Your message is ready to send on WhatsApp.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleSocialClick = (platform: string) => {
    toast({
      title: `Opening ${platform}`,
      description: `Redirecting to ${platform} profile...`,
    });
  };

  const handleContactClick = (type: string, value: string) => {
    if (type === "Email") {
      window.location.href = `mailto:${value}`;
    } else if (type === "Phone") {
      window.location.href = `tel:${value}`;
    }
    
    toast({
      title: `Opening ${type}`,
      description: `Launching ${type.toLowerCase()} application...`,
    });
  };

  const { scrollYProgress } = useScroll();
  const backgroundRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.6, 0.4]);

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      {/* Enhanced Interactive Background with Parallax */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ 
          opacity: backgroundOpacity,
          rotate: backgroundRotate,
        }}
      >
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `
              conic-gradient(from ${mousePosition.x * 180}deg at 50% 50%, 
                hsl(var(--primary) / 0.05) 0deg,
                hsl(var(--accent) / 0.05) 120deg,
                hsl(var(--secondary) / 0.05) 240deg,
                hsl(var(--primary) / 0.05) 360deg
              )
            `,
          }}
          animate={{
            background: [
              `conic-gradient(from ${mousePosition.x * 180}deg at 50% 50%, hsl(var(--primary) / 0.05) 0deg, hsl(var(--accent) / 0.05) 120deg, hsl(var(--secondary) / 0.05) 240deg, hsl(var(--primary) / 0.05) 360deg)`,
              `conic-gradient(from ${mousePosition.x * 180 + 180}deg at 50% 50%, hsl(var(--accent) / 0.05) 0deg, hsl(var(--secondary) / 0.05) 120deg, hsl(var(--primary) / 0.05) 240deg, hsl(var(--accent) / 0.05) 360deg)`,
              `conic-gradient(from ${mousePosition.x * 180}deg at 50% 50%, hsl(var(--primary) / 0.05) 0deg, hsl(var(--accent) / 0.05) 120deg, hsl(var(--secondary) / 0.05) 240deg, hsl(var(--primary) / 0.05) 360deg)`,
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Enhanced Animated network pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="contact-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <motion.circle 
                cx="30" 
                cy="30" 
                r="1" 
                fill="hsl(var(--primary))" 
                opacity="0.5"
                animate={{
                  r: [1, 3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
          {/* Enhanced Animated connecting lines */}
          <g opacity="0.3">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.line
                key={i}
                x1={`${20 + i * 10}%`}
                y1="20%"
                x2={`${30 + i * 10}%`}
                y2="80%"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  strokeWidth: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </g>
        </svg>
      </motion.div>
      
      <ParallaxWrapper speed={0.3} direction="up">
        <div className="max-w-7xl mx-auto relative z-10" ref={contactRef}>
          <ScrollReveal direction="up" delay={0.1}>
            <motion.div 
              className={`text-center mb-16 transition-all duration-1000 ${
                contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={contactVisible ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                Get In <span className="gradient-text">Touch</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Ready to start your next project? Let's work together to create something amazing.
              </p>
            </motion.div>
          </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form with enhanced animations */}
          <ScrollReveal direction="left" delay={0.2}>
            <MagneticElement strength={15}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={contactVisible ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card 
                  className="glass-card p-8 hover-glow relative overflow-hidden"
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 1}deg) rotateY(${mousePosition.x * 1}deg)`,
                  }}
                >
            {/* Interactive form background */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, hsl(var(--primary)), transparent 70%)`,
                transition: 'background 0.5s ease'
              }}
            />
            
            <h3 className="text-2xl font-semibold text-text-primary mb-6 relative z-10">
              Send me a message
            </h3>
            
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Name"
                    required
                    className={`bg-surface-light/50 border-border focus:border-primary text-text-primary placeholder:text-text-muted transition-all duration-300 ${
                      focusedField === "name" ? 'scale-[1.02] shadow-lg shadow-primary/20' : ''
                    }`}
                  />
                </div>
                <div className="relative">
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Email"
                    required
                    className={`bg-surface-light/50 border-border focus:border-primary text-text-primary placeholder:text-text-muted transition-all duration-300 ${
                      focusedField === "email" ? 'scale-[1.02] shadow-lg shadow-primary/20' : ''
                    }`}
                  />
                </div>
              </div>
              
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                placeholder="Subject"
                required
                className={`bg-surface-light/50 border-border focus:border-primary text-text-primary placeholder:text-text-muted transition-all duration-300 ${
                  focusedField === "subject" ? 'scale-[1.02] shadow-lg shadow-primary/20' : ''
                }`}
              />
              
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder="Your Message"
                rows={6}
                required
                className={`bg-surface-light/50 border-border focus:border-primary text-text-primary placeholder:text-text-muted resize-none transition-all duration-300 ${
                  focusedField === "message" ? 'scale-[1.02] shadow-lg shadow-primary/20' : ''
                }`}
              />
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 py-3 text-lg font-medium hover-glow disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
            </motion.div>
          </MagneticElement>
        </ScrollReveal>

          {/* Contact Info with enhanced animations */}
          <ScrollReveal direction="right" delay={0.3}>
            <div className="space-y-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={contactVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-2xl font-semibold text-text-primary mb-6">
                  Let's connect
                </h3>
                <p className="text-text-secondary leading-relaxed mb-8">
                  I'm always open to discussing new opportunities, interesting projects, 
                  or just having a chat about technology and development. Feel free to reach out!
                </p>
              </motion.div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <ScrollReveal key={info.title} direction="right" delay={0.4 + index * 0.1}>
                      <MagneticElement strength={10}>
                        <motion.div
                          initial={{ x: 50, opacity: 0 }}
                          animate={contactVisible ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                          whileHover={{ x: 10, scale: 1.02 }}
                        >
                          <Card 
                            className="glass-card p-4 hover-glow cursor-pointer group"
                            onClick={() => handleContactClick(info.title, info.value)}
                          >
                            <div className="flex items-center space-x-4">
                              <motion.div 
                                className="p-3 rounded-full bg-gradient-primary"
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                              >
                                <Icon className="h-5 w-5 text-primary-foreground" />
                              </motion.div>
                              <div>
                                <h4 className="font-medium text-text-primary">{info.title}</h4>
                                <p className="text-text-secondary group-hover:text-text-primary transition-colors">
                                  {info.value}
                                </p>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      </MagneticElement>
                    </ScrollReveal>
                  );
                })}
              </div>

              <ScrollReveal direction="up" delay={0.7}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={contactVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h4 className="text-lg font-medium text-text-primary mb-4">Follow me</h4>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <MagneticElement key={social.name} strength={15}>
                          <motion.button
                            onClick={() => handleSocialClick(social.name)}
                            className={`p-3 rounded-full bg-surface-light/50 backdrop-blur-sm border border-border hover:bg-surface-light/70 transition-all duration-300 hover-glow ${social.color}`}
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={contactVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                            transition={{ duration: 0.5, delay: 0.8 + index * 0.1, type: "spring" }}
                          >
                            <Icon className="h-5 w-5" />
                          </motion.button>
                        </MagneticElement>
                      );
                    })}
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </div>
      </ParallaxWrapper>
    </section>
  );
};