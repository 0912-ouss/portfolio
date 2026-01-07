"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function FitnessLoading() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center"
                >
                    {/* Logo Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center"
                    >
                        <motion.h1
                            className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            ELYSIUM
                        </motion.h1>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
                            className="h-px w-32 bg-[#D4AF37] mx-auto origin-left"
                        />
                    </motion.div>

                    {/* Loading Bar */}
                    <motion.div
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-40"
                    >
                        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="h-full w-1/2 bg-[#D4AF37]"
                            />
                        </div>
                        <p className="text-center text-[8px] uppercase tracking-[0.5em] text-white/30 mt-4 font-bold">
                            Loading Experience
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
