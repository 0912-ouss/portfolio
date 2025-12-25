'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CarRentalLoading() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 400);
                    return 100;
                }
                return prev + Math.random() * 12;
            });
        }, 80);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col items-center justify-center"
                >
                    {/* Car Icon Animation */}
                    <div className="relative mb-12">
                        <motion.div
                            animate={{ x: [-50, 50, -50] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <svg width="80" height="40" viewBox="0 0 80 40" className="text-[#FF6B35]">
                                <path
                                    d="M15 30 L15 25 L25 15 L55 15 L65 25 L65 30 L60 30 C60 34 55 38 50 38 C45 38 40 34 40 30 L30 30 C30 34 25 38 20 38 C15 38 10 34 10 30 Z"
                                    fill="currentColor"
                                />
                                <circle cx="20" cy="32" r="5" fill="#0A0A0A" />
                                <circle cx="50" cy="32" r="5" fill="#0A0A0A" />
                                <rect x="30" y="18" width="15" height="8" rx="1" fill="#0A0A0A" opacity="0.5" />
                            </svg>
                        </motion.div>

                        {/* Road Lines */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                            {[0, 1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    className="w-8 h-1 bg-white/20 rounded"
                                    animate={{ x: [0, -50], opacity: [1, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Brand */}
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
                        AUTO<span className="text-[#FF6B35]">RENT</span>
                    </h1>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-12">
                        Premium Car Rental
                    </p>

                    {/* Progress */}
                    <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C42]"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
