'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

import { MaskReveal } from './MaskReveal';

export function RealEstateHero() {
    const { scrollY } = useScroll();
    const scrollYOffset = useTransform(scrollY, [0, 800], [0, 300]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);
    const scale = useTransform(scrollY, [0, 800], [1, 1.1]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { damping: 50, stiffness: 200 });
    const springY = useSpring(mouseY, { damping: 50, stiffness: 200 });

    const flareX = useTransform(springX, [0, 2000], [-50, 50]);
    const flareY = useTransform(springY, [0, 1000], [-30, 30]);

    const imgX = useTransform(springX, [0, 2000], [10, -10]);
    const imgYOffset = useTransform(springY, [0, 1000], [5, -5]);

    // Combine scrollYOffset and imgYOffset for the total Y transformation
    const combinedY = useTransform([scrollYOffset, imgYOffset], ([scrollVal, mouseVal]) => (scrollVal as number) + (mouseVal as number));

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full overflow-hidden bg-[#1A1A1A]"
        >
            {/* Background Image with Cinematic Motion */}
            <motion.div style={{ y: combinedY, scale, x: imgX }} className="absolute inset-0 z-0">
                <Image
                    src="/demos/real-estate/hero.png"
                    alt="Luxury Riad"
                    fill
                    className="object-cover opacity-70"
                    priority
                />
                {/* Atmospheric Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#FDFBF7]" />
                <div className="absolute inset-0 bg-black/20" />
            </motion.div>

            {/* Lens Flare Decorative Effect - Mouse Reactive */}
            <motion.div
                style={{ x: flareX, y: flareY }}
                className="absolute top-1/4 -left-20 w-[40vw] h-[40vw] bg-[#C19A6B]/10 blur-[150px] rounded-full pointer-events-none z-10"
            />

            {/* Content Overlay */}
            <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 text-center">
                <div className="max-w-4xl">
                    <MaskReveal>
                        <span className="text-[#C19A6B] text-[10px] md:text-xs uppercase tracking-[0.8em] font-bold mb-8 block drop-shadow-lg">
                            Une Production Atlas Estates
                        </span>
                    </MaskReveal>

                    <MaskReveal delay={0.2}>
                        <h1 className="text-6xl md:text-9xl font-serif text-white mb-10 leading-[0.9] drop-shadow-2xl">
                            Héritage <br /> <span className="italic font-light">Redéfini</span>
                        </h1>
                    </MaskReveal>

                    <MaskReveal delay={0.4}>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white/80">
                            <div className="h-[1px] w-12 bg-[#C19A6B] hidden md:block" />
                            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium max-w-md leading-loose">
                                Conservation des monuments architecturaux les plus prestigieux du Royaume du Maroc.
                            </p>
                            <div className="h-[1px] w-12 bg-[#C19A6B] hidden md:block" />
                        </div>
                    </MaskReveal>
                </div>

                <motion.div
                    style={{ opacity }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-16 flex flex-col items-center gap-4"
                >
                    <span className="text-[10px] uppercase tracking-[0.6em] text-white/40 font-bold">Découvrir</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
                </motion.div>
            </div>
            <motion.div
                style={{ opacity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40"
            >
                <div className="w-[1px] h-24 bg-gradient-to-b from-white/40 to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.4em] rotate-90 origin-left mt-4 translate-x-1">Découvrir</span>
            </motion.div>
        </section>
    );
}
