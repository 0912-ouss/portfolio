'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Magnetic } from './Magnetic';

export function PrivateDining() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section className="py-32 bg-[#121212] text-[#E5E5E5] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="relative rounded-[2rem] overflow-hidden bg-[#0F0F0F] border border-white/5">
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        <div className="relative h-[600px] lg:h-auto min-h-[600px]">
                            <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%]">
                                <Image
                                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2100&auto=format&fit=crop"
                                    alt="Private Dining Room"
                                    fill
                                    className="object-cover grayscale"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-black/40" />
                        </div>

                        <div className="p-16 lg:p-24 flex flex-col justify-center">
                            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#D4AF37] block mb-8">
                                The Private Chamber
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                                Secluded for <br />
                                <span className="italic text-white/40">the momentous.</span>
                            </h2>
                            <p className="text-white/60 font-light leading-relaxed mb-12 max-w-md">
                                A hidden sanctuary behind the cellar. Custom lighting architectures, bespoke auditory environments, and a dedicated culinary team for up to 12 guests.
                            </p>

                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4 text-sm font-sans tracking-wide text-white/80">
                                    <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                                    <span>Curated Tasting Menus</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm font-sans tracking-wide text-white/80">
                                    <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                                    <span>Private Entrance</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm font-sans tracking-wide text-white/80 mb-8">
                                    <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                                    <span>Sommelier Service</span>
                                </div>
                            </div>

                            <div>
                                <Magnetic>
                                    <button className="px-10 py-4 border border-[#D4AF37] text-[#D4AF37] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-500">
                                        Inquire Availability
                                    </button>
                                </Magnetic>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
