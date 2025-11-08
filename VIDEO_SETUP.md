# Video Background Setup Guide

## Adding a Video to the Hero Section

The Hero section now supports a looping video background at z-index 2. Follow these steps to add your video:

### Step 1: Add Your Video File

1. Place your video file in the `public` folder
2. Recommended video format: `.mp4` (H.264 codec for best compatibility)
3. Alternative format: `.webm` (for better compression)

### Step 2: Update Video Path

In `src/components/Hero.tsx`, update the video source:

```tsx
<VideoBackground
  videoSrc="/your-video-name.mp4" // Update this path
  overlay={true}
  overlayOpacity={0.5}
/>
```

### Step 3: Video Recommendations

For best performance:
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Duration**: 10-30 seconds (will loop seamlessly)
- **File Size**: Keep under 5MB for web optimization
- **Format**: MP4 with H.264 codec
- **Frame Rate**: 24-30 fps

### Step 4: Video Optimization

To optimize your video:

1. **Use HandBrake or FFmpeg**:
   ```bash
   # Using FFmpeg
   ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 2M -b:a 128k -movflags +faststart output.mp4
   ```

2. **Online Tools**:
   - CloudConvert
   - HandBrake
   - Adobe Media Encoder

### Step 5: Fallback

If the video fails to load, the component will automatically fallback to:
- A gradient background (default)
- Or a fallback image if provided

To add a fallback image:
```tsx
<VideoBackground
  videoSrc="/hero-video.mp4"
  overlay={true}
  overlayOpacity={0.5}
  fallbackImage="/hero-fallback.jpg"
/>
```

## Example Video Sources

You can use these free video sources:
- **Pexels Videos**: https://www.pexels.com/videos/
- **Pixabay Videos**: https://pixabay.com/videos/
- **Coverr**: https://coverr.co/

Search for: "abstract background", "technology", "code", "particles", etc.

## Testing

1. Ensure the video plays automatically
2. Check that it loops seamlessly
3. Verify the overlay doesn't obscure content too much
4. Test on different browsers (Chrome, Firefox, Safari, Edge)
5. Test on mobile devices

## Troubleshooting

**Video not playing:**
- Check browser console for errors
- Ensure video is in the `public` folder
- Verify video format is supported
- Check file path is correct

**Video too large:**
- Compress the video using the tools mentioned above
- Reduce resolution or frame rate
- Use WebM format for better compression

**Performance issues:**
- Reduce video file size
- Lower resolution
- Use hardware acceleration (browser setting)
- Consider using a poster image instead

