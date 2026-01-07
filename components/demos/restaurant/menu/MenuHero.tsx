'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function MenuHero() {
    return (
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920&auto=format&fit=crop)',
                }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

            {/* Decorative Pattern */}
            <div aria-hidden="true" className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-orange-400 text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-4"
                >
                    Authentic Italian Cuisine
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-serif font-bold text-white uppercase tracking-widest mb-6"
                >
                    Our Menu
                </motion.h1>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="w-32 h-1 bg-orange-500 mx-auto mb-6"
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8"
                >
                    From wood-fired pizzas to handmade pastas, every dish is crafted with love and the finest ingredients.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase tracking-widest text-sm py-4 px-8 rounded-full transition-all hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1">
                        Order Online
                    </button>
                    <Link
                        href="/demos/restaurant/contact"
                        className="bg-white/10 backdrop-blur hover:bg-white/20 text-white font-bold uppercase tracking-widest text-sm py-4 px-8 rounded-full border border-white/30 transition-all hover:-translate-y-1"
                    >
                        Reserve a Table
                    </Link>
                </motion.div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f8f5f2] to-transparent" />
        </section>
    );
}
