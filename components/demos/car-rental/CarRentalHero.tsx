'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiMapPin } from 'react-icons/fi';

export function CarRentalHero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 300]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-[#0A0A0A] text-white">
            {/* Background Image */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury Car"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 h-screen flex items-center">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            <span className="inline-block px-4 py-2 bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-[#FF6B35] text-xs uppercase tracking-[0.3em] mb-8">
                                Premium Fleet Available
                            </span>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-8">
                                Drive Your<br />
                                <span className="text-[#FF6B35]">Dream</span> Today
                            </h1>

                            <p className="text-lg md:text-xl text-white/60 font-light max-w-lg mb-12 leading-relaxed">
                                Experience luxury on wheels. From sports cars to SUVs, find the perfect vehicle for your journey.
                            </p>

                            {/* Quick Booking Widget */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <button className="group flex items-center gap-4 px-8 py-4 bg-[#FF6B35] text-white font-bold uppercase tracking-wider text-sm hover:bg-[#FF8C42] transition-colors">
                                    Book Now
                                    <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                                <button className="flex items-center gap-4 px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-wider text-sm hover:bg-white/5 transition-colors">
                                    View Fleet
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Booking Bar */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-0 left-0 right-0 z-20"
            >
                <div className="container mx-auto px-6 lg:px-12 pb-12">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 lg:p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                            <FiMapPin className="text-[#FF6B35] w-6 h-6" />
                            <div>
                                <span className="text-[10px] uppercase tracking-widest text-white/40 block">Pick-up</span>
                                <span className="text-white font-medium">Los Angeles, CA</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                            <FiCalendar className="text-[#FF6B35] w-6 h-6" />
                            <div>
                                <span className="text-[10px] uppercase tracking-widest text-white/40 block">Pick-up Date</span>
                                <span className="text-white font-medium">Dec 24, 2024</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                            <FiCalendar className="text-[#FF6B35] w-6 h-6" />
                            <div>
                                <span className="text-[10px] uppercase tracking-widest text-white/40 block">Return Date</span>
                                <span className="text-white font-medium">Dec 28, 2024</span>
                            </div>
                        </div>
                        <button className="bg-[#FF6B35] hover:bg-[#FF8C42] text-white font-bold uppercase tracking-wider text-sm py-4 transition-colors">
                            Search Cars
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-32 right-12 hidden lg:flex flex-col items-center gap-4 text-white/40"
            >
                <span className="text-[10px] uppercase tracking-widest rotate-90 origin-center">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent" />
            </motion.div>
        </section>
    );
}
