"use client";

import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
  // Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 400 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Parallax Transforms
  // Text moves slightly opposite to mouse
  const textX = useTransform(mouseXSpring, [-0.5, 0.5], ["15px", "-15px"]);
  const textY = useTransform(mouseYSpring, [-0.5, 0.5], ["15px", "-15px"]);

  // Image moves more effectively
  const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["-25px", "25px"]);
  const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["-25px", "25px"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -0.5 to 0.5
      const xPct = (e.clientX / window.innerWidth) - 0.5;
      const yPct = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="min-h-screen bg-white text-black overflow-x-hidden selection:bg-black selection:text-white">
      <LoadingScreen />
      <CustomCursor />
      <Navbar />

      {/* Main Hero Content */}
      <div className="relative h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-white">

        {/* 1. TOP & CENTER: Centered Visual Content */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 pt-20 relative z-10">

          {/* Greeting - Refined */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-6 md:mb-12 text-center"
          >
            <p className="text-[10px] md:text-sm text-gray-400 tracking-[0.4em] uppercase font-bold">
              <span className="text-lg mr-2">👋</span>
              Established in Paris
            </p>
          </motion.div>

          {/* Main Visual Group */}
          <div className="relative w-full flex flex-col items-center justify-center py-4 md:py-10">

            {/* Portrait - Background Layer on Mobile */}
            <motion.div
              style={{ x: imageX, y: imageY }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] md:w-[520px] aspect-[3/4] z-0 pointer-events-none"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=80"
                alt="Portrait"
                className="w-full h-full object-cover grayscale brightness-105 contrast-125 rounded-t-full mask-image-gradient opacity-30 md:opacity-100"
              />
            </motion.div>

            {/* Typography - Foreground */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.h1
                style={{ x: textX, y: textY }}
                className="text-[14vw] md:text-[14vw] leading-[0.8] font-black tracking-tighter text-black text-center select-none"
              >
                Webdesigner
              </motion.h1>

              <motion.h1
                style={{ x: textX, y: textY, WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}
                className="text-[12vw] md:text-[10vw] font-light italic text-transparent -my-2 md:-my-10 text-center select-none"
              >
                &
              </motion.h1>

              <motion.h1
                style={{ x: textX, y: textY, WebkitTextStroke: "1px black" }}
                className="text-[14vw] md:text-[14vw] leading-[0.8] font-black tracking-tighter text-transparent text-center select-none"
              >
                Developer
              </motion.h1>
            </div>
          </div>
        </div>

        {/* 2. BOTTOM: Control Bar / Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full p-6 md:p-12 md:pb-20 space-y-8 md:space-y-0 relative z-20"
        >
          {/* Action Buttons - Pinned Bottom on Mobile */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">

            {/* Location - Left on Desktop, Centered on Mobile */}
            <div className="order-3 md:order-1 text-center md:text-left">
              <p className="text-[10px] md:text-base tracking-[0.3em] uppercase text-gray-400 font-bold whitespace-nowrap">
                Available for Projects — 2024
              </p>
            </div>

            {/* Pinned CTA's - Center Group */}
            <div className="order-1 md:order-2 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href="/design"
                className="bg-black text-white px-10 py-5 text-[10px] md:text-sm font-black tracking-[0.2em] uppercase hover:bg-orange-500 transition-all text-center flex items-center justify-center h-14 w-full sm:min-w-[220px]"
              >
                Start a Project
              </Link>
              <Link
                href="/projects"
                className="bg-white border-2 border-black text-black px-10 py-5 text-[10px] md:text-sm font-black tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all text-center flex items-center justify-center h-14 w-full sm:min-w-[220px]"
              >
                View My Work
              </Link>
            </div>

            {/* Awards Marquee - Right on Desktop, Hidden on Mobile */}
            <div className="hidden lg:flex order-3 items-center overflow-hidden w-[300px] mask-image-gradient-r">
              <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              >
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-8 opacity-20 grayscale font-black text-xs items-center uppercase tracking-[0.2em]">
                    <span>Awwwards</span>
                    <span>FWA</span>
                    <span>CSSDA</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
