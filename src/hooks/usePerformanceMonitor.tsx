import { useState, useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  isLowPerformance: boolean;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    isLowPerformance: false
  });
  
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        // Update metrics
        setMetrics(prev => ({
          ...prev,
          fps,
          isLowPerformance: fps < 30
        }));
      }
      
      if (enabled) {
        requestAnimationFrame(measureFPS);
      }
    };
    
    const animationId = requestAnimationFrame(measureFPS);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [enabled]);

  const getOptimizedParticleCount = useCallback((baseCount: number) => {
    if (!enabled || metrics.fps >= 50) return baseCount;
    if (metrics.fps >= 30) return Math.floor(baseCount * 0.7);
    return Math.floor(baseCount * 0.5);
  }, [metrics.fps, enabled]);

  const shouldReduceMotion = useCallback(() => {
    if (!enabled) return false;
    return metrics.isLowPerformance || metrics.fps < 40;
  }, [metrics.isLowPerformance, metrics.fps, enabled]);

  return {
    metrics,
    enabled,
    setEnabled,
    getOptimizedParticleCount,
    shouldReduceMotion
  };
};