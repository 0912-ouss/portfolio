'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export function RealEstateAtmosphere({ isGoldenHour }: { isGoldenHour: boolean }) {
    const [isAudioEnabled, setIsAudioEnabled] = useState(false);

    return (
        <>
            {/* Film Grain Effect */}
            <div className="fixed inset-0 pointer-events-none z-[150] opacity-[0.03] contrast-150 brightness-100">
                <svg className="w-full h-full">
                    <filter id="grainy">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#grainy)" />
                </svg>
            </div>

            {/* Light Leaks / Atmospheric Bloom */}
            <AnimatePresence>
                {isGoldenHour && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                        className="fixed inset-0 pointer-events-none z-[140] overflow-hidden"
                    >
                        <motion.div
                            className="absolute -top-1/4 -right-1/4 w-[80vw] h-[80vw] bg-amber-500/10 blur-[150px] rounded-full"
                            animate={{
                                x: [0, 50, 0],
                                y: [0, 30, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute bottom-0 -left-1/4 w-[60vw] h-[60vw] bg-orange-600/5 blur-[120px] rounded-full"
                            animate={{
                                x: [0, -30, 0],
                                y: [0, -20, 0]
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Audio Toggle & Soundscape */}
            <div className="fixed bottom-32 left-8 z-[200] flex flex-col items-center gap-6">
                <button
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#C19A6B] backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-500 group"
                >
                    {isAudioEnabled ? (
                        <Volume2 size={16} className="text-white" />
                    ) : (
                        <VolumeX size={16} className="text-white/40" />
                    )}

                    {/* Ring animation if active */}
                    {isAudioEnabled && (
                        <motion.div
                            className="absolute inset-0 rounded-full border border-[#C19A6B]"
                            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}
                </button>
                <div className="h-16 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
            </div>

            {/* Simulate Soundscape (Visual Indicator) */}
            <AnimatePresence>
                {isAudioEnabled && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="fixed bottom-[14.5rem] left-24 z-[200] pointer-events-none"
                    >
                        <span className="text-[9px] uppercase tracking-[0.4em] text-white/60 font-medium whitespace-nowrap">
                            Ambiance : {isGoldenHour ? "Vent du Désert & Prière" : "Brise de l'Atlas & Eau"}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
