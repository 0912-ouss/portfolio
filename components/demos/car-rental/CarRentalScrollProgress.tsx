'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function CarRentalScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            setScrollPercent(Math.round(v * 100));
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <>
            {/* Top Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#FF6B35] origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* Speed Lines Background Effect */}
            <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-20 bg-gradient-to-b from-[#FF6B35]/20 to-transparent"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: '10%',
                        }}
                        animate={{
                            y: ['0%', '200%'],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 2 + i * 0.3,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>

            {/* Speedometer on Scroll - Right Side */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: scrollPercent > 5 ? 1 : 0 }}
                className="fixed right-8 bottom-8 z-[100] hidden lg:flex flex-col items-center"
            >
                {/* Speedometer Gauge */}
                <div className="relative w-20 h-20">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        {/* Background Circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#1A1A1A"
                            strokeWidth="8"
                        />
                        {/* Progress Arc */}
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#FF6B35"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${scrollPercent * 2.51} 251`}
                            className="drop-shadow-[0_0_10px_rgba(255,107,53,0.5)]"
                        />
                    </svg>

                    {/* Center Value */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-black text-white">{scrollPercent}</span>
                    </div>
                </div>

                {/* Label */}
                <span className="text-[10px] uppercase tracking-widest text-white/40 mt-2">
                    MPH
                </span>
            </motion.div>
        </>
    );
}
