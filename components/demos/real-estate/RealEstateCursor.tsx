'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export function RealEstateCursor() {
    const [cursorState, setCursorState] = useState<'default' | 'view' | 'link' | 'vault' | 'explore'>('default');

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 250 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target as HTMLElement;
            if (target.closest('.gallery-item') || target.closest('.property-card')) {
                setCursorState('view');
            } else if (target.closest('.vault-scanner')) {
                setCursorState('vault');
            } else if (target.closest('.explore-area')) {
                setCursorState('explore');
            } else if (target.closest('a, button')) {
                setCursorState('link');
            } else {
                setCursorState('default');
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const variants = {
        default: { scale: 1, backgroundColor: "#C19A6B" },
        view: { scale: 5, backgroundColor: "#FFFFFF" },
        link: { scale: 2.5, backgroundColor: "#C19A6B" },
        vault: { scale: 6, backgroundColor: "#1A1A1A", border: "1px solid #C19A6B" },
        explore: { scale: 4, backgroundColor: "#2C2C2C" }
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[1000] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={variants[cursorState]}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                <AnimatePresence mode="wait">
                    {cursorState === 'view' && (
                        <motion.span
                            key="view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center text-[2px] uppercase tracking-[0.2em] text-black font-black"
                        >
                            View
                        </motion.span>
                    )}
                    {cursorState === 'vault' && (
                        <motion.span
                            key="vault"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center text-[1.5px] uppercase tracking-[0.3em] text-[#C19A6B] font-black leading-none text-center p-1"
                        >
                            Enter <br /> Vault
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Trail/Lag Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-[#C19A6B]/20 rounded-full pointer-events-none z-[999]"
                style={{
                    x: useSpring(mouseX, { damping: 40, stiffness: 150 }),
                    y: useSpring(mouseY, { damping: 40, stiffness: 150 }),
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </>
    );
}
