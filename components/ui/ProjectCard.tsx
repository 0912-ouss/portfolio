"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/data";
import { useTilt } from "@/hooks/use-tilt";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref, tiltStyle, glareStyle, handleMouseMove, handleMouseLeave, hasGlare } = useTilt({
    max: 10,
    scale: 1.02,
    glare: true,
  });

  return (
    <Link href={project.link} className="block">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
        className="group relative card overflow-hidden cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative h-72 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="absolute top-4 right-4 px-4 py-2 bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-full text-xs font-semibold text-foreground/80 border border-border/50 shadow-lg"
          >
            {project.category}
          </motion.div>

          {/* External Link Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="absolute top-4 left-4 w-10 h-10 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FiExternalLink className="w-5 h-5 text-primary" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="text-2xl font-bold group-hover:text-primary transition-colors"
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="text-sm text-foreground/70 line-clamp-2"
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                className="px-3 py-1.5 bg-background/80 dark:bg-background/50 rounded-lg text-xs font-medium text-foreground/80 border border-border/50"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Bottom Link */}
          <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
            <span>View Demo</span>
            <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Shine Effect on Hover */}
        <div aria-hidden="true" className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Glare Effect */}
        {hasGlare && <div style={glareStyle} />}
      </motion.div>
    </Link>
  );
}
