"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowDown, FiCamera, FiHome, FiCalendar, FiStar } from "react-icons/fi";

const floatingIcons = [
  { Icon: FiCamera, delay: 0, x: 20, y: 30, size: "w-8 h-8 md:w-10 md:h-10" },
  { Icon: FiHome, delay: 0.2, x: -30, y: 50, size: "w-10 h-10 md:w-12 md:h-12" },
  { Icon: FiCalendar, delay: 0.4, x: 40, y: -20, size: "w-7 h-7 md:w-9 md:h-9" },
  { Icon: FiStar, delay: 0.6, x: -50, y: 30, size: "w-6 h-6 md:w-8 md:h-8" },
];

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Disable mouse parallax on mobile
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  const scrollToNext = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
      
      {/* Mesh gradient overlay - Hidden on mobile for performance */}
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.15),transparent_50%)]" />

      {/* Animated Background Elements - Smaller on mobile */}
      {!isMobile && (
        <>
          <motion.div
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
              scale: [1, 1.2, 1],
            }}
            transition={{ type: "spring", stiffness: 50, duration: 6 }}
            className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-[80px] md:blur-[120px] opacity-40 md:opacity-60"
          />
          <motion.div
            animate={{
              x: -mousePosition.x,
              y: -mousePosition.y,
              scale: [1, 1.1, 1],
            }}
            transition={{ type: "spring", stiffness: 50, duration: 8 }}
            className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-[100px] md:blur-[140px] opacity-40 md:opacity-60"
          />
        </>
      )}

      {/* Floating Icons - Reduced on mobile */}
      {floatingIcons.slice(0, isMobile ? 2 : 4).map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            y: [0, -20, 0],
            x: isMobile ? 0 : [0, item.x * 1.5, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: isMobile ? 5 : 6,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 pointer-events-none hidden sm:block"
          style={{
            transform: `translate(calc(-50% + ${item.x * (isMobile ? 4 : 8)}px), calc(-50% + ${item.y * (isMobile ? 4 : 8)}px))`,
          }}
        >
          <div className={`${item.size} text-primary/30 dark:text-primary/20 relative`}>
            <item.Icon className="w-full h-full" />
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg" />
          </div>
        </motion.div>
      ))}

      {/* Grid Pattern Background - Hidden on mobile */}
      <div className="hidden md:block absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 glass rounded-full text-xs md:text-sm font-medium"
          >
            <FiStar className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-foreground/80">Creative Excellence Since 2014</span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 mb-4 md:mb-6 font-medium tracking-wide uppercase"
          >
            Welcome to
          </motion.p>

          {/* Main Title - Responsive Sizes */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 md:mb-8 leading-[1.1] px-2"
          >
            <span className="block mb-1 md:mb-2">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite]">
                Production
              </span>
            </span>
            <span className="block text-foreground tracking-tight">Boutique</span>
          </motion.h1>

          {/* Description - Responsive */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-foreground/70 max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed font-light px-4"
          >
            We create <span className="font-semibold text-foreground">extraordinary experiences</span> through
            <br className="hidden sm:block" />
            <span className="text-primary">event organization</span>, <span className="text-accent">interior design</span>, 
            <span className="text-primary"> photography</span>, and <span className="text-accent">creative production</span>.
          </motion.p>

          {/* CTA Buttons - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4"
          >
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full sm:w-auto px-8 md:px-10 py-3 md:py-5 bg-gradient-to-r from-primary via-purple-500 to-accent text-white rounded-full font-semibold text-base md:text-lg shadow-[0_10px_40px_rgba(168,85,247,0.4)] hover:shadow-[0_15px_50px_rgba(168,85,247,0.6)] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View Our Portfolio
                <motion.svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-5 glass rounded-full font-semibold text-base md:text-lg hover:bg-secondary/80 transition-all duration-300 border-2 border-transparent hover:border-primary/30"
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Stats Row - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto pt-8 md:pt-12 border-t border-border/50 dark:border-border/30 px-4"
          >
            {[
              { value: "200+", label: "Events" },
              { value: "150+", label: "Projects" },
              { value: "10+", label: "Years" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 md:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-foreground/60 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator - Responsive */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          onClick={scrollToNext}
          className="absolute bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2 group hidden sm:flex flex-col items-center"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <div className="text-foreground/40 text-xs md:text-sm mb-2 font-medium tracking-wider hidden md:block">Scroll</div>
            <div className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-1.5 md:p-2 group-hover:border-primary/50 transition-colors">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary"
              />
            </div>
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
