'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function EcommerceCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 30, stiffness: 500 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);
        };

        const handleElementHover = () => {
            const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
            hoverables.forEach(el => {
                el.addEventListener('mouseenter', () => setIsHovering(true));
                el.addEventListener('mouseleave', () => setIsHovering(false));
            });
        };

        window.addEventListener('mousemove', moveCursor);
        setTimeout(handleElementHover, 1000);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [cursorX, cursorY]);

    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            {/* Main Cursor - Elegant Dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 2.5 : 1,
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative -translate-x-1/2 -translate-y-1/2"
                    style={{ opacity: isVisible ? 1 : 0 }}
                >
                    {/* Inner Dot */}
                    <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${isHovering ? 'bg-[#D4A574]' : 'bg-[#1A1A1A]'
                        }`} />
                </motion.div>
            </motion.div>

            {/* Trailing Ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 1.5 : 1,
                        opacity: isVisible ? (isHovering ? 0 : 1) : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1A1A1A]/30"
                />
            </motion.div>

            {/* Sparkle Trail Effect */}
            {isHovering && (
                <motion.div
                    className="fixed top-0 left-0 pointer-events-none z-[9997]"
                    style={{
                        x: cursorXSpring,
                        y: cursorYSpring,
                    }}
                >
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#D4A574] rounded-full"
                            style={{
                                left: `${-10 + i * 10}px`,
                                top: `${-10 + i * 10}px`,
                            }}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 0.8, 0],
                            }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.1,
                            }}
                        />
                    ))}
                </motion.div>
            )}

            <style jsx global>{`
                * {
                    cursor: none !important;
                }
            `}</style>
        </>
    );
}
