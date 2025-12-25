"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#0a0a0a] text-[#e0e0e0] p-6 md:p-12 overflow-hidden invisible">

      {/* Top Bar */}
      <div className="loader-content flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-white/40" />
          <span className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-white/60">
            Est. 2024
          </span>
        </div>
        <span className="font-sans text-xs md:text-sm tracking-widest text-white/40">
          PARIS, FR
        </span>
      </div>

      {/* Center Decoration & Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10" />

        <div className="loader-content relative z-10 bg-[#0a0a0a] px-8 py-6 border border-white/10 flex flex-col items-center">
          <h2 className="font-serif text-2xl md:text-4xl tracking-widest text-white uppercase text-center whitespace-nowrap">
            Web Designer
          </h2>
          <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-white/50 text-center mt-3 uppercase">
            & Full Stack Developer
          </p>
        </div>
      </div>

      {/* Bottom Counter Area */}
      <div className="loader-content flex justify-between items-end w-full">
        <div className="flex flex-col">
          <span className="font-sans text-xs tracking-widest text-white/40 mb-2">
            LOADING ASSETS
          </span>
          <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
            <div className="h-full bg-white/80 w-full origin-left animate-progress" />
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="relative leading-none">
            <h1 ref={counterRef} className="font-serif text-[6rem] md:text-[10rem] lg:text-[12rem] leading-none font-medium tracking-tighter text-white mix-blend-difference">
              0
            </h1>
            <span className="absolute top-4 -right-6 md:-right-8 text-2xl md:text-4xl font-sans font-light text-white/50">%</span>
          </div>
        </div>
      </div>

      {/* Grain Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </div>
  );
}
