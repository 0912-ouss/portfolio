'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function MaskReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    return (
        <div className="relative overflow-hidden">
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
            >
                {children}
            </motion.div>
        </div>
    );
}
