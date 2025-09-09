import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 2000);
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

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 opacity-40">
        <div 
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
            transition: 'background 0.8s ease'
          }}
        />
        
        {/* Animated network pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="contact-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="hsl(var(--primary))" opacity="0.5">
                <animate attributeName="r" values="1;2;1" dur="3s" repeatCount="indefinite" />
              </circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
          {/* Animated connecting lines */}
          <g opacity="0.3">
            {Array.from({ length: 5 }).map((_, i) => (
              <line
                key={i}
                x1={`${20 + i * 15}%`}
                y1="20%"
                x2={`${30 + i * 15}%`}
                y2="80%"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            ))}
          </g>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10" ref={contactRef}>
        <div className={`text-center mb-16 transition-all duration-1000 ${
          contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Ready to start your next project? Let's work together to create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card 
            className="glass-card p-8 hover-glow relative overflow-hidden"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 1}deg) rotateY(${mousePosition.x * 1}deg)`,
              transition: 'transform 0.3s ease'
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

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-text-primary mb-6">
                Let's connect
              </h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                I'm always open to discussing new opportunities, interesting projects, 
                or just having a chat about technology and development. Feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card 
                    key={info.title}
                    className="glass-card p-4 hover-glow cursor-pointer group"
                    onClick={() => handleContactClick(info.title, info.value)}
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full bg-gradient-primary group-hover:animate-pulse">
                        <Icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">{info.title}</h4>
                        <p className="text-text-secondary group-hover:text-text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div>
              <h4 className="text-lg font-medium text-text-primary mb-4">Follow me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <button
                      key={social.name}
                      onClick={() => handleSocialClick(social.name)}
                      className={`p-3 rounded-full bg-surface-light/50 backdrop-blur-sm border border-border hover:bg-surface-light/70 transition-all duration-300 hover-glow ${social.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};