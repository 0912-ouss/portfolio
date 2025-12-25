'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export function EcommerceBanner() {
    const { scrollYProgress } = useScroll();
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

    return (
        <section className="py-24 bg-[#1A1A1A] text-white overflow-hidden relative">
            {/* Scrolling Text Background */}
            <motion.div
                style={{ x }}
                className="absolute inset-0 flex items-center whitespace-nowrap pointer-events-none"
            >
                <span className="text-[200px] font-black text-white/[0.02] uppercase tracking-tighter">
                    WINTER SALE • UP TO 50% OFF • WINTER SALE • UP TO 50% OFF •
                </span>
            </motion.div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-center lg:text-left"
                    >
                        <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="inline-block px-4 py-2 bg-[#D4A574] text-white text-xs uppercase tracking-wider font-bold mb-6"
                        >
                            Limited Time
                        </motion.span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">
                            Winter<br />
                            <span className="font-serif italic">Sale</span>
                        </h2>
                        <p className="text-white/60 mb-8 max-w-md font-light">
                            Up to 50% off on selected items. Elevate your winter wardrobe with our curated collection of luxury pieces.
                        </p>
                    </motion.div>

                    {/* Right - CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center lg:items-end gap-6"
                    >
                        {/* Countdown-like display */}
                        <div className="flex gap-4">
                            {[
                                { value: "02", label: "Days" },
                                { value: "18", label: "Hours" },
                                { value: "45", label: "Mins" }
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-16 h-16 bg-white/10 flex items-center justify-center text-2xl font-bold">
                                        {item.value}
                                    </div>
                                    <span className="text-[10px] uppercase tracking-wider text-white/40 mt-2 block">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <button className="group flex items-center gap-4 px-8 py-4 bg-white text-[#1A1A1A] font-medium uppercase tracking-wider text-sm hover:bg-[#D4A574] hover:text-white transition-colors">
                            Shop Sale
                            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Animated Particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#D4A574] rounded-full"
                    style={{
                        left: `${10 + i * 12}%`,
                        top: `${20 + (i % 3) * 30}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}
        </section>
    );
}
