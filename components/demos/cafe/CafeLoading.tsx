'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CafeLoading() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="fixed inset-0 z-[200] bg-[#1F1C18] flex flex-col items-center justify-center"
                >
                    {/* Coffee Cup Container */}
                    <div className="relative w-32 h-40 mb-12">
                        {/* Cup Body */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-28 border-4 border-[#C8AA6E]/30 rounded-b-3xl overflow-hidden">
                            {/* Coffee Fill */}
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3D2B1F] via-[#5C4033] to-[#8B6914]"
                                initial={{ height: '0%' }}
                                animate={{ height: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Crema Layer */}
                                <div className="absolute top-0 left-0 right-0 h-3 bg-[#C8AA6E]/60 rounded-t-full" />

                                {/* Coffee Shine */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                            </motion.div>
                        </div>

                        {/* Cup Handle */}
                        <div className="absolute bottom-6 -right-4 w-6 h-12 border-4 border-[#C8AA6E]/30 rounded-r-full" />

                        {/* Steam Animations */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-8 bg-white/10 rounded-full blur-sm"
                                    style={{ left: `${(i - 1) * 12}px` }}
                                    animate={{
                                        y: [-20, -60],
                                        opacity: [0, 0.6, 0],
                                        scaleX: [1, 1.5, 2],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                        ease: 'easeOut',
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Brand Name */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-serif text-[#E6DCCA] mb-4 tracking-wider">
                            KŌHĪ
                        </h1>
                        <p className="text-[10px] uppercase tracking-[0.5em] text-[#C8AA6E]">
                            L'Atelier Café
                        </p>
                    </motion.div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48">
                        <div className="h-[1px] bg-white/10 w-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#C8AA6E]"
                                initial={{ width: '0%' }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-white/30 text-center mt-4 uppercase tracking-widest">
                            Infusion...
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
