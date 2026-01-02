"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLHeadingElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsComplete(true),
    });

    const counter = { value: 0 };

    // Initial state
    gsap.set(".loader-content", { opacity: 0, y: 20 });
    gsap.set(containerRef.current, { visibility: "visible" });

    // Entrance
    tl.to(".loader-content", {
      opacity: 1,
      y: 0,
      duration: 0.3, // Faster entrance
      ease: "power2.out"
    });

    // Counter Animation
    tl.to(counter, {
      value: 100,
      duration: 1.2, // Faster count
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(counter.value).toString();
        }
      },
    });

    // Exit Sequence
    tl.to(".loader-content", {
      y: -50,
      opacity: 0,
      duration: 0.3, // Quick fade out
      ease: "power2.in",
      delay: 0
    })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8, // Snappy lift
        ease: "power4.inOut",
      }, "-=0.2");

  }, { scope: containerRef });

  if (isComplete) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#141414] text-white overflow-hidden invisible selection:bg-orange-500">

      {/* Background Pulse */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px]"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Section */}
        <div className="loader-content mb-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-black text-2xl shadow-lg shadow-orange-500/20">
            O
          </div>
          <span className="text-4xl font-black tracking-tighter uppercase">OU <span className="text-gray-500">BERHAYLA</span></span>
        </div>

        {/* Counter Section */}
        <div className="loader-content flex flex-col items-center">
          <div className="relative flex items-center">
            <h1 ref={counterRef} className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-white">
              0
            </h1>
            <span className="text-4xl md:text-6xl font-black text-orange-500 mt-10 ml-2">%</span>
          </div>
          <p className="text-xs font-black uppercase tracking-[0.5em] text-gray-500 -mt-8">
            Loading Digital Excellence
          </p>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900 overflow-hidden">
        <div className="h-full bg-orange-500 w-full origin-left animate-progress" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
      />
    </div>
  );
}
