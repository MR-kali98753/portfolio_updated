# Performance Optimization Documentation

## Overview

This project includes several performance optimization features to ensure smooth operation across different devices and browsers. The optimizations focus on reducing CPU/GPU usage while maintaining visual quality where possible.

## Key Features

### 1. Automatic Performance Monitoring
The `usePerformanceMonitor` hook tracks real-time FPS and adjusts animations accordingly:
- Automatically reduces particle counts when FPS drops below 30
- Disables heavy animations on very low-performance devices
- Provides metrics for debugging performance issues

### 2. Environment-Based Configuration
Control performance settings through environment variables:

```bash
# .env file
VITE_APP_ANIMATION_QUALITY=medium  # low, medium, high
VITE_APP_PARTICLE_COUNT=25
VITE_APP_ENABLE_CURSOR_TRAIL=true
VITE_APP_ENABLE_MOTION_GRAPHICS=true
```

### 3. Conditional Rendering
Heavy components only render when:
- Enabled via environment variables
- Device performance is adequate
- Not explicitly disabled by user preferences

### 4. Dynamic Animation Scaling
Animations automatically adjust based on:
- Real-time FPS monitoring
- Device capabilities
- User preference settings

## Performance Optimization Scripts

### Build for Production with Optimizations
```bash
npm run build:optimized
```

### Performance-Focused Build
```bash
npm run build:perf
```

### Bundle Analysis
```bash
npm run analyze
```

### Complete Performance Workflow
```bash
npm run perf
```

## Component-Level Optimizations

### AnimeStyleEffects.tsx
- `CursorTrail`: Dynamically adjusts particle count (15-25 particles based on performance)
- `ParticleField`: Reduces particle count and simplifies physics on low-performance devices
- Frame throttling to skip updates on slower devices

### MotionGraphics.tsx
- `MotionGraphics`: Conditionally renders based on performance settings
- Particle system: Reduces count and complexity on low-performance devices
- Wave animations: Simplified or completely disabled on low performance
- Rotating rings: Reduced count and simplified animations on low performance

### Index.tsx
- Conditional rendering of heavy components based on environment variables

## Testing Performance

### Development Mode with Performance Monitor
```bash
npm run dev
```
In development mode, a performance monitor overlay appears in the bottom-right corner showing:
- Current FPS
- Performance status (Good/Low Performance)
- Render count for debugging

### Production Build Testing
```bash
npm run build:perf
npm run preview
```

## Customizing Performance Settings

Create a `.env.local` file to customize settings for your environment:

```env
# High-performance desktop
VITE_APP_ANIMATION_QUALITY=high
VITE_APP_PARTICLE_COUNT=30
VITE_APP_ENABLE_CURSOR_TRAIL=true
VITE_APP_ENABLE_MOTION_GRAPHICS=true
```

```env
# Low-performance mobile
VITE_APP_ANIMATION_QUALITY=low
VITE_APP_PARTICLE_COUNT=10
VITE_APP_ENABLE_CURSOR_TRAIL=false
VITE_APP_ENABLE_MOTION_GRAPHICS=true
```

## Performance Metrics

The performance monitor tracks:
- **FPS (Frames Per Second)**: Target 60 FPS, degraded performance below 30 FPS
- **Performance Status**: "Good" (≥30 FPS) or "Low Performance" (<30 FPS)
- **Particle Count**: Automatically adjusted based on real-time performance

## Troubleshooting

### Laggy Animations
1. Check the performance monitor FPS counter
2. Reduce `VITE_APP_PARTICLE_COUNT` in your environment variables
3. Set `VITE_APP_ANIMATION_QUALITY=low`
4. Disable cursor trail with `VITE_APP_ENABLE_CURSOR_TRAIL=false`

### High CPU Usage
1. Ensure you're using a production build
2. Check that console logs are stripped in production
3. Verify that heavy animations are disabled on low-performance devices

## Future Enhancements

Planned performance improvements:
1. Lazy loading for non-critical components
2. Automatic quality adjustment based on device type detection
3. Virtual scrolling for long lists
4. Image compression and lazy loading for media assets