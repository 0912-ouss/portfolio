'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiChevronDown, FiZap, FiSettings, FiUsers } from 'react-icons/fi';
import { carRentalFleet, Car } from '@/data/car-rental/fleet';

const categories = ['All', 'Sports', 'Luxury', 'SUV', 'Electric'];
const sorts = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Horsepower'];

export default function FleetPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeSort, setActiveSort] = useState('Recommended');
    const [filteredCars, setFilteredCars] = useState<Car[]>(carRentalFleet);

    useEffect(() => {
        let result = [...carRentalFleet];

        if (activeCategory !== 'All') {
            result = result.filter(c => c.category === activeCategory);
        }

        if (activeSort === 'Price: Low to High') {
            result.sort((a, b) => a.price - b.price);
        } else if (activeSort === 'Price: High to Low') {
            result.sort((a, b) => b.price - a.price);
        } else if (activeSort === 'Horsepower') {
            result.sort((a, b) => Number(b.specs.hp) - Number(a.specs.hp));
        }

        setFilteredCars(result);
    }, [activeCategory, activeSort]);

    return (
        <div className="bg-[#0A0A0A] min-h-screen text-white pb-24 pt-[100px]">
            {/* Header */}
            <div className="container mx-auto px-6 lg:px-12 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl"
                >
                    <span className="text-[#FF6B35] text-xs uppercase tracking-[0.4em] block mb-4">
                        Our Fleet
                    </span>
                    <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-8">
                        The <span className="text-white/20">Collection</span>
                    </h1>
                    <p className="text-white/50 text-xl font-light leading-relaxed">
                        From track-focused supercars to handcrafted luxury SUVs. Explore our meticulously maintained selection.
                    </p>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="sticky top-[80px] z-40 bg-[#0A0A0A]/80 backdrop-blur-md border-y border-white/10">
                <div className="container mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold border transition-all ${activeCategory === cat
                                        ? 'bg-[#FF6B35] border-[#FF6B35] text-white'
                                        : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 hidden md:inline">Sort:</span>
                        <div className="relative group">
                            <button className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white">
                                {activeSort} <FiChevronDown />
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-56 bg-[#0F0F0F] border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 shadow-2xl">
                                {sorts.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setActiveSort(s)}
                                        className="w-full text-left px-4 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-colors"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-6 lg:px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredCars.map((car, index) => (
                            <motion.div
                                key={car.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                                className="group relative bg-[#0F0F0F] border border-white/10 overflow-hidden"
                            >
                                <Link href={`/demos/car-rental/car/${car.id}`}>
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={car.image}
                                            alt={car.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-60" />

                                        <div className="absolute bottom-4 left-4">
                                            <span className="text-[10px] uppercase tracking-widest text-[#FF6B35] font-bold mb-1 block">
                                                {car.category}
                                            </span>
                                            <h3 className="text-xl font-black">{car.name}</h3>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-3 gap-4 mb-8">
                                            <div className="text-center">
                                                <FiZap className="w-4 h-4 mx-auto mb-2 text-[#FF6B35]" />
                                                <p className="text-[10px] uppercase tracking-tighter text-white/40">{car.specs.hp} HP</p>
                                            </div>
                                            <div className="text-center">
                                                <FiSettings className="w-4 h-4 mx-auto mb-2 text-[#FF6B35]" />
                                                <p className="text-[10px] uppercase tracking-tighter text-white/40">{car.specs.transmission}</p>
                                            </div>
                                            <div className="text-center">
                                                <FiUsers className="w-4 h-4 mx-auto mb-2 text-[#FF6B35]" />
                                                <p className="text-[10px] uppercase tracking-tighter text-white/40">{car.specs.seats} Seats</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                            <div>
                                                <span className="text-2xl font-black text-white">${car.price}</span>
                                                <span className="text-[10px] uppercase tracking-widest text-white/30 ml-2">/Day</span>
                                            </div>
                                            <button className="px-6 py-2 bg-[#FF6B35] text-white text-[10px] uppercase tracking-[0.2em] font-black hover:bg-[#FF8C42] transition-colors">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
