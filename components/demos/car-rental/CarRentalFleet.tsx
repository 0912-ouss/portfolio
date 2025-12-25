'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers, FiSettings, FiZap, FiDroplet } from 'react-icons/fi';

const categories = ['All', 'Sports', 'SUV', 'Sedan', 'Electric', 'Luxury'];

const cars = [
    {
        id: 1,
        name: "Porsche 911 Carrera",
        category: "Sports",
        price: 299,
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop",
        specs: { seats: 2, transmission: "Auto", power: "450 HP", fuel: "Petrol" }
    },
    {
        id: 2,
        name: "Mercedes-Benz G-Class",
        category: "SUV",
        price: 349,
        image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=800&auto=format&fit=crop",
        specs: { seats: 5, transmission: "Auto", power: "416 HP", fuel: "Petrol" }
    },
    {
        id: 3,
        name: "Tesla Model S Plaid",
        category: "Electric",
        price: 279,
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop",
        specs: { seats: 5, transmission: "Auto", power: "1020 HP", fuel: "Electric" }
    },
    {
        id: 4,
        name: "BMW M5 Competition",
        category: "Sedan",
        price: 259,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop",
        specs: { seats: 5, transmission: "Auto", power: "617 HP", fuel: "Petrol" }
    },
    {
        id: 5,
        name: "Lamborghini Huracán",
        category: "Sports",
        price: 599,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop",
        specs: { seats: 2, transmission: "Auto", power: "630 HP", fuel: "Petrol" }
    },
    {
        id: 6,
        name: "Range Rover Sport",
        category: "Luxury",
        price: 289,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=800&auto=format&fit=crop",
        specs: { seats: 5, transmission: "Auto", power: "395 HP", fuel: "Petrol" }
    }
];

export function CarRentalFleet() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [hoveredCar, setHoveredCar] = useState<number | null>(null);

    const filteredCars = activeCategory === 'All'
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
                            whileInView={{ opacity: 1 }}
                            className="text-[#FF6B35] text-xs uppercase tracking-[0.3em] block mb-4"
                        >
                            Our Fleet
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black tracking-tight"
                        >
                            Premium<br />
                            <span className="text-white/20">Vehicles</span>
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
                                            <span className="text-xs text-white/60">{car.specs.power}</span>
                                        </div>
                                        <div className="text-center">
                                            <FiDroplet className="w-4 h-4 mx-auto mb-1 text-white/40" />
                                            <span className="text-xs text-white/60">{car.specs.fuel}</span>
                                        </div>
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <div>
                                            <span className="text-2xl font-black text-[#FF6B35]">${car.price}</span>
                                            <span className="text-white/40 text-sm">/day</span>
                                        </div>
                                        <button className="px-6 py-3 bg-white/10 hover:bg-[#FF6B35] text-white text-xs uppercase tracking-wider font-bold transition-colors">
                                            Book
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
