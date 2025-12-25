'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function EcommerceLoading() {
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
                return prev + Math.random() * 10;
            });
        }, 60);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="fixed inset-0 z-[200] bg-[#FAF8F5] flex flex-col items-center justify-center"
                >
                    {/* Elegant Logo Animation */}
                    <motion.div
                        className="relative mb-12"
                    >
                        {/* Animated Shopping Bag */}
                        <motion.svg
                            width="60"
                            height="70"
                            viewBox="0 0 60 70"
                            className="text-[#1A1A1A]"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Bag Body */}
                            <motion.path
                                d="M5 25 L10 65 L50 65 L55 25 Z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 0.3 }}
                            />
                            {/* Handle */}
                            <motion.path
                                d="M20 25 C20 10 40 10 40 25"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            />
                        </motion.svg>

                        {/* Sparkle Effects */}
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-[#D4A574] rounded-full"
                                style={{
                                    top: `${20 + i * 15}%`,
                                    right: '-20px',
                                }}
                                animate={{
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Brand Name */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-3xl font-light tracking-[0.3em] text-[#1A1A1A] mb-2">
                            FASHION
                        </h1>
                        <p className="text-xs uppercase tracking-[0.5em] text-[#999]">
                            Boutique
                        </p>
                    </motion.div>

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute bottom-20 w-48"
                    >
                        <div className="h-[1px] bg-[#E5E5E5] w-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#1A1A1A]"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
