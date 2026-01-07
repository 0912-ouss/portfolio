"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/data";
import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";

const categories = ["All", "Web Design", "Healthcare", "Beauty", "Restaurant", "Real Estate", "Ecommerce", "Fitness"];

interface FawziProjectsProps {
    showFullButton?: boolean;
    limit?: number;
}

export function FawziProjects({ showFullButton = true, limit }: FawziProjectsProps) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    const filteredProjects = projects.filter(project => {
        if (activeCategory === "All") return true;

        // Handle "Web Design" as a special case if needed, or slugify the active category
        const categorySlug = activeCategory.toLowerCase().replace(" ", "-");
        return project.category.toLowerCase() === categorySlug;
    });

    const displayProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

    return (
        <section id="projects" className="py-24 px-4 md:px-20 bg-white dark:bg-[#1E1E1E]">
            <div className="container mx-auto">
                {!limit && (
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-7xl font-black text-black dark:text-white tracking-tighter"
                        >
                            Featured <span className="text-orange-500 italic">Work</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-500 dark:text-gray-400 text-lg"
                        >
                            Crafting high-impact digital solutions across industries.
                        </motion.p>
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    {categories.map((cat, idx) => (
                        <motion.button
                            key={cat}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 rounded-full border-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeCategory === cat
                                ? "bg-orange-500 border-orange-500 text-white shadow-xl shadow-orange-500/20 scale-105"
                                : "bg-transparent border-gray-100 text-black/40 dark:border-white/5 dark:text-white/40 hover:border-orange-500/50 hover:text-black dark:hover:text-white"
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <AnimatePresence mode="popLayout">
                        {displayProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: idx * 0.1
                                }}
                                onClick={() => setSelectedProject(project)}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900 mb-6 shadow-sm group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-700 ease-out border dark:border-white/5">

                                    {/* Main Project Image */}
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                                    />

                                    {/* Hover Overlay Reveal */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/90 via-orange-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-8">
                                        <div className="flex justify-end">
                                            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all delay-100">
                                                View Case Study
                                            </div>
                                        </div>

                                        <div className="space-y-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="text-[10px] font-black uppercase tracking-widest bg-white text-orange-600 px-3 py-1 rounded-full shadow-lg">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-3xl font-black text-white tracking-tighter">
                                                    {project.title}
                                                </h3>
                                                <div className="w-12 h-12 rounded-full bg-white text-orange-600 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all">
                                                    <span className="text-xl font-bold">→</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Category Badge (Always Visible) */}
                                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg border dark:border-gray-800 z-10 group-hover:opacity-0 transition-opacity duration-300">
                                        <p className="text-orange-500 text-[10px] font-black tracking-widest uppercase">{project.category}</p>
                                    </div>
                                </div>

                                {/* Static Info */}
                                <div className="space-y-1 px-1">
                                    <h3 className="text-2xl font-black text-black dark:text-white group-hover:text-orange-500 transition-colors tracking-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium line-clamp-2 leading-relaxed opacity-80">
                                        {project.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {showFullButton && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-24 flex justify-center"
                    >
                        <Link
                            href="/projects"
                            className="group relative px-12 py-5 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-sm rounded-full overflow-hidden transition-all hover:pr-16 border dark:border-white/10"
                        >
                            <span className="relative z-10 transition-colors group-hover:text-orange-500">Explore Full Showcase</span>
                            <div className="absolute right-[-100%] top-0 h-full w-full bg-orange-500 transition-all group-hover:right-[-85%] flex items-center justify-center">
                                <span className="font-bold text-lg">→</span>
                            </div>
                        </Link>
                    </motion.div>
                )}
            </div>

            {/* Project Case Study Case Study Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 50, opacity: 0 }}
                            className="bg-white dark:bg-[#1A1A1A] w-full max-w-6xl max-h-[90vh] rounded-[3rem] overflow-hidden relative shadow-2xl border dark:border-white/5 flex flex-col md:flex-row"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 w-12 h-12 bg-black/10 dark:bg-white/10 rounded-full flex items-center justify-center text-lg hover:bg-orange-500 hover:text-white transition-all z-20"
                            >
                                <FaTimes />
                            </button>

                            {/* Left: Image Showcase */}
                            <div className="flex-1 h-[40vh] md:h-full relative overflow-hidden">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                            </div>

                            {/* Right: Detailed Info */}
                            <div className="flex-1 p-8 md:p-16 flex flex-col justify-center overflow-y-auto">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <p className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs">
                                            {selectedProject.category}
                                        </p>
                                        <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter leading-none">
                                            {selectedProject.title}
                                        </h2>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {selectedProject.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-black uppercase tracking-widest border border-gray-200 dark:border-white/10 px-4 py-2 rounded-full dark:text-gray-400">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Project Overview</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                                            {selectedProject.description}
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-500 text-sm italic">
                                            This project focused on high-conversion UI patterns and seamless user journeys tailored for the {selectedProject.category} industry.
                                        </p>
                                    </div>

                                    <div className="pt-8 flex flex-col sm:flex-row gap-4">
                                        <Link
                                            href={selectedProject.link}
                                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-center text-sm shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-3"
                                        >
                                            View Live Demo <FaExternalLinkAlt />
                                        </Link>
                                        <button
                                            onClick={() => setSelectedProject(null)}
                                            className="px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm border-2 border-gray-100 dark:border-white/5 hover:border-orange-500/50 transition-all"
                                        >
                                            Next Project →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
