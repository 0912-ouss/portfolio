'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Magnetic } from './Magnetic';
import { FiArrowDown } from 'react-icons/fi';

export function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 300]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#0F0F0F] text-[#E5E5E5] flex items-center justify-center">

            {/* Cinematic Background */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
                    alt="Lumière Culinary Experience"
                    fill
                    className="object-cover opacity-60 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-black/40" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="text-xs md:text-sm font-sans uppercase tracking-[0.3em] text-[#D4AF37] mb-6 block">
                        Gastronomy in Amber & Onyx
                    </span>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium tracking-tight leading-none mb-12 mix-blend-overlay opacity-90">
                        LUMIÈRE
                    </h1>

                    <div className="max-w-xl mx-auto mb-16">
                        <p className="text-sm md:text-base font-light text-white/60 leading-relaxed font-sans">
                            Where fire meets precision. An elemental dining experience crafted for the modern palate.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <Magnetic>
                            <button className="px-10 py-4 bg-[#D4AF37] text-black text-xs uppercase font-bold tracking-[0.2em] hover:bg-white transition-colors duration-500">
                                Reserve Table
                            </button>
                        </Magnetic>
                        <Magnetic>
                            <button className="px-10 py-4 border border-white/20 text-white text-xs uppercase font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-500">
                                View Menu
                            </button>
                        </Magnetic>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 mix-blend-difference z-20"
            >
                <span className="text-[10px] uppercase tracking-[0.3em]">Explore</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FiArrowDown className="w-5 h-5 opacity-60" />
                </motion.div>
            </motion.div>
        </section>
    );
}
