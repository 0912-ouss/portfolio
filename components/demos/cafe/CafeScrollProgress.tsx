'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function CafeScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-4"
        >
            {/* Coffee Cup Progress */}
            <div className="relative w-8 h-12">
                {/* Cup Outline */}
                <div className="absolute inset-0 border-2 border-[#C8AA6E]/30 rounded-b-lg">
                    {/* Coffee Fill */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3D2B1F] to-[#C8AA6E]/80 rounded-b-md"
                        style={{ scaleY, transformOrigin: 'bottom' }}
                    />
                </div>
                {/* Cup Handle */}
                <div className="absolute top-2 -right-2 w-2 h-4 border-2 border-[#C8AA6E]/30 rounded-r-full" />
            </div>

            {/* Percentage */}
            <motion.span
                className="text-[10px] font-bold text-[#C8AA6E] tracking-wider"
                style={{ opacity: scaleY }}
            >
                <motion.span>
                    {/* This will show scroll percentage */}
                </motion.span>
            </motion.span>
        </motion.div>
    );
}
