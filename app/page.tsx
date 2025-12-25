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
      <div className="relative min-h-screen flex flex-col justify-center items-center pt-32 md:pt-48 pb-10 overflow-hidden">

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="text-center mb-4 md:mb-8 relative z-40 flex items-center gap-2"
        >
          <span className="text-xl md:text-2xl">👋</span>
          <p className="text-sm md:text-xl text-gray-600 font-light">
            , my name is Bazil and I am a freelance
          </p>
        </motion.div>

        {/* Giant Typography & Image Container */}
        <div className="relative w-full max-w-[1600px] mx-auto px-4 flex flex-col items-center justify-center h-[50vh] md:h-[70vh]">

          {/* Top Text: Webdesigner - BEHIND IMAGE */}
          <motion.h1
            style={{ x: textX, y: textY }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[13vw] md:text-[14vw] leading-[0.8] font-black tracking-tighter text-black relative z-10 mix-blend-normal text-center w-full select-none"
          >
            Webdesigner
          </motion.h1>

          {/* Middle Text: & - BEHIND IMAGE (Outlined) */}
          <motion.h1
            style={{ x: textX, y: textY, WebkitTextStroke: "1px black" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="text-[8vw] md:text-[8vw] leading-[0.8] font-light italic text-transparent relative z-0 -my-4 md:-my-8 text-center w-full select-none pointer-events-none"
          >
            &
          </motion.h1>

          {/* Central Image - MIDDLE LAYER */}
          <motion.div
            style={{ x: imageX, y: imageY }}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[480px] aspect-[3/4] z-20 pointer-events-none"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="Bazil Portrait"
              className="w-full h-full object-cover grayscale brightness-110 contrast-125 rounded-t-full mask-image-gradient shadow-2xl"
            />
          </motion.div>

          {/* Bottom Text: Developer - ABOVE IMAGE (Outlined) */}
          <motion.h1
            style={{ x: textX, y: textY, WebkitTextStroke: "1px black" }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[13vw] md:text-[14vw] leading-[0.8] font-black tracking-tighter text-transparent relative z-30 -mt-2 md:-mt-6 text-center w-full select-none pointer-events-none"
          >
            Developer
          </motion.h1>

        </div>

        {/* Bottom Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="fixed bottom-0 left-0 right-0 w-full px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-end z-50 pointer-events-none"
        >

          {/* Left: Location */}
          <div className="mb-4 md:mb-0 pointer-events-auto">
            <p className="text-xl md:text-2xl text-gray-700 font-normal">based in Paris, France.</p>
          </div>

          {/* Center: Buttons */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex gap-4 pointer-events-auto">
            <Link href="/design" className="bg-black text-white px-6 py-4 text-sm font-bold hover:bg-gray-900 transition-colors transform hover:-translate-y-1 duration-300">
              You need a designer
            </Link>
            <Link href="/projects" className="bg-white border border-black text-black px-6 py-4 text-sm font-bold hover:bg-gray-50 transition-colors transform hover:-translate-y-1 duration-300">
              You need a developer
            </Link>
          </div>

          {/* Right: Scrolling Awards */}
          <div className="flex items-center overflow-hidden w-[200px] md:w-[300px] mask-image-gradient-r pointer-events-auto">
            <motion.div
              className="flex gap-8 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-8 opacity-40 grayscale font-bold text-xl items-center">
                  <span>Awwwards.</span>
                  <span>FWA</span>
                  <span>CSSDA</span>
                </div>
              ))}
            </motion.div>
          </div>

        </motion.div>

      </div>
    </main>
  );
}
