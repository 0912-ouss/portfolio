'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Trainer {
    id: string;
    name: string;
    specialty: string;
    bio: string;
    image: string;
    status: string;
}

export function FitnessTrainers() {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const res = await fetch('/api/fitness/trainers');
                const data = await res.json();
                if (data.success) {
                    setTrainers(data.data.filter((t: Trainer) => t.status === 'Active'));
                }
            } catch (error) {
                console.error('Failed to fetch trainers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainers();
    }, []);

    if (loading) return null; // Or a loading skeleton

    return (
        <section className="py-40 bg-[#0A0A0A] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-32">
                    <span className="text-[#D4AF37] text-[10px] uppercase tracking-[1em] font-black block mb-8">Les Maîtres</span>
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">ARCHITECTES DE LA FORCE</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {trainers.map((trainer, index) => (
                        <motion.div
                            key={trainer.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="group"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] mb-12">
                                <Image
                                    src={trainer.image || "/images/fitness/trainer1.png"}
                                    alt={trainer.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />

                                <motion.div
                                    className="absolute inset-x-0 bottom-0 p-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-black/40 backdrop-blur-md"
                                >
                                    <p className="text-white/70 text-sm font-light leading-relaxed">
                                        {trainer.bio}
                                    </p>
                                </motion.div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-[#D4AF37] transition-colors">
                                    {trainer.name}
                                </h3>
                                <p className="text-[#D4AF37] text-[10px] uppercase font-black tracking-[0.3em]">
                                    {trainer.specialty}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decorative Text */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] uppercase select-none pointer-events-none -rotate-90">
                Performance
            </div>
        </section>
    );
}
