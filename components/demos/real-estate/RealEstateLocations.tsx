'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { locations } from './data';

export function RealEstateLocations({
    onSelectLocation,
    selectedLocation
}: {
    onSelectLocation: (id: string) => void;
    selectedLocation: string;
}) {
    return (
        <section id="locations" className="py-32 bg-[#1A1A1A] text-white">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[#C19A6B] text-xs uppercase tracking-[0.6em] font-bold mb-4 block"
                    >
                        Explorer les Paysages
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-serif mb-8"
                    >
                        Vivre le <span className="italic">Maroc</span>
                    </motion.h2>
                    <p className="max-w-xl mx-auto text-white/40 font-light text-sm tracking-wide">
                        Choisissez votre région préférée pour découvrir les domaines de luxe disponibles. Chaque terrain offre un style de vie et un patrimoine architectural distincts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {locations.map((loc, index) => {
                        const isSelected = selectedLocation === loc.id;
                        return (
                            <motion.div
                                key={loc.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                onClick={() => onSelectLocation(isSelected ? "" : loc.id)}
                                className={`relative group h-[500px] overflow-hidden cursor-pointer transition-all duration-700 ${isSelected ? 'ring-2 ring-[#C19A6B] ring-offset-4 ring-offset-[#1A1A1A] scale-[1.02]' : 'hover:scale-[1.02]'}`}
                            >
                                <Image
                                    src={loc.image}
                                    alt={loc.name}
                                    fill
                                    className={`object-cover transition-transform duration-1000 group-hover:scale-110 ${isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-60'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                <div className="absolute bottom-10 left-10 right-10">
                                    <span className="text-[#C19A6B] text-[10px] uppercase tracking-[0.4em] mb-3 block">{loc.tag}</span>
                                    <h3 className="text-3xl font-serif mb-3">{loc.name}</h3>
                                    <div className={`overflow-hidden transition-all duration-500 ${isSelected ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-white/60 font-light text-xs max-w-[200px] mb-4">
                                            {loc.description}
                                        </p>
                                        <button className="text-[10px] uppercase tracking-widest text-[#C19A6B] font-bold border-b border-[#C19A6B] pb-1">
                                            Voir les Propriétés
                                        </button>
                                    </div>
                                </div>

                                {isSelected && (
                                    <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-[#C19A6B] bg-[#C19A6B]/20 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-[#C19A6B]" />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
