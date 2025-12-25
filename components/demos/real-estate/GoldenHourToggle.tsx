'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';

export function GoldenHourToggle({
    isGoldenHour,
    onToggle
}: {
    isGoldenHour: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="fixed bottom-12 left-12 z-[200]">
            <motion.button
                onClick={onToggle}
                className={`relative flex items-center gap-4 px-6 py-3 rounded-full border backdrop-blur-md transition-all duration-700 ${isGoldenHour ? 'bg-amber-900/40 border-amber-500/30 text-amber-200' : 'bg-white/40 border-black/5 text-black'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="relative w-6 h-6 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {isGoldenHour ? (
                            <motion.div
                                key="moon"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <Sparkles size={18} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sun"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                            >
                                <Sun size={18} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
                    {isGoldenHour ? 'Golden Hour' : 'Daylight Mode'}
                </span>

                {/* Status Indicator */}
                <motion.div
                    className={`w-1 h-1 rounded-full ${isGoldenHour ? 'bg-amber-400' : 'bg-black'}`}
                    animate={isGoldenHour ? { opacity: [0, 1, 0], scale: [1, 2, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.button>
        </div>
    );
}

import { AnimatePresence } from 'framer-motion';
