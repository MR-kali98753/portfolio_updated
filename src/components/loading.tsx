import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleField } from './AnimeStyleEffects';
import './loading.css';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 100);

    // Loading dots animation
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  // Floating particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
  }));

  // Rotating rings
  const rings = Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    size: 60 + i * 40,
    delay: i * 0.2,
  }));

  return (
    <motion.div
      className="loading-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleField count={30} speed={0.3} interactive={false} />
        
        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(particle.id) * 20, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="loading-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="50" stroke="hsl(var(--primary))" strokeWidth="1" />
                <line x1="0" y1="0" x2="50" y2="0" stroke="hsl(var(--primary))" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#loading-grid)" />
          </svg>
        </div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Rotating Rings */}
        <div className="relative mb-8">
          {rings.map((ring) => (
            <motion.div
              key={ring.id}
              className="absolute rounded-full border-2 border-primary/30"
              style={{
                width: ring.size,
                height: ring.size,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + ring.id,
                delay: ring.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* Center Spinner */}
          <motion.div
            className="relative w-20 h-20"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-accent rounded-full" />
            <div className="absolute inset-2 border-4 border-transparent border-b-secondary border-l-primary rounded-full" />
          </motion.div>

          {/* Pulsing center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full"
            style={{ transform: 'translate(-50%, -50%)' }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Loading Text */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Loading{dots}
          </h2>
          <p className="text-text-secondary text-sm">
            Preparing your experience
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-64 h-1 bg-surface-light rounded-full overflow-hidden"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.div>

        {/* Progress Percentage */}
        <motion.p
          className="text-text-secondary text-xs mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {Math.round(progress)}%
        </motion.p>

        {/* Animated Logo/Icon */}
        <motion.div
          className="mt-8"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <motion.div
              className="w-8 h-8 bg-primary-foreground rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary/20" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-primary/20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-primary/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-primary/20" />
    </motion.div>
  );
};

export default Loading;
