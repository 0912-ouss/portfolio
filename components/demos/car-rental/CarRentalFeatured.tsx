'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiUsers, FiSettings, FiZap } from 'react-icons/fi';

const featuredCars = [
    {
        id: 1,
        name: "Porsche 911 GT3",
        tagline: "Né sur la Piste",
        price: 499,
        specs: { hp: "502", speed: "318 km/h", accel: "3.2s" },
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
        color: "#FF6B35"
    },
    {
        id: 2,
        name: "Mercedes-AMG GT",
        tagline: "Excellence Artisanale",
        price: 449,
        specs: { hp: "523", speed: "310 km/h", accel: "3.6s" },
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop",
        color: "#C0C0C0"
    },
    {
        id: 3,
        name: "BMW M8 Competition",
        tagline: "Performance Ultime",
        price: 399,
        specs: { hp: "617", speed: "305 km/h", accel: "3.0s" },
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop",
        color: "#1E90FF"
    }
];

export function CarRentalFeatured() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % featuredCars.length);
    const prev = () => setCurrent((prev) => (prev - 1 + featuredCars.length) % featuredCars.length);

    const currentCar = featuredCars[current];

    return (
        <section className="py-32 bg-[#0F0F0F] text-white relative overflow-hidden">
            {/* Background Accent */}
            <div aria-hidden="true"
                className="absolute inset-0 opacity-10 transition-colors duration-700"
                style={{
                    background: `radial-gradient(circle at 70% 50%, ${currentCar.color}40, transparent 60%)`
                }}
            />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Content */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[#FF6B35] text-xs uppercase tracking-[0.3em] block mb-4"
                        >
                            Véhicule en Vedette
                        </motion.span>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
                                    {currentCar.name}
                                </h2>
                                <p className="text-xl text-white/50 font-light mb-8">
                                    {currentCar.tagline}
                                </p>

                                {/* Specs */}
                                <div className="grid grid-cols-3 gap-6 mb-12">
                                    <div className="p-4 bg-white/5 border border-white/10">
                                        <span className="text-2xl font-black text-[#FF6B35]">{currentCar.specs.hp}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-white/40 block mt-1">Puissance</span>
                                    </div>
                                    <div className="p-4 bg-white/5 border border-white/10">
                                        <span className="text-2xl font-black text-[#FF6B35]">{currentCar.specs.speed}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-white/40 block mt-1">Vitesse Max</span>
                                    </div>
                                    <div className="p-4 bg-white/5 border border-white/10">
                                        <span className="text-2xl font-black text-[#FF6B35]">{currentCar.specs.accel}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-white/40 block mt-1">0-100 km/h</span>
                                    </div>
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-center gap-8">
                                    <div>
                                        <span className="text-4xl font-black text-white">${currentCar.price}</span>
                                        <span className="text-white/40">/jour</span>
                                    </div>
                                    <button className="px-8 py-4 bg-[#FF6B35] text-white font-bold uppercase tracking-wider text-sm hover:bg-[#FF8C42] transition-colors">
                                        Réserver
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center gap-4 mt-12">
                            <button
                                onClick={prev}
                                className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-colors"
                            >
                                <FiChevronLeft />
                            </button>
                            <div className="flex gap-2">
                                {featuredCars.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrent(i)}
                                        className={`w-8 h-1 transition-colors ${i === current ? 'bg-[#FF6B35]' : 'bg-white/20'
                                            }`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={next}
                                className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-colors"
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>

                    {/* Right - Car Image */}
                    <div className="relative h-[400px] lg:h-[600px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, x: 100, rotate: 5 }}
                                animate={{ opacity: 1, x: 0, rotate: 0 }}
                                exit={{ opacity: 0, x: -100, rotate: -5 }}
                                transition={{ duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={currentCar.image}
                                    alt={currentCar.name}
                                    fill
                                    className="object-cover object-center"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-transparent to-transparent" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="absolute bottom-8 right-8 px-4 py-2 bg-[#FF6B35] text-white text-xs uppercase tracking-wider font-bold"
                        >
                            Sélection Premium
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
