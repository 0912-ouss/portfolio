"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

export function splitText(text: string) {
  return text.split("").map((char, index) => ({
    char: char === " " ? "\u00A0" : char,
    index,
  }));
}

export function useCounterInView(targetValue: number, duration: number = 2000) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;
    const endValue = targetValue;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, targetValue, duration]);

  return { ref, count };
}
