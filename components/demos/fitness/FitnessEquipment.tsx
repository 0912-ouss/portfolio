'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const equipment = [
    {
        name: "L'Arsenal Cardio",
        desc: "Technologie de simulation de terrain haute fidélité.",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
    },
    {
        name: "Bio-Mécanique",
        desc: "Systèmes de résistance intelligente pour une hypertrophie optimale.",
        image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop"
    },
    {
        name: "Zone Isométrique",
        desc: "Espace brut dédié à la puissance pure et au contrôle.",
        image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=2070&auto=format&fit=crop"
    }
];

export function FitnessEquipment() {
    return (
        <section className="py-40 bg-[#050505]">
            <div className="container mx-auto px-6 mb-24">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="max-w-2xl">
                        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black block mb-6 underline underline-offset-8 decoration-[#D4AF37]/20">
                            Notre Arsenal
                        </span>
                        <h2 className="text-[8vw] sm:text-[6vw] lg:text-[4vw] font-black uppercase text-white tracking-tighter leading-none">
                            L'INGÉNIERIE<br />
                            <span className="text-transparent font-serif italic font-extralight lowercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>de la performance</span>
                        </h2>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                {equipment.map((item, index) => (
                    <EquipmentCard key={index} item={item} index={index} />
                ))}
            </div>
        </section>
    );
}

function EquipmentCard({ item, index }: { item: any; index: number }) {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="group relative h-[600px] overflow-hidden rounded-[2rem]"
        >
            <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%] w-full">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-8 left-6 right-6 md:bottom-12 md:left-12 md:right-12 translate-y-8 group-hover:translate-y-0 transition-transform duration-700 z-10">
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2 md:mb-4">
                    {item.name}
                </h3>
                <p className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {item.desc}
                </p>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-[#D4AF37]/30 transition-all duration-700 m-4 rounded-[1.5rem] z-20 pointer-events-none" />
        </motion.div>
    );
}
