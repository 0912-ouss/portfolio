'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface Location {
    id: string;
    city: string;
    name: string;
    address: string;
    image: string;
    description?: string;
}

export function FitnessLocations() {
    const { scrollYProgress } = useScroll();
    const x = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch('/api/fitness/locations');
                const data = await res.json();
                if (data.success) {
                    setLocations(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch locations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    if (loading) return null;

    return (
        <section className="py-40 bg-[#0A0A0A] relative overflow-hidden">
            <div className="container mx-auto px-6 mb-32">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-12">
                    <div>
                        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[1em] font-black block mb-6">Emplacements</span>
                        <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">NOS CLUBS<br />MONDIAUX</h2>
                    </div>
                    <div className="max-w-xs">
                        <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold leading-relaxed">
                            Chaque espace est une œuvre d'art architecturale conçue pour élever votre potentiel.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex overflow-x-auto gap-8 px-6 pb-20 scrollbar-hide">
                {locations.map((loc, index) => (
                    <motion.div
                        key={loc.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className="min-w-[300px] md:min-w-[600px] group relative h-[700px] overflow-hidden rounded-[3rem]"
                    >
                        <Image
                            src={loc.image || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070&auto=format&fit=crop"}
                            alt={loc.name}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                        <div className="absolute top-12 right-12">
                            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-md group-hover:border-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-all">
                                <span className="text-[10px] font-black uppercase tracking-widest">{loc.city}</span>
                            </div>
                        </div>

                        <div className="absolute bottom-16 left-16 right-16">
                            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                                {loc.name}
                            </h3>
                            <p aria-hidden="true" className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                {loc.address}
                            </p>
                            <button className="px-12 py-5 bg-white text-black text-[10px] uppercase font-black tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 hover:bg-[#D4AF37]">
                                Explorer l'Espace
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Background Branding */}
            <motion.div
                style={{ x }}
                className="absolute bottom-0 left-0 w-full text-[25vw] font-black text-white/[0.01] uppercase select-none pointer-events-none whitespace-nowrap leading-none"
            >
                Exclusive Clubs
            </motion.div>
        </section>
    );
}
