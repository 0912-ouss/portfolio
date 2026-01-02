'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Philosophy() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section className="py-32 bg-[#0F0F0F] text-[#E5E5E5] relative overflow-hidden">
            {/* Ambient Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-20"
                        initial={{
                            x: Math.random() * 1000,
                            y: Math.random() * 800,
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            x: [null, (Math.random() - 0.5) * 50],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#D4AF37] block mb-8">
                            La Cuisine Élémentaire
                        </span>
                        <h2 className="text-5xl md:text-6xl font-serif leading-tight mb-8">
                            Feu, Farine, <br />
                            <span className="italic opacity-50">et Temps.</span>
                        </h2>
                        <p className="text-white/60 font-light leading-relaxed mb-8 max-w-md">
                            Nous croyons en l'alchimie de la chaleur. Notre cuisine est un théâtre ouvert où les ingrédients s'abandonnent à la flamme, se transformant en quelque chose de primitif mais raffiné.
                        </p>
                        <p className="text-white/60 font-light leading-relaxed max-w-md">
                            Du sol volcanique qui nourrit nos vins à la pierre d'obsidienne de nos fours, chaque élément est choisi pour honorer la danse ancienne de la cuisine au feu.
                        </p>
                    </motion.div>

                    {/* Image */}
                    <div className="relative h-[600px] w-full rounded-2xl overflow-hidden">
                        <motion.div style={{ y }} className="absolute inset-0 h-[120%]">
                            <Image
                                src="https://images.unsplash.com/photo-1514986888952-8cd320577b68?q=80&w=2676&auto=format&fit=crop"
                                alt="Chef cooking with fire"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                </div>
            </div>
        </section>
    );
}
