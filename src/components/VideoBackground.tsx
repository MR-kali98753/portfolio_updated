import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  videoSrc: string;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  fallbackImage?: string;
}

export const VideoBackground = ({
  videoSrc,
  className = "",
  overlay = true,
  overlayOpacity = 0.4,
  fallbackImage,
}: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video && !videoError) {
      // Ensure video plays and loops
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsLoading(false);
          })
          .catch((error) => {
            console.warn("Video autoplay failed:", error);
            setVideoError(true);
            setIsLoading(false);
          });
      }

      // Handle video load errors
      const handleError = () => {
        console.warn("Video failed to load:", videoSrc);
        setVideoError(true);
        setIsLoading(false);
      };

      video.addEventListener("error", handleError);
      video.addEventListener("loadeddata", () => setIsLoading(false));

      return () => {
        video.removeEventListener("error", handleError);
        video.removeEventListener("loadeddata", () => setIsLoading(false));
      };
    }
  }, [videoSrc, videoError]);

  return (
    <div className={`absolute inset-0 ${className}`} style={{ zIndex: 2 }}>
      {!videoError ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Fallback to gradient background or image if video fails to load
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-background via-background to-surface-dark"
          style={{
            backgroundImage: fallbackImage ? `url(${fallbackImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      {overlay && !isLoading && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/60"
          style={{ opacity: overlayOpacity, zIndex: 1 }}
        />
      )}
    </div>
  );
};

