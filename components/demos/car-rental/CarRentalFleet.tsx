'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers, FiSettings, FiZap, FiDroplet } from 'react-icons/fi';

import { carRentalFleet } from '@/data/car-rental/fleet';

const categories = ['Tous', 'Sport', 'SUV', 'Berline', 'Électrique', 'Luxe'];

export function CarRentalFleet() {
    const cars = carRentalFleet;
    const [activeCategory, setActiveCategory] = useState('Tous');
    const [hoveredCar, setHoveredCar] = useState<number | null>(null);

    const filteredCars = activeCategory === 'Tous'
        ? cars
        : cars.filter(car => car.category === activeCategory);

    return (
        <section className="py-32 bg-[#0F0F0F] text-white relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(#FF6B35 1px, transparent 1px), linear-gradient(90deg, #FF6B35 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[#FF6B35] text-xs uppercase tracking-[0.3em] block mb-4"
                        >
                            Notre Flotte
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black tracking-tight"
                        >
                            Véhicules<br />
                            <span aria-hidden="true" className="text-white/20">Premium</span>
                        </motion.h2>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mt-8 lg:mt-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-3 text-xs uppercase tracking-wider font-bold transition-all ${activeCategory === cat
                                    ? 'bg-[#FF6B35] text-white'
                                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredCars.map((car, index) => (
                            <motion.div
                                key={car.id}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-white/5 border border-white/10 overflow-hidden"
                                onMouseEnter={() => setHoveredCar(car.id)}
                                onMouseLeave={() => setHoveredCar(null)}
                            >
                                {/* Image */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={car.image}
                                        alt={car.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                    {/* Category Badge */}
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#FF6B35] text-white text-[10px] uppercase tracking-wider font-bold">
                                        {car.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-4 group-hover:text-[#FF6B35] transition-colors">
                                        {car.name}
                                    </h3>

                                    {/* Specs */}
                                    <div className="grid grid-cols-4 gap-4 mb-6">
                                        <div className="text-center">
                                            <FiUsers className="w-4 h-4 mx-auto mb-1 text-white/40" />
                                            <span className="text-xs text-white/60">{car.specs.seats}</span>
                                        </div>
                                        <div className="text-center">
                                            <FiSettings className="w-4 h-4 mx-auto mb-1 text-white/40" />
                                            <span className="text-xs text-white/60">{car.specs.transmission}</span>
                                        </div>
                                        <div className="text-center">
                                            <FiZap className="w-4 h-4 mx-auto mb-1 text-white/40" />
                                            <span className="text-xs text-white/60">{car.specs.hp} HP</span>
                                        </div>
                                        <div className="text-center">
                                            <FiDroplet className="w-4 h-4 mx-auto mb-1 text-white/40" />
                                            <span className="text-xs text-white/60">{car.specs.speed}</span>
                                        </div>
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <div>
                                            <span className="text-2xl font-black text-[#FF6B35]">${car.price}</span>
                                            <span className="text-white/40 text-sm">/jour</span>
                                        </div>
                                        <button className="px-6 py-3 bg-white/10 hover:bg-[#FF6B35] text-white text-xs uppercase tracking-wider font-bold transition-colors">
                                            Réserver
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
