'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CarRentalCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400 };
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
            {/* Steering Wheel Cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 1.5 : 1,
                        rotate: isHovering ? 90 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative -translate-x-1/2 -translate-y-1/2"
                >
                    <svg
                        width={isHovering ? "40" : "28"}
                        height={isHovering ? "40" : "28"}
                        viewBox="0 0 40 40"
                        className="transition-all duration-300"
                        style={{ opacity: isVisible ? 1 : 0 }}
                    >
                        {/* Outer Ring */}
                        <circle cx="20" cy="20" r="18" fill="none" stroke="#FF6B35" strokeWidth="3" />
                        {/* Center */}
                        <circle cx="20" cy="20" r="5" fill="#FF6B35" />
                        {/* Spokes */}
                        <line x1="20" y1="8" x2="20" y2="15" stroke="#FF6B35" strokeWidth="2" />
                        <line x1="8" y1="24" x2="15" y2="22" stroke="#FF6B35" strokeWidth="2" />
                        <line x1="32" y1="24" x2="25" y2="22" stroke="#FF6B35" strokeWidth="2" />
                    </svg>
                </motion.div>
            </motion.div>

            {/* Trailing Circle */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 2 : 1,
                        opacity: isVisible ? 0.2 : 0,
                    }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FF6B35]"
                />
            </motion.div>

            <style jsx global>{`
                * {
                    cursor: none !important;
                }
            `}</style>
        </>
    );
}
