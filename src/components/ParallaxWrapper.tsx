import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down";
  className?: string;
  offset?: [string, string];
}

export const ParallaxWrapper = ({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
  offset = ["start end", "end start"],
}: ParallaxWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [0, -100 * speed] : [0, 100 * speed]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        opacity,
        scale,
      }}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  backgroundLayers?: number;
}

export const ParallaxSection = ({
  children,
  className = "",
  backgroundLayers = 3,
}: ParallaxSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const layers = Array.from({ length: backgroundLayers }).map((_, i) => {
    const speed = (i + 1) * 0.2;
    const y = useTransform(scrollYProgress, [0, 1], [0, -200 * speed]);
    const opacity = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [0.1, 0.3, 0.1]
    );

    return { y, opacity, speed };
  });

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Parallax Background Layers */}
      {layers.map((layer, i) => (
        <motion.div
          key={`layer-${i}`}
          className="absolute inset-0 pointer-events-none"
          style={{
            y: layer.y,
            opacity: layer.opacity,
            zIndex: -i - 1,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${50 + i * 10}% ${
                50 + i * 10
              }%, hsl(var(--primary) / ${0.1 - i * 0.02}), transparent 60%)`,
            }}
          />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

interface StickyParallaxProps {
  children: ReactNode;
  className?: string;
  topOffset?: number;
}

export const StickyParallax = ({
  children,
  className = "",
  topOffset = 0,
}: StickyParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  return (
    <motion.div
      ref={ref}
      className={`sticky ${className}`}
      style={{
        top: topOffset,
        scale,
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
};

// Smooth scroll parallax container
interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
}

export const ParallaxContainer = ({
  children,
  className = "",
}: ParallaxContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "hsl(var(--background))",
      "hsl(var(--surface))",
      "hsl(var(--background))",
    ]
  );

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{
        backgroundColor,
      }}
    >
      {children}
    </motion.div>
  );
};

