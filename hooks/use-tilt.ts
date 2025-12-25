"use client";

import { useRef, useState, useCallback } from "react";

interface TiltOptions {
  max?: number;
  scale?: number;
  glare?: boolean;
}

export function useTilt(options: TiltOptions = {}) {
  const { max = 15, scale = 1.05, glare = false } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});
  const [hasGlare] = useState(glare);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -max;
      const rotateY = ((x - centerX) / centerX) * max;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: "transform 0.1s ease-out",
      });

      if (glare) {
        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
        setGlareStyle({
          background: `linear-gradient(${angle}deg, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          borderRadius: "inherit",
        });
      }
    },
    [max, scale, glare]
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out",
    });
    if (glare) {
      setGlareStyle({});
    }
  }, [glare]);

  return {
    ref,
    tiltStyle,
    glareStyle,
    handleMouseMove,
    handleMouseLeave,
    hasGlare,
  };
}
