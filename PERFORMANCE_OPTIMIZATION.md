# Performance Optimization Guide

This document explains the performance improvements made to the website to address lag caused by heavy rendering objects.

## Key Optimizations Implemented

### 1. Build Process Optimizations

- Added Vite configuration with performance-focused settings:
  - Minification using Terser in production
  - Code splitting for better bundle management
  - Console log removal in production builds
  - Dependency optimization for faster loading

### 2. Dynamic Animation Scaling

Created a performance monitoring hook (`usePerformanceMonitor`) that:
- Monitors real-time FPS (frames per second)
- Automatically reduces animation complexity when FPS drops below 30
- Dynamically adjusts particle counts based on device performance
- Completely disables heavy animations on very low-performance devices

### 3. Conditional Rendering

Animations and effects now conditionally render based on:
- Environment variables (`VITE_APP_ENABLE_CURSOR_TRAIL`, `VITE_APP_ENABLE_MOTION_GRAPHICS`)
- Real-time performance metrics
- Device capabilities

### 4. Animation Throttling

- Frame throttling for particle systems (skips frames on low-performance devices)
- Reduced animation complexity on slower devices
- Simplified visual effects when performance degrades

## Environment-Based Performance Settings

The application now respects the following environment variables:

| Variable | Description | Values | Default |
|----------|-------------|--------|---------|
| `VITE_APP_PERFORMANCE_MODE` | Overall performance mode | `high`, `development` | Based on NODE_ENV |
| `VITE_APP_ANIMATION_QUALITY` | Animation quality level | `low`, `medium`, `high` | `medium` |
| `VITE_APP_PARTICLE_COUNT` | Number of particles to render | Number | `25` |
| `VITE_APP_ENABLE_CURSOR_TRAIL` | Enable/disable cursor trail effect | `true`, `false` | `true` |
| `VITE_APP_ENABLE_MOTION_GRAPHICS` | Enable/disable motion graphics | `true`, `false` | `true` |

## Affected Components

### AnimeStyleEffects.tsx
- CursorTrail: Dynamically adjusts particle count and disables on low performance
- ParticleField: Reduces particle count and simplifies physics on low performance
- AnimatedText: Unchanged (minimal performance impact)

### MotionGraphics.tsx
- MotionGraphics: Conditionally renders based on performance settings
- Particle system: Reduces count and complexity on low-performance devices
- Wave animations: Simplified or disabled on low performance
- Rotating rings: Reduced count and simplified animations on low performance

### Index.tsx
- Conditional rendering of heavy components based on environment variables

## Performance Benefits

1. **Reduced CPU Usage**: Frame throttling and conditional rendering significantly reduce CPU load
2. **Better Battery Life**: On mobile devices, reduced animations extend battery life
3. **Improved Responsiveness**: Lower-end devices maintain acceptable FPS
4. **Adaptive Experience**: High-end devices still get full visual experience

## Testing Performance

To test the performance optimizations:

1. **Development Mode**:
   ```bash
   npm run dev
   ```

2. **Production Build**:
   ```bash
   npm run build:optimized
   npm run preview
   ```

3. **Performance Analysis**:
   ```bash
   npm run analyze
   ```

## Customizing Performance Settings

Create a `.env.local` file in the project root to customize performance settings:

```env
VITE_APP_ANIMATION_QUALITY=low
VITE_APP_PARTICLE_COUNT=10
VITE_APP_ENABLE_CURSOR_TRAIL=false
```

## Future Improvements

1. Implement lazy loading for non-critical components
2. Add automatic quality adjustment based on device type detection
3. Implement virtual scrolling for long lists
4. Add image compression and lazy loading for media assets