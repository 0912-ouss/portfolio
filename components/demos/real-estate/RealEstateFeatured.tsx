'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, BedDouble, Bath, Square, Filter, Heart } from 'lucide-react';
import { properties } from './data';
import { MaskReveal } from './MaskReveal';

export function RealEstateFeatured({
    selectedLocation,
    onPropertyClick,
    favorites,
    onToggleFavorite
}: {
    selectedLocation: string;
    onPropertyClick: (prop: any) => void;
    favorites: number[];
    onToggleFavorite: (id: number) => void;
}) {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredProperties = useMemo(() => {
        return properties.filter(prop => {
            const matchesLocation = selectedLocation ? prop.locationId === selectedLocation : true;
            const matchesType = activeFilter === 'Tout' ? true : prop.category === activeFilter;
            return matchesLocation && matchesType;
        });
    }, [selectedLocation, activeFilter]);

    const filters = ['Tout', 'Villa', 'Appartement', 'Riad'];

    return (
        <section id="featured" className="py-32 bg-[#FDFBF7] px-6 min-h-screen">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <MaskReveal>
                            <span className="text-[#C19A6B] text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                                {selectedLocation ? `Collection à ${selectedLocation}` : 'Sélection Exclusive'}
                            </span>
                        </MaskReveal>
                        <MaskReveal delay={0.2}>
                            <h2 className="text-5xl md:text-7xl font-serif text-[#2C2C2C] leading-[1.1]">La Collection <br /><span className="italic">Héritage</span></h2>
                        </MaskReveal>
                    </div>

                    {/* Filtering System */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 mr-4 text-gray-400">
                            <Filter size={14} />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Filtrer Par</span>
                        </div>
                        {filters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 rounded-full border ${activeFilter === filter ? 'bg-[#2C2C2C] text-white border-transparent' : 'bg-transparent text-[#2C2C2C] border-gray-200 hover:border-[#C19A6B]'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <AnimatePresence mode="popLayout">
                        {filteredProperties.length > 0 ? (
                            filteredProperties.map((prop, index) => (
                                <motion.div
                                    key={prop.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    onClick={() => onPropertyClick(prop)}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden mb-8 rounded-sm">
                                        <Image
                                            src={prop.image}
                                            alt={prop.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute top-6 right-6 z-10">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onToggleFavorite(prop.id);
                                                }}
                                                className={`p-2 rounded-full transition-all duration-300 ${favorites.includes(prop.id) ? 'bg-red-500 text-white' : 'bg-white/90 text-black hover:bg-white'}`}
                                            >
                                                <Heart size={16} fill={favorites.includes(prop.id) ? "currentColor" : "none"} />
                                            </button>
                                        </div>
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-white/90 backdrop-blur-md text-[#2C2C2C] px-4 py-2 text-[10px] uppercase tracking-widest font-bold">
                                                {prop.category}
                                            </span>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex justify-between items-end">
                                                <p className="text-white text-2xl font-serif">{prop.price}</p>
                                                <div className="w-10 h-10 rounded-full bg-[#C19A6B] flex items-center justify-center translate-y-12 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                                    <ArrowUpRight className="text-white" size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-[#C19A6B] text-[10px] uppercase tracking-[0.3em] font-bold mb-1">{prop.locationId.toUpperCase()}</p>
                                        <h3 className="text-2xl font-serif text-[#2C2C2C] group-hover:text-[#C19A6B] transition-colors">{prop.title}</h3>
                                    </div>

                                    <div className="flex gap-6 border-t border-gray-100 pt-6">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <BedDouble size={14} />
                                            <span className="text-[10px] uppercase tracking-widest leading-none pt-1">{prop.specs.beds} Lits</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Bath size={14} />
                                            <span className="text-[10px] uppercase tracking-widest leading-none pt-1">{prop.specs.baths} SDB</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Square size={14} />
                                            <span className="text-[10px] uppercase tracking-widest leading-none pt-1">{prop.specs.size}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-24 text-center"
                            >
                                <p className="text-gray-400 font-light italic">Aucune propriété trouvée dans cette collection.</p>
                                <button
                                    onClick={() => setActiveFilter('Tout')}
                                    className="mt-4 text-[#C19A6B] text-xs uppercase tracking-widest font-bold border-b border-[#C19A6B]"
                                >
                                    Réinitialiser les Filtres
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
