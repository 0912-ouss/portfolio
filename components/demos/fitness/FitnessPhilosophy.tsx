'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function FitnessPhilosophy() {
    const text = "La force n'est pas seulement physique ; c'est un état de précision. Chez Elysium, nous sculptons non seulement le corps, mais aussi l'esprit avec une rigueur architecturale.";

    const { scrollYProgress } = useScroll();
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <section className="py-40 bg-[#050505] relative overflow-hidden">
            {/* Background Decorative Element */}
            <motion.div
                style={{ x }}
                className="absolute top-1/2 left-0 -translate-y-1/2 text-[30vw] font-black text-white/[0.02] whitespace-nowrap select-none pointer-events-none uppercase"
            >
                Philosophy
            </motion.div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-[#D4AF37] text-[10px] uppercase tracking-[1em] font-black block mb-12 text-center"
                    >
                        Notre Manifeste
                    </motion.span>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-center text-white leading-tight uppercase tracking-tight">
                        {text.split(' ').map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className="inline-block mr-3"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
                        className="h-px w-40 bg-[#D4AF37] mx-auto mt-20"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold text-center mt-12"
                    >
                        Science of Strength & Precision
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
