"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, className = "" }: SectionTitleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`text-center mb-16 md:mb-20 ${className}`}>
      {/* Decorative Line */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: "80px", opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6 rounded-full"
      />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
      >
        <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite]">
          {title}
        </span>
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed font-light"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
