'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function CafeGrain() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 5000], [0, -500]); // Moves grain against scroll

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
            style={{ y }}
        >
            <svg className="w-full h-[200%]">
                <filter id="noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </motion.div>
    );
}
