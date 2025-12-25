"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FiCode, FiLayout, FiPenTool, FiLayers, FiArrowRight, FiDownload, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";

const stats = [
  { value: 50, label: "Projects", icon: FiCode, gradient: "from-violet-500 to-purple-600" },
  { value: 100, label: "Designs", icon: FiLayout, gradient: "from-pink-500 to-rose-500" },
  { value: 200, label: "Graphics", icon: FiPenTool, gradient: "from-orange-500 to-red-500" },
  { value: 5, label: "Years", icon: FiLayers, gradient: "from-cyan-500 to-blue-500" },
];

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "📘" },
  { name: "Node.js", icon: "🟢" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Figma", icon: "🎯" },
];

function Counter({ end, isInView }: { end: number; isInView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = () => {
      start += end / (duration / 16);
      if (start >= end) { setCount(end); return; }
      setCount(Math.floor(start));
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end]);
  return <>{count}</>;
}

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.1 }}
            className="inline-block mb-6"
          >
            <span className="text-7xl">👨‍💻</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Developer & Designer
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-xl mx-auto">
            Building beautiful digital experiences
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`} />
              <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl p-6 border border-border/50 text-center overflow-hidden">
                {/* Animated ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className={`absolute -top-8 -right-8 w-24 h-24 rounded-full border-2 border-dashed ${stat.gradient.includes("violet") ? "border-violet-500/30" : stat.gradient.includes("pink") ? "border-pink-500/30" : stat.gradient.includes("orange") ? "border-orange-500/30" : "border-cyan-500/30"}`}
                />

                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} mb-4 shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  <Counter end={stat.value} isInView={isInView} />+
                </div>
                <div className="text-sm font-medium text-foreground/60 mt-1">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack - Floating Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="px-5 py-3 bg-gradient-to-r from-card to-secondary/50 rounded-full border border-border/50 hover:border-primary/50 transition-all cursor-pointer backdrop-blur-sm shadow-lg hover:shadow-primary/20"
            >
              <span className="mr-2">{tech.icon}</span>
              <span className="font-semibold text-foreground/80">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-semibold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 transition-all"
          >
            <FiMail />
            Let's Work Together
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-8 py-4 bg-card/80 backdrop-blur-sm text-foreground rounded-2xl font-semibold border border-border/50 hover:border-primary/50 hover:bg-card transition-all"
          >
            <FiDownload />
            Download CV
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4 mt-8"
        >
          {[
            { icon: FiGithub, href: "#", label: "GitHub" },
            { icon: FiLinkedin, href: "#", label: "LinkedIn" },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all"
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
