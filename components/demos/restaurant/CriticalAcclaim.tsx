'use client';

import React from 'react';
import { motion } from 'framer-motion';

const awards = [
    { title: "MICHELIN", subtitle: "2 Stars, 2024" },
    { title: "THE 50 BEST", subtitle: "#12 Global Ranking" },
    { title: "JAMES BEARD", subtitle: "Outstanding Design" },
    { title: "WINE SPECTATOR", subtitle: "Grand Award" }
];

export function CriticalAcclaim() {
    return (
        <section className="py-24 bg-[#0F0F0F] border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="shrink-0 text-center md:text-left">
                        <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#D4AF37] block mb-2">
                            Recognition
                        </span>
                        <h2 className="text-3xl font-serif text-white/90">Critical Acclaim</h2>
                    </div>

                    <div className="w-full h-px bg-white/10 hidden md:block flex-1 mx-12" />

                    <div className="flex flex-wrap justify-center gap-12 md:gap-16 opacity-60">
                        {awards.map((award, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <h4 className="text-xl md:text-2xl font-serif font-bold text-white mb-1">{award.title}</h4>
                                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]">{award.subtitle}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
