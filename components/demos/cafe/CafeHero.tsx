'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

import { CafeSteam } from './CafeSteam';

export function CafeHero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#1F1C18] text-[#E6DCCA]">
            {/* Steam Animation */}
            <CafeSteam />

            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop"
                    alt="Pour Over Coffee"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#1F1C18]" />
            </motion.div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="block text-xs md:text-sm font-sans tracking-[0.4em] text-[#C8AA6E] mb-6 uppercase">
                        The Art of Extraction
                    </span>
                    <h1 className="text-7xl md:text-9xl font-serif font-medium tracking-tight mb-8 text-[#E6DCCA] mix-blend-overlay">
                        KŌHĪ
                    </h1>
                    <p className="max-w-md mx-auto text-sm md:text-base font-light text-[#E6DCCA]/60 leading-relaxed font-sans">
                        Precision. Patience. The perfect pour. <br />
                        Welcome to the atelier of modern brewing.
                    </p>
                </motion.div>
            </div>

            <motion.div
                style={{ opacity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[#E6DCCA]/40"
            >
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#E6DCCA]/40 to-transparent" />
            </motion.div>
        </section>
    );
}
