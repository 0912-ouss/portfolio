'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export function CafeBackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[100] group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Coffee Bean Button */}
                    <div className="relative">
                        {/* Bean Shape */}
                        <svg
                            width="56"
                            height="72"
                            viewBox="0 0 56 72"
                            className="drop-shadow-[0_0_20px_rgba(200,170,110,0.3)]"
                        >
                            <ellipse
                                cx="28"
                                cy="36"
                                rx="24"
                                ry="32"
                                fill="#C8AA6E"
                                className="group-hover:fill-[#E6DCCA] transition-colors duration-300"
                            />
                            <path
                                d="M28 8 Q18 36 28 64"
                                stroke="#1F1C18"
                                strokeWidth="3"
                                fill="none"
                            />
                        </svg>

                        {/* Arrow Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FiArrowUp className="w-5 h-5 text-[#1F1C18] group-hover:animate-bounce" />
                        </div>
                    </div>

                    {/* Tooltip */}
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-[#C8AA6E] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Back to Top
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
