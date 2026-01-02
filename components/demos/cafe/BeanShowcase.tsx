'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const beans = [
    {
        name: "Ethiopia Yirgacheffe",
        process: "Lavé",
        notes: ["Jasmin", "Bergamote", "Pêche"],
        altitude: "2100m",
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2000&auto=format&fit=crop"
    },
    {
        name: "Colombia Huila",
        process: "Miel",
        notes: ["Caramel", "Pomme Rouge", "Agrumes"],
        altitude: "1800m",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2000&auto=format&fit=crop"
    },
    {
        name: "Costa Rica Tarrazu",
        process: "Naturel",
        notes: ["Chocolat Noir", "Cerise", "Noix"],
        altitude: "1600m",
        image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=2000&auto=format&fit=crop"
    }
];

export function BeanShowcase() {
    return (
        <section className="py-32 bg-[#1F1C18] text-[#E6DCCA]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24">
                    <span className="text-xs font-sans tracking-[0.3em] text-[#C8AA6E] uppercase block mb-4">
                        Histoires d'Origine
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif">Série Origine Unique</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {beans.map((bean, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-[#1A1714]">
                                <Image
                                    src={bean.image}
                                    alt={bean.name}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-[#1F1C18]/20 group-hover:bg-transparent transition-colors" />
                            </div>

                            <div className="text-center">
                                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">
                                    {bean.process} • {bean.altitude}
                                </span>
                                <h3 className="text-2xl font-serif mb-4 group-hover:text-[#C8AA6E] transition-colors">
                                    {bean.name}
                                </h3>
                                <div className="flex justify-center gap-2">
                                    {bean.notes.map((note, j) => (
                                        <span key={j} className="text-xs font-sans border border-white/10 px-3 py-1 text-white/60">
                                            {note}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
