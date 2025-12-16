import { useState, useEffect } from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

export const PerformanceTest = () => {
  const { metrics, enabled, setEnabled } = usePerformanceMonitor();
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    // Force re-renders to test performance
    const interval = setInterval(() => {
      setRenderCount(prev => prev + 1);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg z-50 text-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold">Performance Monitor</h3>
        <button 
          onClick={() => setEnabled(!enabled)}
          className="ml-2 px-2 py-1 bg-blue-500 rounded text-xs"
        >
          {enabled ? 'Disable' : 'Enable'}
        </button>
      </div>
      
      <div className="space-y-1">
        <div>FPS: {metrics.fps}</div>
        <div>Status: {metrics.isLowPerformance ? 'Low Performance' : 'Good'}</div>
        <div>Monitor: {enabled ? 'Active' : 'Inactive'}</div>
        <div>Renders: {renderCount}</div>
      </div>
    </div>
  );
};