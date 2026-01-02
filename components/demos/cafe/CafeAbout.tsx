'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const stats = [
    { value: 8, suffix: '+', label: "Années d'Artisanat" },
    { value: 24, suffix: '', label: "Pays d'Origine" },
    { value: 50000, suffix: '+', label: 'Tasses Servies' }
];

export function CafeAbout() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    // Animated counters
    const [counters, setCounters] = useState(stats.map(() => 0));
    const [hasAnimated, setHasAnimated] = useState(false);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    stats.forEach((stat, index) => {
                        const duration = 2000;
                        const steps = 60;
                        const increment = stat.value / steps;
                        let current = 0;
                        const interval = setInterval(() => {
                            current += increment;
                            if (current >= stat.value) {
                                current = stat.value;
                                clearInterval(interval);
                            }
                            setCounters(prev => {
                                const newCounters = [...prev];
                                newCounters[index] = Math.floor(current);
                                return newCounters;
                            });
                        }, duration / steps);
                    });
                }
            },
            { threshold: 0.5 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <section ref={containerRef} className="py-32 md:py-48 bg-[#1F1C18] text-[#E6DCCA] relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-[#C8AA6E]/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-[#C8AA6E]/3 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Image Side */}
                    <motion.div
                        style={{ y, opacity }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2000&auto=format&fit=crop"
                                alt="Coffee Artisan"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1C18] via-transparent to-transparent opacity-60" />
                        </div>

                        {/* Floating Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute -bottom-8 -right-8 md:right-8 bg-[#1A1714]/90 backdrop-blur-xl border border-white/10 p-8 max-w-[280px]"
                        >
                            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C8AA6E] block mb-4">Philosophie</span>
                            <p className="text-sm font-light text-white/60 leading-relaxed italic">
                                "Chaque tasse est une méditation. Chaque versé, intentionnel."
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Content Side */}
                    <div className="lg:pl-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-xs font-sans tracking-[0.3em] text-[#C8AA6E] uppercase block mb-8">
                                L'Atelier
                            </span>
                            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-[0.95]">
                                Où la Science<br />
                                <span className="text-[#C8AA6E]/30">Rencontre l'Âme</span>
                            </h2>
                            <p className="text-lg font-light text-white/50 leading-relaxed mb-8 max-w-lg">
                                KŌHĪ est né d'une obsession pour l'extraction - la danse précise de l'eau, du temps et de la température qui révèle le caractère caché d'un grain.
                            </p>
                            <p className="text-sm font-light text-white/40 leading-relaxed mb-12 max-w-lg">
                                Fondé dans le quartier des arts de Los Angeles, notre atelier est un laboratoire du goût. Nous nous approvisionnons directement auprès de micro-lots dans 24 pays d'origine, torréfiant en petites quantités pour préserver le terroir. Ici, le café n'est pas une marchandise, c'est un métier d'art.
                            </p>

                            {/* Stats */}
                            <div ref={statsRef} className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-3xl md:text-4xl font-serif text-[#C8AA6E] mb-2">
                                            {counters[index].toLocaleString()}{stat.suffix}
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
