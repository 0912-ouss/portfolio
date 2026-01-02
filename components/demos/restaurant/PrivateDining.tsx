'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Magnetic } from './Magnetic';

export function PrivateDining() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section className="py-32 bg-[#121212] text-[#E5E5E5] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="relative rounded-[2rem] overflow-hidden bg-[#0F0F0F] border border-white/5">
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        <div className="relative h-[600px] lg:h-auto min-h-[600px]">
                            <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%]">
                                <Image
                                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2100&auto=format&fit=crop"
                                    alt="Private Dining Room"
                                    fill
                                    className="object-cover grayscale"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-black/40" />
                        </div>

                        <div className="p-16 lg:p-24 flex flex-col justify-center">
                            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#D4AF37] block mb-8">
                                La Chambre Privée
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                                Isolé pour <br />
                                <span className="italic text-white/40">le mémorable.</span>
                            </h2>
                            <p className="text-white/60 font-light leading-relaxed mb-12 max-w-md">
                                Un sanctuaire caché derrière la cave. Architectures d'éclairage personnalisées, environnements auditifs sur mesure et une équipe culinaire dédiée jusqu'à 12 invités.
                            </p>

                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4 text-sm font-sans tracking-wide text-white/80">
                                    <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                                    <span>Menus Dégustation Sélectionnés</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm font-sans tracking-wide text-white/80">
                                    <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                                    <span>Entrée Privée</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm font-sans tracking-wide text-white/80 mb-8">
                                    <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                                    <span>Service Sommelier</span>
                                </div>
                            </div>

                            <div>
                                <Magnetic>
                                    <button className="px-10 py-4 border border-[#D4AF37] text-[#D4AF37] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-500">
                                        Demander la Disponibilité
                                    </button>
                                </Magnetic>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
