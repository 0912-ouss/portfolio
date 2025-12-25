'use client';

import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function MagnetButton({
    children,
    className = "",
    onClick
}: {
    children: React.ReactNode,
    className?: string,
    onClick?: () => void
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const dx = useSpring(x, springConfig);
    const dy = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distThreshold = 100;
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

        if (distance < distThreshold) {
            x.set((e.clientX - centerX) * 0.4);
            y.set((e.clientY - centerY) * 0.4);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ x: dx, y: dy }}
            className={`relative ${className} outline-none`}
        >
            <span className="relative z-10">{children}</span>
            <motion.div
                className="absolute inset-x-0 -bottom-1 h-[1px] bg-current origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
            />
        </motion.button>
    );
}
