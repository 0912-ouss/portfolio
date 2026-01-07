'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const recoveryServices = [
    {
        title: "Cryothérapie 2.0",
        desc: "Récupération cellulaire profonde à -140°C pour une régénération instantanée.",
        image: "/images/fitness/recovery1.jpg"
    },
    {
        title: "Le Bio-Spa",
        desc: "Immersion sensorielle hydrodynamique infusée aux minéraux rares.",
        image: "/images/fitness/recovery2.jpg"
    },
    {
        title: "Sommelier Nutrition",
        desc: "Bio-ingénierie nutritionnelle sur mesure après chaque effort.",
        image: "/images/fitness/recovery3.jpg"
    }
];

export function FitnessRecovery() {
    return (
        <section className="py-40 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mb-32">
                    <span className="text-[#D4AF37] text-[10px] uppercase tracking-[1em] font-black block mb-8">Au-delà de l'Effort</span>
                    <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-12">
                        SUITE DE RÉCUPÉRATION <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>ELYSIUM</span>
                    </h2>
                    <p className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold">
                        L'art de la régénération architecturale.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {recoveryServices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="bg-white/[0.01] border border-white/5 p-12 rounded-[2.5rem] hover:bg-white/[0.03] transition-all group"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-12">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                                />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-[#D4AF37] transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-white/40 text-[12px] font-medium leading-relaxed">
                                {service.desc}
                            </p>

                            <div className="mt-8 h-px w-0 bg-[#D4AF37]/50 group-hover:w-full transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}
            />
        </section>
    );
}
