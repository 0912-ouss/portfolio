"use client";

import { motion, AnimatePresence } from "framer-motion";
import { galleryItems } from "@/lib/data";
import { useRef, useState } from "react";
import Link from "next/link";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface FawziGalleryProps {
    limit?: number;
    showFullButton?: boolean;
}

export function FawziGallery({ limit, showFullButton = true }: FawziGalleryProps) {
    const containerRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const displayItems = limit ? galleryItems.slice(0, limit) : galleryItems;

    const navigate = (direction: "next" | "prev") => {
        if (selectedImage === null) return;
        if (direction === "next") {
            setSelectedImage((selectedImage + 1) % galleryItems.length);
        } else {
            setSelectedImage((selectedImage - 1 + galleryItems.length) % galleryItems.length);
        }
    };

    return (
        <section id="gallery" className="py-32 px-4 md:px-20 bg-white dark:bg-[#1E1E1E]">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl space-y-4">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm"
                        >
                            Vitrine
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-5xl md:text-7xl font-black text-black dark:text-white tracking-tighter"
                        >
                            Artefacts <span className="text-gray-300 dark:text-gray-700">Visuels</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-sm text-gray-500 text-sm md:text-base leading-relaxed"
                    >
                        Une sélection curatée de graphismes, composants de marque et expériences UI de mon laboratoire de design.
                    </motion.p>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                    {displayItems.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: idx % 3 * 0.05,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedImage(idx)}
                            className="relative group overflow-hidden rounded-[2rem] break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                            />

                            {/* Interactive Overlay */}
                            <div className="absolute inset-0 bg-orange-600/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 transform translate-y-full group-hover:translate-y-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-2"
                                >
                                    <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">{item.category}</p>
                                    <h4 className="text-white font-black text-3xl tracking-tighter">{item.title}</h4>
                                    <p className="text-white/60 text-xs font-semibold">Cliquer pour agrandir</p>
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
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-20 flex justify-center"
                    >
                        <Link
                            href="/design"
                            className="group relative px-12 py-5 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-sm rounded-full overflow-hidden transition-all hover:pr-16"
                        >
                            <span className="relative z-10 transition-colors group-hover:text-orange-500">Voir toute la Galerie</span>
                            <div className="absolute right-[-100%] top-0 h-full w-full bg-orange-500 transition-all group-hover:right-[-85%] flex items-center justify-center">
                                <span className="font-bold text-lg">→</span>
                            </div>
                        </Link>
                    </motion.div>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 md:p-20"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-8 right-8 text-white text-4xl hover:text-orange-500 transition-colors z-50 focus:outline-none"
                            aria-label="Close lightbox"
                        >
                            <FaTimes />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            onClick={() => navigate("prev")}
                            className="absolute left-8 text-white/50 hover:text-white text-4xl transition-all hidden md:block focus:outline-none"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={() => navigate("next")}
                            className="absolute right-8 text-white/50 hover:text-white text-4xl transition-all hidden md:block focus:outline-none"
                        >
                            <FaChevronRight />
                        </button>

                        {/* Image Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="relative max-w-6xl w-full max-h-full flex flex-col items-center"
                        >
                            <img
                                src={galleryItems[selectedImage].image}
                                alt={galleryItems[selectedImage].title}
                                className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-xl shadow-2xl"
                            />

                            <div className="mt-8 text-center space-y-2">
                                <p className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs">
                                    {galleryItems[selectedImage].category}
                                </p>
                                <h3 className="text-white text-3xl md:text-5xl font-black tracking-tighter">
                                    {galleryItems[selectedImage].title}
                                </h3>
                                <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base">
                                    Fait partie de ma collection d'artefacts de design présentée chez OU BERHAYLA.
                                </p>
                            </div>

                            {/* Mobile Swipe Simulation Info */}
                            <div className="md:hidden mt-4 text-gray-500 text-xs">
                                Appuyez sur les côtés pour naviguer
                            </div>
                        </motion.div>

                        {/* Invisible tap areas for mobile navigation */}
                        <div className="absolute inset-y-0 left-0 w-1/4 md:hidden" onClick={() => navigate("prev")} />
                        <div className="absolute inset-y-0 right-0 w-1/4 md:hidden" onClick={() => navigate("next")} />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
