'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const wines = [
    { name: "Château Margaux 2015", region: "Bordeaux, France", notes: "Velvet tannins, violet bouquet, deep currant structure.", year: "2015", image: "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?q=80&w=1920&auto=format&fit=crop" },
    { name: "Opus One", region: "Napa Valley, USA", notes: "Creamy entry, dark chocolate, black olive finish.", year: "2018", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2700&auto=format&fit=crop" },
    { name: "Solaia Antinori", region: "Tuscany, Italy", notes: "Intense spice, ripe cherry, tobacco leaf.", year: "2016", image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=2574&auto=format&fit=crop" },
    { name: "Penfolds Grange", region: "South Australia", notes: "Asian five spice, preserved blackberry, shiraz intensity.", year: "2014", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop" }
];

export function TheCellar() {
    return (
        <section className="py-32 bg-[#0F0F0F] text-[#E5E5E5] border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end">
                <div>
                    <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#D4AF37] block mb-6">
                        The Cellar
                    </span>
                    <h2 className="text-5xl font-serif">Curated Vintages</h2>
                </div>
                <div className="hidden md:block">
                    <span className="text-xs font-sans uppercase tracking-widest text-white/40">Scroll to explore</span>
                </div>
            </div>

            <div className="flex gap-8 px-6 overflow-x-auto pb-16 scrollbar-hide snap-x">
                {wines.map((wine, i) => (
                    <motion.div
                        key={i}
                        className="relative min-w-[300px] md:min-w-[400px] aspect-[3/4] group snap-center cursor-pointer"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                    >
                        <div className="absolute inset-0 border border-white/10 group-hover:border-[#D4AF37]/50 transition-colors p-8 flex flex-col justify-end z-10 bg-gradient-to-t from-black via-transparent to-transparent">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] mb-2">{wine.region}</span>
                            <h3 className="text-2xl font-serif mb-4">{wine.name}</h3>
                            <p className="text-sm font-light text-white/60 leading-relaxed max-w-xs">{wine.notes}</p>
                            <span className="absolute top-8 right-8 text-4xl font-serif text-white/10 group-hover:text-[#D4AF37]/20 transition-colors">{wine.year}</span>
                        </div>
                        <Image
                            src={wine.image}
                            alt={wine.name}
                            fill
                            className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
