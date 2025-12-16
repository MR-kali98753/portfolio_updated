import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

// Cursor Trail Effect
interface CursorTrailProps {
  particles?: number;
  colors?: string[];
}

export const CursorTrail = ({ particles = 20, colors }: CursorTrailProps) => {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const trailId = useRef(0);
  const { getOptimizedParticleCount, shouldReduceMotion } = usePerformanceMonitor();
  
  // Optimize particle count based on performance
  const optimizedParticleCount = getOptimizedParticleCount(particles);
  
  // Disable cursor trail entirely on low performance
  const disableTrail = shouldReduceMotion();

  useEffect(() => {
    if (disableTrail) return;
    
    const updateMousePosition = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Add new trail point
      setTrail((prev) => {
        const newTrail = [
          ...prev,
          { x: e.clientX, y: e.clientY, id: trailId.current++ },
        ];
        // Keep only last N particles
        return newTrail.slice(-optimizedParticleCount);
      });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [optimizedParticleCount, disableTrail]);

  const defaultColors = [
    "hsl(var(--primary))",
    "hsl(var(--accent))",
    "hsl(var(--secondary))",
  ];
  const trailColors = colors || defaultColors;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      {trail.map((point, index) => {
        const size = (particles - index) / particles * 10;
        const opacity = (particles - index) / particles * 0.6;
        const color = trailColors[index % trailColors.length];

        return (
          <motion.div
            key={point.id}
            className="absolute rounded-full"
            style={{
              left: point.x,
              top: point.y,
              width: size,
              height: size,
              backgroundColor: color,
              opacity,
              transform: "translate(-50%, -50%)",
              mixBlendMode: "screen",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        );
      })}
    </div>
  );
};

// Interactive Particle Field
interface ParticleFieldProps {
  count?: number;
  speed?: number;
  interactive?: boolean;
}

export const ParticleField = ({
  count = 50,
  speed = 1,
  interactive = true,
}: ParticleFieldProps) => {
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
  }>>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const { getOptimizedParticleCount, shouldReduceMotion } = usePerformanceMonitor();
  
  // Optimize particle count based on performance
  const optimizedParticleCount = getOptimizedParticleCount(count);
  
  // Reduce animation complexity on low performance
  const reducedMotion = shouldReduceMotion();
  const optimizedSpeed = reducedMotion ? speed * 0.5 : speed;
  const optimizedInteractive = reducedMotion ? false : interactive;

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: optimizedParticleCount }).map(() => ({
      x: Math.random() * (containerRef.current?.clientWidth || window.innerWidth),
      y: Math.random() * (containerRef.current?.clientHeight || window.innerHeight),
      vx: (Math.random() - 0.5) * optimizedSpeed,
      vy: (Math.random() - 0.5) * optimizedSpeed,
      size: Math.random() * 3 + 1,
    }));
    setParticles(initialParticles);
  }, [optimizedParticleCount, optimizedSpeed]);

  useEffect(() => {
    if (!optimizedInteractive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [optimizedInteractive]);

  useEffect(() => {
    let lastUpdateTime = 0;
    const frameThrottle = reducedMotion ? 3 : 1; // Skip frames on low performance
    let frameCount = 0;
    
    const animate = (timestamp: number) => {
      frameCount++;
      
      // Throttle animation updates on low performance
      if (frameCount % frameThrottle !== 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      setParticles((prev) =>
        prev.map((particle) => {
          let { x, y, vx, vy } = particle;
          const width = containerRef.current?.clientWidth || window.innerWidth;
          const height = containerRef.current?.clientHeight || window.innerHeight;

          // Update position
          x += vx;
          y += vy;

          // Mouse interaction (skip on low performance)
          if (optimizedInteractive && !reducedMotion) {
            const dx = mousePos.x - x;
            const dy = mousePos.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 100;

            if (distance < maxDistance) {
              const force = (maxDistance - distance) / maxDistance;
              vx -= (dx / distance) * force * 0.5;
              vy -= (dy / distance) * force * 0.5;
            }
          }

          // Bounce off edges
          if (x < 0 || x > width) vx *= -1;
          if (y < 0 || y > height) vy *= -1;

          // Keep particles in bounds
          x = Math.max(0, Math.min(width, x));
          y = Math.max(0, Math.min(height, y));

          // Apply damping
          vx *= reducedMotion ? 0.99 : 0.98; // Faster damping on low performance
          vy *= reducedMotion ? 0.99 : 0.98;

          return { ...particle, x, y, vx, vy };
        })
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos, optimizedInteractive, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      {particles.map((particle, index) => (
        // Skip rendering some particles on low performance
        (!reducedMotion || index % 2 === 0) && (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: `hsl(var(--primary) / ${reducedMotion ? 0.4 : 0.6})`,
              transform: "translate(-50%, -50%)",
              boxShadow: reducedMotion 
                ? `0 0 ${particle.size}px hsl(var(--primary) / 0.4)` 
                : `0 0 ${particle.size * 2}px hsl(var(--primary) / 0.8)` ,
            }}
            animate={reducedMotion ? undefined : {
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={reducedMotion ? undefined : {
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )
      ))}
    </div>
  );
};

// Animated Text Reveal (AnimeJS style)
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
}: AnimatedTextProps) => {
  const words = text.split(" ");

  return (
    <span className={className} style={{ display: "block" }}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block"
          style={{ overflow: "hidden", marginRight: wordIndex < words.length - 1 ? "0.5rem" : "0" }}
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: delay + wordIndex * stagger + charIndex * 0.02,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

// Floating Elements (like animejs website)
interface FloatingElementProps {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const FloatingElement = ({
  children,
  amplitude = 20,
  duration = 3,
  delay = 0,
  className = "",
}: FloatingElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Interactive Grid (AnimeJS style)
export const InteractiveGrid = () => {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const gridSize = 20;
  const cells = Array.from({ length: gridSize * gridSize });

  return (
    <div
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        zIndex: 1,
      }}
    >
      {cells.map((_, index) => (
        <motion.div
          key={index}
          className="border border-primary/20"
          onMouseEnter={() => setHoveredCell(index)}
          onMouseLeave={() => setHoveredCell(null)}
          animate={{
            backgroundColor:
              hoveredCell === index
                ? "hsl(var(--primary) / 0.3)"
                : "transparent",
            scale: hoveredCell === index ? 1.2 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  );
};

// Magnetic Button Effect
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton = ({
  children,
  className = "",
  strength = 30,
}: MagneticButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    setPosition({
      x: (x / width) * strength,
      y: (y / height) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};

