import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollMorphOverlayProps {
  /**
   * Number of morphing shapes to render
   */
  shapeCount?: number;
  /**
   * Base size of shapes
   */
  size?: number;
  /**
   * Color of the shapes
   */
  color?: string;
  /**
   * Opacity of the overlay
   */
  opacity?: number;
  /**
   * Animation speed multiplier
   */
  speed?: number;
}

/**
 * Generate SVG path that morphs based on progress
 */
const generateMorphPath = (progress: number, index: number, size: number): string => {
  const centerX = size / 2;
  const centerY = size / 2;
  const baseRadius = size * 0.4;
  const points = 12; // Number of points for the shape
  
  // Create dramatic morphing by varying radius based on progress and index
  const morphFactor = Math.sin(progress * Math.PI * 2 + index * Math.PI / 3);
  const radiusVariation = baseRadius * (0.5 + 0.5 * Math.abs(morphFactor));
  
  let path = "";
  
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2;
    // Add wave effect that changes with scroll
    const wave = Math.sin(progress * Math.PI * 4 + angle * 2 + index) * 0.3;
    const radius = radiusVariation * (1 + wave);
    
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    if (i === 0) {
      path += `M ${x} ${y}`;
    } else {
      // Use smooth curves for better morphing
      const prevAngle = ((i - 1) / points) * Math.PI * 2;
      const prevWave = Math.sin(progress * Math.PI * 4 + prevAngle * 2 + index) * 0.3;
      const prevRadius = radiusVariation * (1 + prevWave);
      const prevX = centerX + prevRadius * Math.cos(prevAngle);
      const prevY = centerY + prevRadius * Math.sin(prevAngle);
      
      // Control points for smooth curves
      const cp1x = prevX + (radiusVariation * 0.3) * Math.cos(prevAngle);
      const cp1y = prevY + (radiusVariation * 0.3) * Math.sin(prevAngle);
      const cp2x = x - (radiusVariation * 0.3) * Math.cos(angle);
      const cp2y = y - (radiusVariation * 0.3) * Math.sin(angle);
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
    }
  }
  
  path += " Z";
  return path;
};

/**
 * ScrollMorphOverlay - A component that renders morphing shapes over the website
 * that change form based on scroll progress. Similar to anime.js website effect.
 * 
 * The component is untouchable (pointer-events: none) and renders above all content.
 */
export const ScrollMorphOverlay = ({
  shapeCount = 4,
  size = 300,
  color = "hsl(var(--primary))",
  opacity = 0.25,
  speed = 1,
}: ScrollMorphOverlayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Smooth scroll progress for better animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Create multiple path variations that morph dramatically
  const path1 = useTransform(smoothProgress, (progress) => 
    generateMorphPath(progress, 0, size)
  );
  const path2 = useTransform(smoothProgress, (progress) => 
    generateMorphPath(progress, 1, size)
  );
  const path3 = useTransform(smoothProgress, (progress) => 
    generateMorphPath(progress, 2, size)
  );
  const path4 = useTransform(smoothProgress, (progress) => 
    generateMorphPath(progress, 3, size)
  );

  // Transform scroll progress to various animation values
  const rotation1 = useTransform(smoothProgress, [0, 1], [0, 360 * speed]);
  const rotation2 = useTransform(smoothProgress, [0, 1], [0, -360 * speed * 0.7]);
  const rotation3 = useTransform(smoothProgress, [0, 1], [0, 360 * speed * 1.3]);
  const rotation4 = useTransform(smoothProgress, [0, 1], [0, -360 * speed * 0.9]);
  
  const scale1 = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.6, 1.4, 0.8, 1.2]);
  const scale2 = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [1.2, 0.7, 1.3, 0.9]);
  const scale3 = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.8, 1.5, 0.6, 1.1]);
  const scale4 = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [1.1, 0.5, 1.4, 0.8]);
  
  // Position transforms for each shape - more dramatic movement
  const x1 = useTransform(smoothProgress, [0, 1], [0, 200]);
  const y1 = useTransform(smoothProgress, [0, 1], [0, -150]);
  const x2 = useTransform(smoothProgress, [0, 1], [0, -180]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 200]);
  const x3 = useTransform(smoothProgress, [0, 1], [0, 150]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, -120]);
  const x4 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const y4 = useTransform(smoothProgress, [0, 1], [0, 180]);

  // Array of paths and transforms for easy mapping
  const shapes = useMemo(() => [
    { path: path1, rotation: rotation1, scale: scale1, x: x1, y: y1, position: { left: "10%", top: "15%" } },
    { path: path2, rotation: rotation2, scale: scale2, x: x2, y: y2, position: { right: "15%", top: "25%" } },
    { path: path3, rotation: rotation3, scale: scale3, x: x3, y: y3, position: { left: "20%", bottom: "20%" } },
    { path: path4, rotation: rotation4, scale: scale4, x: x4, y: y4, position: { right: "10%", bottom: "15%" } },
  ], [path1, path2, path3, path4, rotation1, rotation2, rotation3, rotation4, scale1, scale2, scale3, scale4, x1, x2, x3, x4, y1, y2, y3, y4]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 9998, // High z-index but below cursor trail
        overflow: "hidden",
      }}
    >
      {/* Dramatic SVG morphing shapes */}
      {shapes.slice(0, shapeCount).map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            ...shape.position,
            width: size,
            height: size,
            x: shape.x,
            y: shape.y,
            rotate: shape.rotation,
            scale: shape.scale,
            opacity: opacity * (1 - index * 0.08),
            mixBlendMode: "screen",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${size} ${size}`}
            style={{ overflow: "visible" }}
          >
            <motion.path
              d={shape.path}
              fill={color}
              style={{
                filter: `blur(${15 + index * 5}px)`,
              }}
            />
            {/* Add a second layer for more depth */}
            <motion.path
              d={shape.path}
              fill={color}
              opacity={0.3}
              style={{
                filter: `blur(${30 + index * 10}px)`,
                transform: "scale(1.2)",
              }}
            />
          </svg>
        </motion.div>
      ))}

      {/* Additional connecting morphing paths */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <motion.path
          d={useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [
            "M 50 100 Q 200 50 350 100 T 650 100",
            "M 100 150 Q 250 100 400 150 T 700 150",
            "M 50 100 Q 200 50 350 100 T 650 100",
            "M 80 120 Q 220 80 380 120 T 680 120",
            "M 50 100 Q 200 50 350 100 T 650 100",
          ])}
          stroke={color}
          strokeWidth="3"
          fill="none"
          opacity={opacity * 0.6}
          style={{
            filter: "blur(3px)",
          }}
        />
        <motion.path
          d={useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [
            "M 100 500 Q 400 400 700 500",
            "M 150 550 Q 450 450 750 550",
            "M 100 500 Q 400 400 700 500",
            "M 120 520 Q 420 420 720 520",
            "M 100 500 Q 400 400 700 500",
          ])}
          stroke={color}
          strokeWidth="3"
          fill="none"
          opacity={opacity * 0.5}
          style={{
            filter: "blur(3px)",
          }}
        />
      </svg>
    </div>
  );
};

