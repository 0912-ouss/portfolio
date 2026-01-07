'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const galleryImages = [
    {
        src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2000&auto=format&fit=crop",
        alt: "Coffee Bar Counter",
        category: "Intérieur"
    },
    {
        src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2000&auto=format&fit=crop",
        alt: "Espresso Machine",
        category: "Équipement"
    },
    {
        src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000&auto=format&fit=crop",
        alt: "Cozy Seating",
        category: "Atmosphère"
    },
    {
        src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop",
        alt: "Cafe Window View",
        category: "Intérieur"
    },
    {
        src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2000&auto=format&fit=crop",
        alt: "Barista at Work",
        category: "Savoir-faire"
    },
    {
        src: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2000&auto=format&fit=crop",
        alt: "Latte Art",
        category: "Savoir-faire"
    }
];

export function CafeGallery() {
    const [lightboxOpen, setLightboxOpen] = useState<number | null>(null);

    const openLightbox = (index: number) => setLightboxOpen(index);
    const closeLightbox = () => setLightboxOpen(null);

    const navigateLightbox = (direction: 'prev' | 'next') => {
        if (lightboxOpen === null) return;
        const length = galleryImages.length;
        if (direction === 'next') {
            setLightboxOpen((lightboxOpen + 1) % length);
        } else {
            setLightboxOpen((lightboxOpen - 1 + length) % length);
        }
    };

    return (
        <section className="py-32 bg-[#1F1C18] text-[#E6DCCA] relative overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="text-xs font-sans tracking-[0.3em] text-[#C8AA6E] uppercase block mb-4">
                            L'Espace
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif">Atmosphère & Savoir-faire</h2>
                    </motion.div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative cursor-pointer overflow-hidden ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                                }`}
                            onClick={() => openLightbox(index)}
                        >
                            <div className={`relative ${index === 0 ? 'aspect-square' : 'aspect-[4/3]'} overflow-hidden bg-[#1A1714]`}>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />

                                {/* Overlay Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8AA6E] mb-2">
                                        {image.category}
                                    </span>
                                    <h4 className="text-lg font-serif text-white">
                                        {image.alt}
                                    </h4>
                                </div>

                                {/* Corner Accent */}
                                <div className="absolute top-4 right-4 w-8 h-8 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
                        >
                            <FiX className="w-6 h-6" />
                        </button>

                        {/* Navigation */}
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                            className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        >
                            <FiChevronLeft className="w-8 h-8" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                            className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        >
                            <FiChevronRight className="w-8 h-8" />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={lightboxOpen}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-[90vw] h-[80vh] max-w-6xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={galleryImages[lightboxOpen].src}
                                alt={galleryImages[lightboxOpen].alt}
                                fill
                                className="object-contain"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8AA6E] block mb-2">
                                    {galleryImages[lightboxOpen].category}
                                </span>
                                <h4 className="text-xl font-serif text-white">
                                    {galleryImages[lightboxOpen].alt}
                                </h4>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
