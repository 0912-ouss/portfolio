'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function FeatureSection() {
    return (
        <section className="bg-[#1a1a1a] text-white py-24 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

                {/* Gallery / Collage */}
                <div className="relative h-[500px] w-full hidden lg:block">
                    {/* Top Image */}
                    <motion.div
                        initial={{ x: -100, rotate: -20, opacity: 0 }}
                        whileInView={{ x: 0, rotate: -6, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="absolute top-0 left-0 w-3/5 h-[300px] z-10 transform -rotate-6 shadow-2xl border-4 border-white/10 overflow-hidden rounded-lg"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src="https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=800&auto=format&fit=crop"
                                alt="Pizza closeup"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Bottom Image */}
                    <motion.div
                        initial={{ x: 100, rotate: 20, opacity: 0 }}
                        whileInView={{ x: 0, rotate: 3, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute bottom-10 right-0 w-3/5 h-[300px] z-20 transform rotate-3 shadow-2xl border-4 border-white/10 overflow-hidden rounded-lg"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop"
                                alt="Chef cooking"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Text Badge */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, type: "spring" }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="absolute bottom-40 left-20 bg-black p-8 z-30 text-center border border-white/20 shadow-xl backdrop-blur-md bg-black/80 cursor-default"
                    >
                        <span className="block text-4xl font-serif font-bold text-white mb-2">Original</span>
                        <span className="block text-orange-500 text-xs tracking-[0.3em] uppercase">CRUST<br />PIZZA</span>
                    </motion.div>
                </div>

                {/* Text Content */}
                <div className="space-y-8 relative z-40">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl lg:text-5xl font-serif font-bold leading-tight"
                    >
                        CHICAGO-STYLE THIN CRUST PIZZA THAT EVEN TEXANS WILL LOVE
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 leading-relaxed text-sm max-w-md"
                    >
                        Crust Pizza is the locally-owned place for delicious, made-from-scratch pizzas served in an upscale, comfortable, family-friendly environment.
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        whileHover={{ x: 10 }}
                        className="text-orange-500 text-xs font-bold uppercase tracking-widest border-b-2 border-orange-500 pb-1 hover:text-white hover:border-white transition-colors"
                    >
                        Read Our Story
                    </motion.button>
                </div>

            </div>
        </section>
    );
}
