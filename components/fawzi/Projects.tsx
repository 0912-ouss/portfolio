"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/data";

const categories = ["All", "Web Design", "Healthcare", "Beauty", "Restaurant", "Real Estate", "Ecommerce"];

interface FawziProjectsProps {
    showFullButton?: boolean;
    limit?: number;
}

export function FawziProjects({ showFullButton = true, limit }: FawziProjectsProps) {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = projects.filter(project => {
        if (activeCategory === "All") return true;
        if (activeCategory === "Web Design") return true;
        return project.category.toLowerCase() === activeCategory.toLowerCase();
    });

    const displayProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

    return (
        <section className="py-24 px-4 md:px-20 bg-white dark:bg-[#1E1E1E]">
            <div className="container mx-auto">
                {!limit && (
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-black dark:text-white"
                        >
                            My Projects
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-600 dark:text-gray-400 text-sm md:text-base"
                        >
                            Explore my diverse portfolio ranging from healthcare platforms to luxury real estate websites.
                        </motion.p>
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
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
                                : "bg-transparent border-gray-200 text-black/40 dark:border-gray-800 dark:text-white/40 hover:border-orange-500/50 hover:text-black dark:hover:text-white"
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
                                className="group cursor-pointer"
                            >
                                <Link href={project.link}>
                                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 mb-6 shadow-sm group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-700 ease-out border dark:border-gray-800">

                                        {/* Main Project Image */}
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                                        />

                                        {/* Hover Overlay Reveal */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                            <div className="space-y-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tags.slice(0, 3).map(tag => (
                                                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-orange-500 text-white px-3 py-1 rounded-full shadow-lg shadow-orange-500/20">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-3xl font-black text-white tracking-tighter">
                                                        {project.title}
                                                    </h3>
                                                    <div className="w-12 h-12 rounded-full bg-white text-orange-600 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all">
                                                        <span className="text-xl font-bold">↗</span>
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
                                        <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-orange-500 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium line-clamp-2 leading-relaxed opacity-80">
                                            {project.description}
                                        </p>
                                    </div>
                                </Link>
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
                            className="group relative px-12 py-5 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-sm rounded-full overflow-hidden transition-all hover:pr-16"
                        >
                            <span className="relative z-10 transition-colors group-hover:text-orange-500">Explore Full Showcase</span>
                            <div className="absolute right-[-100%] top-0 h-full w-full bg-orange-500 transition-all group-hover:right-[-85%] flex items-center justify-center">
                                <span className="font-bold text-lg">→</span>
                            </div>
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
