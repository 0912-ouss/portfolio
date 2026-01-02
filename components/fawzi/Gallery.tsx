"use client";

import { motion } from "framer-motion";
import { galleryItems } from "@/lib/data";
import { useRef } from "react";
import Link from "next/link";

interface FawziGalleryProps {
    limit?: number;
    showFullButton?: boolean;
}

export function FawziGallery({ limit, showFullButton = true }: FawziGalleryProps) {
    const containerRef = useRef(null);
    const displayItems = limit ? galleryItems.slice(0, limit) : galleryItems;

    return (
        <section id="gallery" className="py-32 px-4 md:px-20 bg-white dark:bg-[#1E1E1E]">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl space-y-4">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm"
                        >
                            Showcase
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-black text-black dark:text-white tracking-tighter"
                        >
                            Visual <span className="text-gray-300 dark:text-gray-700">Artifacts</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="max-w-sm text-gray-500 text-sm md:text-base leading-relaxed"
                    >
                        A curated selection of graphics, branding components, and UI experiments from my design lab.
                    </motion.p>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                    {displayItems.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.8,
                                delay: idx % 3 * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            whileHover={{ y: -10 }}
                            className="relative group overflow-hidden rounded-[2rem] break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-700 cursor-none"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                            />

                            {/* Interactive Overlay */}
                            <div className="absolute inset-0 bg-orange-500/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 transform translate-y-full group-hover:translate-y-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="space-y-2"
                                >
                                    <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">{item.category}</p>
                                    <h4 className="text-white font-black text-3xl tracking-tighter">{item.title}</h4>

                                    <div className="pt-4 overflow-hidden">
                                        <motion.div
                                            initial={{ x: -100 }}
                                            whileHover={{ x: 0 }}
                                            className="h-1 w-20 bg-white"
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Decorative Corner */}
                            <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-white/0 group-hover:border-white/50 transition-all duration-500 rounded-tr-xl" />
                        </motion.div>
                    ))}
                </div>

                {showFullButton && limit && galleryItems.length > limit && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 flex justify-center"
                    >
                        <Link
                            href="/design"
                            className="group relative px-12 py-5 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-sm rounded-full overflow-hidden transition-all hover:pr-16"
                        >
                            <span className="relative z-10 transition-colors group-hover:text-orange-500">View Full Gallery</span>
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
