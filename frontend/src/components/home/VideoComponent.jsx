import React, { useState, useEffect } from "react";
const backgroundVideo = "https://res.cloudinary.com/damlvqiwv/video/upload/f_auto,q_auto/v1769755069/static_assets/aqpqishomqttgatsdad4.mp4";
const mobileImg = "https://res.cloudinary.com/damlvqiwv/image/upload/f_auto,q_auto/v1769755035/static_assets/f8vkequuud69wsyogyzc.png";

const VideoComponent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    // Initial
    handleResize();
    setPrefersReducedMotion(motionQuery.matches);

    window.addEventListener("resize", handleResize);
    motionQuery.addEventListener
      ? motionQuery.addEventListener("change", handleMotionChange)
      : motionQuery.addListener(handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener
        ? motionQuery.removeEventListener("change", handleMotionChange)
        : motionQuery.removeListener(handleMotionChange);
    };
  }, []);

  // TEMPORARILY DISABLED FOR DEBUGGING
  const showImage = false; // isMobile || prefersReducedMotion;

  /* -------------------------
     MOBILE FALLBACK (IMAGE)
     ------------------------- */
  if (showImage) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="w-full h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${mobileImg})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
    );
  }

  /* -------------------------
     DESKTOP VIDEO BACKGROUND
     ------------------------- */
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="w-full h-screen overflow-hidden">
        <video
          src={backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="
            absolute top-1/2 left-1/2
            min-w-full min-h-full
            -translate-x-1/2 -translate-y-1/2
            object-cover
          "
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60" />
      </div>
    </div>
  );
};

export default VideoComponent;
