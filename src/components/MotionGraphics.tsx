import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

interface ParticleProps {
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

const Particle = ({ x, y, delay, duration, size }: ParticleProps) => {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-primary opacity-30"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, Math.sin(delay) * 20, 0],
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

interface FloatingShapeProps {
  x: number;
  y: number;
  delay: number;
  size: number;
  shape: "circle" | "square" | "triangle";
  color: string;
}

const FloatingShape = ({ x, y, delay, size, shape, color }: FloatingShapeProps) => {
  const getShapeStyle = () => {
    switch (shape) {
      case "circle":
        return { borderRadius: "50%" };
      case "square":
        return { borderRadius: "12px", transform: "rotate(45deg)" };
      case "triangle":
        return {
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          borderRadius: "0",
        };
      default:
        return { borderRadius: "50%" };
    }
  };

  return (
    <motion.div
      className="absolute opacity-20"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: color,
        ...getShapeStyle(),
      }}
      animate={{
        y: [0, -40, 0],
        x: [0, Math.cos(delay) * 30, 0],
        rotate: [0, 360],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 4 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

interface AnimatedGridProps {
  rows?: number;
  cols?: number;
  gap?: number;
}

export const AnimatedGrid = ({ rows = 10, cols = 10, gap = 50 }: AnimatedGridProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full opacity-20">
        <defs>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {Array.from({ length: rows }).map((_, i) => (
          <motion.line
            key={`row-${i}`}
            x1="0"
            y1={i * gap}
            x2="100%"
            y2={i * gap}
            stroke="url(#gridGradient)"
            strokeWidth="1"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
        ))}
        {Array.from({ length: cols }).map((_, i) => (
          <motion.line
            key={`col-${i}`}
            x1={i * gap}
            y1="0"
            x2={i * gap}
            y2="100%"
            stroke="url(#gridGradient)"
            strokeWidth="1"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
        ))}
        {/* Interactive cursor effect */}
        <motion.circle
          cx={`${mousePosition.x}%`}
          cy={`${mousePosition.y}%`}
          r="100"
          fill="hsl(var(--primary))"
          opacity={0.1}
          animate={{
            r: [80, 120, 80],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
};

interface MotionGraphicsProps {
  particleCount?: number;
  shapeCount?: number;
  intensity?: "low" | "medium" | "high";
}

export const MotionGraphics = ({
  particleCount = 30,
  shapeCount = 8,
  intensity = "medium",
}: MotionGraphicsProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { getOptimizedParticleCount, shouldReduceMotion } = usePerformanceMonitor();

  const springConfig = { damping: 50, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Optimize counts based on performance
  const optimizedParticleCount = getOptimizedParticleCount(particleCount);
  const optimizedShapeCount = getOptimizedParticleCount(shapeCount);
  
  // Reduce animation complexity on low performance
  const reducedMotion = shouldReduceMotion();
  
  // Disable heavy animations entirely on very low performance
  const disableHeavyAnimations = reducedMotion && intensity === "high";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x: xPos, y: yPos });
      mouseX.set(xPos * 50);
      mouseY.set(yPos * 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const baseParticleSize = intensity === "high" ? 6 : intensity === "medium" ? 4 : 2;
  const particleSize = reducedMotion ? baseParticleSize * 0.7 : baseParticleSize;
  const actualParticleCount = intensity === "high" ? particleCount * 1.5 : intensity === "low" ? particleCount * 0.5 : particleCount;
  const optimizedActualParticleCount = getOptimizedParticleCount(actualParticleCount);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Particles */}
      {!disableHeavyAnimations && (
        <div className="absolute inset-0">
          {Array.from({ length: Math.floor(optimizedActualParticleCount) }).map((_, i) => (
            // Skip some particles on low performance
            (!reducedMotion || i % 3 !== 0) && (
              <Particle
                key={`particle-${i}`}
                x={Math.random() * 100}
                y={Math.random() * 100}
                delay={Math.random() * 2}
                duration={reducedMotion ? 2 : 3 + Math.random() * 2}
                size={particleSize + Math.random() * particleSize}
              />
            )
          ))}
        </div>
      )}

      {/* Floating Shapes */}
      {!disableHeavyAnimations && (
        <div className="absolute inset-0">
          {Array.from({ length: Math.floor(optimizedShapeCount) }).map((_, i) => (
            // Skip some shapes on low performance
            (!reducedMotion || i % 2 === 0) && (
              <FloatingShape
                key={`shape-${i}`}
                x={Math.random() * 100}
                y={Math.random() * 100}
                delay={Math.random() * 2}
                size={reducedMotion ? 20 + Math.random() * 20 : 20 + Math.random() * 40}
                shape={["circle", "square", "triangle"][i % 3] as "circle" | "square" | "triangle"}
                color={`linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))`}
              />
            )
          ))}
        </div>
      )}

      {/* Interactive Light Beam */}
      {!reducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, hsl(var(--primary)), transparent 60%)`,
            x,
            y,
          }}
        />
      )}

      {/* Animated Wave Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {Array.from({ length: reducedMotion ? 2 : 3 }).map((_, i) => (
          <motion.path
            key={`wave-${i}`}
            d={`M0,${200 + i * 150} Q${400 + mousePosition.x * 100},${100 + i * 50} 800,${300 + i * 100} T1600,${200 + i * 150}`}
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
            animate={!reducedMotion ? {
              d: [
                `M0,${200 + i * 150} Q400,${100 + i * 50} 800,${300 + i * 100} T1600,${200 + i * 150}`,
                `M0,${220 + i * 150} Q450,${120 + i * 50} 850,${320 + i * 100} T1600,${220 + i * 150}`,
                `M0,${200 + i * 150} Q400,${100 + i * 50} 800,${300 + i * 100} T1600,${200 + i * 150}`,
              ]
            } : undefined}
            transition={!reducedMotion ? {
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            } : undefined}
          />
        ))}
      </svg>

      {/* Rotating Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: reducedMotion ? 2 : 3 }).map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border-2 border-primary/20"
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
            }}
            animate={!reducedMotion ? {
              rotate: 360,
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            } : {
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={!reducedMotion ? {
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            } : {
              duration: 30 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Magnetic Cursor Effect Component
interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticElement = ({ children, strength = 30, className = "" }: MagneticElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    setPosition({ x: x * 0.1, y: y * 0.1 });
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

// Scroll Reveal Component
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}

export const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 50, opacity: 0 };
      case "down":
        return { y: -50, opacity: 0 };
      case "left":
        return { x: 50, opacity: 0 };
      case "right":
        return { x: -50, opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={isVisible ? { x: 0, y: 0, opacity: 1 } : getInitialPosition()}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

