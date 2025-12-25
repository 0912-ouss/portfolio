'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CafeCursor() {
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

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Track hoverable elements
        const handleElementHover = () => {
            const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
            hoverables.forEach(el => {
                el.addEventListener('mouseenter', () => setIsHovering(true));
                el.addEventListener('mouseleave', () => setIsHovering(false));
            });
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Delay to ensure DOM is ready
        setTimeout(handleElementHover, 1000);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [cursorX, cursorY]);

    // Hide on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            {/* Main Cursor - Coffee Bean */}
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
                        rotate: isHovering ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative -translate-x-1/2 -translate-y-1/2"
                >
                    {/* Coffee Bean Shape */}
                    <svg
                        width={isHovering ? "40" : "24"}
                        height={isHovering ? "56" : "32"}
                        viewBox="0 0 24 32"
                        className="transition-all duration-300"
                    >
                        <ellipse
                            cx="12"
                            cy="16"
                            rx="10"
                            ry="14"
                            fill="#C8AA6E"
                            opacity={isVisible ? 1 : 0}
                        />
                        <path
                            d="M12 4 Q8 16 12 28"
                            stroke="#1F1C18"
                            strokeWidth="2"
                            fill="none"
                            opacity={isVisible ? 1 : 0}
                        />
                    </svg>
                </motion.div>
            </motion.div>

            {/* Cursor Trail */}
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
                        opacity: isVisible ? 0.3 : 0,
                    }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C8AA6E]/50"
                />
            </motion.div>

            {/* Hide default cursor */}
            <style jsx global>{`
                * {
                    cursor: none !important;
                }
            `}</style>
        </>
    );
}
