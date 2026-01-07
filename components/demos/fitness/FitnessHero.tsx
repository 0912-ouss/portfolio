'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { FiArrowDown } from 'react-icons/fi';

export function FitnessHero() {
    const luxeTransition = { duration: 1.5, ease: [0.6, 0.05, 0.01, 0.9] };
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse Parallax for Grid
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const gridX = useSpring(useTransform(mouseX, [0, 1000], [5, -5]), { stiffness: 50, damping: 20 });
    const gridY = useSpring(useTransform(mouseY, [0, 1000], [5, -5]), { stiffness: 50, damping: 20 });

    // Magnetic Button Effect
    const btnX = useSpring(0, { stiffness: 200, damping: 20 });
    const btnY = useSpring(0, { stiffness: 200, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);
    };

    const handleBtnMove = (e: React.MouseEvent) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        btnX.set(x * 0.3);
        btnY.set(y * 0.3);
    };

    const handleBtnLeave = () => {
        btnX.set(0);
        btnY.set(0);
    };

    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
            onMouseMove={handleMouseMove}
            ref={containerRef}
        >
            {/* Cinematic Video Background */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                >
                    <source src="https://cdn.coverr.co/videos/coverr-working-out-at-the-gym-5147/1080p.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/50 to-[#050505]" />
            </motion.div>

            {/* Grid Pattern Overlay */}
            <motion.div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    x: gridX,
                    y: gridY
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...luxeTransition, delay: 0.5 }}
                    >
                        <span className="inline-block px-4 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-bold rounded-full mb-8">
                            Premium Strength & Performance
                        </span>
                    </motion.div>

                    <h1 className="text-[12vw] sm:text-[10vw] lg:text-[8vw] font-black uppercase tracking-tighter leading-[0.85] text-white overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ ...luxeTransition, delay: 0.7 }}
                            className="block"
                        >
                            ELYSIUM
                        </motion.span>
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ ...luxeTransition, delay: 0.9 }}
                            className="block text-transparent"
                            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
                        >
                            ATHLETICS
                        </motion.span>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 1.5 }}
                        className="mt-12 flex flex-col md:flex-row items-center justify-center gap-12"
                    >
                        <p className="max-w-xs text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium text-left leading-relaxed">
                            L'art de la force rencontre le luxe de la précision. Une expérience réservée à l'élite mondiale.
                        </p>

                        <div className="h-px w-20 bg-[#D4AF37]/30 hidden md:block" />

                        <div className="flex items-center gap-6">
                            <motion.button
                                onMouseMove={handleBtnMove}
                                onMouseLeave={handleBtnLeave}
                                style={{ x: btnX, y: btnY }}
                                className="px-10 py-5 bg-[#D4AF37] text-black text-[10px] uppercase font-black tracking-[0.3em] hover:bg-white transition-colors duration-500 relative group overflow-hidden"
                            >
                                <span className="relative z-10">Apply for Membership</span>
                                <motion.div
                                    className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                                />
                            </motion.button>
                            <button className="w-14 h-14 border border-white/10 flex items-center justify-center hover:border-[#D4AF37]/50 transition-colors group">
                                <FiArrowDown className="text-white/30 group-hover:text-[#D4AF37] transition-colors" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Side Branding */}
            <div className="absolute left-10 bottom-10 hidden lg:block overflow-hidden">
                <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 2 }}
                    className="text-[8px] uppercase font-black tracking-[1em] text-white/10 [writing-mode:vertical-lr] rotate-180"
                >
                    Designed for Greatness
                </motion.span>
            </div>
        </section>
    );
}
