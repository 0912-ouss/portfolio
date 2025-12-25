'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export function EcommerceHero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 300]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-[#FAF8F5] text-[#1A1A1A]">
            {/* Split Layout */}
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Left Content */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-20 py-20 lg:py-0 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="max-w-lg"
                    >
                        <span className="inline-block px-4 py-2 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.3em] mb-8">
                            New Season 2024
                        </span>

                        <h1 className="text-5xl md:text-7xl font-light leading-[0.95] tracking-tight mb-8">
                            Effortless<br />
                            <span className="font-serif italic">Elegance</span>
                        </h1>

                        <p className="text-lg text-[#666] font-light leading-relaxed mb-12">
                            Discover curated collections that blend timeless style with modern sensibility. Luxury redefined for the contemporary wardrobe.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/demos/ecommerce/shop" className="group flex items-center justify-center gap-4 px-8 py-4 bg-[#1A1A1A] text-white font-medium text-sm uppercase tracking-wider hover:bg-[#333] transition-colors">
                                Shop Collection
                                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <Link href="/demos/ecommerce/collections" className="flex items-center justify-center gap-4 px-8 py-4 border border-[#1A1A1A] text-[#1A1A1A] font-medium text-sm uppercase tracking-wider hover:bg-[#1A1A1A] hover:text-white transition-colors">
                                The Library
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Right Image */}
                <motion.div
                    style={{ y }}
                    className="w-full lg:w-1/2 h-[60vh] lg:h-screen relative order-1 lg:order-2"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop"
                        alt="Fashion Collection"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent lg:hidden" />

                    {/* Floating Tag */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-12 right-12 bg-white/90 backdrop-blur-sm p-6 shadow-xl hidden lg:block"
                    >
                        <span className="text-[10px] uppercase tracking-widest text-[#999] block mb-2">
                            Featured
                        </span>
                        <p className="font-medium">Silk Evening Dress</p>
                        <p className="text-[#666] text-sm">$1,250</p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 lg:left-20 lg:translate-x-0 flex flex-col items-center gap-4 text-[#999]"
            >
                <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#999] to-transparent" />
            </motion.div>
        </section>
    );
}
